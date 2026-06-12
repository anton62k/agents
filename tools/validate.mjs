#!/usr/bin/env node

import { readdirSync, readFileSync, statSync } from "node:fs";
import { basename, dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

function rel(path) {
  return relative(root, path).replaceAll("\\", "/");
}

function fail(path, message, line = null) {
  failures.push(`${rel(path)}${line ? `:${line}` : ""} - ${message}`);
}

function read(path) {
  return readFileSync(path, "utf8");
}

function exists(path) {
  try {
    statSync(path);
    return true;
  } catch {
    return false;
  }
}

function walk(dir, predicate = () => true) {
  const entries = [];
  for (const name of readdirSync(dir).sort()) {
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      entries.push(...walk(path, predicate));
    } else if (predicate(path)) {
      entries.push(path);
    }
  }
  return entries;
}

function stripInlineComment(value) {
  const hashIndex = value.indexOf(" #");
  return hashIndex === -1 ? value : value.slice(0, hashIndex).trimEnd();
}

function parseFrontmatter(path) {
  const lines = read(path).split(/\r?\n/);
  if (lines[0] !== "---") {
    fail(path, "missing YAML frontmatter opening marker", 1);
    return null;
  }

  const end = lines.findIndex((line, index) => index > 0 && line === "---");
  if (end === -1) {
    fail(path, "missing YAML frontmatter closing marker", 1);
    return null;
  }

  const data = {};
  for (let index = 1; index < end; index += 1) {
    const line = lines[index];
    if (!line.trim()) {
      continue;
    }

    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) {
      fail(path, "frontmatter line must be `key: value`", index + 1);
      continue;
    }

    const [, key, rawValue] = match;
    const value = stripInlineComment(rawValue.trim());
    const quoted =
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"));

    if (!quoted && /:\s/.test(value)) {
      fail(path, "frontmatter value containing `: ` must be quoted", index + 1);
    }

    data[key] = quoted ? value.slice(1, -1) : value;
  }

  for (const key of ["name", "description"]) {
    if (!data[key]) {
      fail(path, `frontmatter is missing \`${key}\``);
    }
  }

  return data;
}

function parseTomlAssignments(path) {
  const data = {};
  read(path)
    .split(/\r?\n/)
    .forEach((line, index) => {
      const match = line.match(/^([A-Za-z0-9_-]+)\s*=\s*"(.*)"\s*$/);
      if (match) {
        data[match[1]] = match[2];
        return;
      }
      if (/^[A-Za-z0-9_-]+\s*=/.test(line) && !line.includes('"""')) {
        fail(
          path,
          "TOML assignment must be a quoted string in adapter wrappers",
          index + 1,
        );
      }
    });
  return data;
}

function parseCatalog(path) {
  const records = new Map();
  const lines = read(path).split(/\r?\n/);
  let current = null;

  for (const line of lines) {
    const header = line.match(/^### `([^`]+)`/);
    if (header) {
      current = { id: header[1], fields: {} };
      records.set(current.id, current.fields);
      continue;
    }

    const field = line.match(/^- ([a-z_]+):\s*(.*)$/);
    if (current && field) {
      current.fields[field[1]] = normalizeCatalogValue(field[2]);
    }
  }

  return records;
}

function normalizeCatalogValue(value) {
  return value.trim().replace(/^`([^`]+)`$/, "$1");
}

function validateMarkdownAdapters() {
  const adapterDirs = [
    join(root, "adapters/claude-code/materialized/agents"),
    join(root, "adapters/claude-code/materialized/skills"),
    join(root, "adapters/codex/materialized/skills"),
  ];

  for (const dir of adapterDirs) {
    for (const path of walk(dir, (entry) => extname(entry) === ".md")) {
      const frontmatter = parseFrontmatter(path);
      if (!frontmatter) {
        continue;
      }

      const roleWrapper = rel(path).startsWith(
        "adapters/claude-code/materialized/agents/",
      );
      if (roleWrapper && basename(path, ".md") !== frontmatter.name) {
        fail(
          path,
          `frontmatter name must match filename \`${basename(path, ".md")}\``,
        );
      }

      const skillWrapper = rel(path).includes("/materialized/skills/");
      if (skillWrapper && basename(dirname(path)) !== frontmatter.name) {
        fail(
          path,
          `frontmatter name must match skill directory \`${basename(dirname(path))}\``,
        );
      }
    }
  }
}

function validateCodexAgentToml() {
  const dir = join(root, "adapters/codex/materialized/agents");
  for (const path of walk(dir, (entry) => extname(entry) === ".toml")) {
    const data = parseTomlAssignments(path);
    for (const key of ["name", "description"]) {
      if (!data[key]) {
        fail(path, `TOML wrapper is missing \`${key}\``);
      }
    }

    const id = basename(path, ".toml");
    if (data.name && data.name !== id) {
      fail(path, `TOML name must match filename \`${id}\``);
    }
  }
}

function validateRoleCatalog() {
  const catalogPath = join(root, "roles/INDEX.md");
  const catalog = parseCatalog(catalogPath);
  const roleIds = walk(
    join(root, "roles"),
    (entry) => basename(entry) === "ROLE.md",
  )
    .map((path) => rel(dirname(path)).replace(/^roles\//, ""))
    .sort();

  for (const roleId of roleIds) {
    if (!catalog.has(roleId)) {
      fail(catalogPath, `missing catalog record for role \`${roleId}\``);
    }
  }

  for (const [roleId, fields] of catalog) {
    const rolePath = join(root, fields.path ?? "");
    if (!fields.path || !exists(rolePath)) {
      fail(
        catalogPath,
        `role \`${roleId}\` points to missing path \`${fields.path ?? ""}\``,
      );
    }

    const codexPath = join(
      root,
      `adapters/codex/materialized/agents/${roleId}.toml`,
    );
    const claudePath = join(
      root,
      `adapters/claude-code/materialized/agents/${roleId}.md`,
    );
    if (!exists(codexPath)) {
      fail(catalogPath, `role \`${roleId}\` is missing Codex wrapper`);
    }
    if (!exists(claudePath)) {
      fail(catalogPath, `role \`${roleId}\` is missing Claude Code wrapper`);
    }
  }
}

function validatePipelineCatalog() {
  const catalogPath = join(root, "pipelines/INDEX.md");
  const catalog = parseCatalog(catalogPath);
  const pipelineIds = walk(
    join(root, "pipelines"),
    (entry) => basename(entry) === "PIPELINE.md",
  )
    .map((path) => rel(dirname(path)).replace(/^pipelines\//, ""))
    .sort();

  for (const pipelineId of pipelineIds) {
    if (!catalog.has(pipelineId)) {
      fail(
        catalogPath,
        `missing catalog record for pipeline \`${pipelineId}\``,
      );
    }
  }

  for (const [pipelineId, fields] of catalog) {
    const pipelinePath = join(root, fields.path ?? "");
    if (!fields.path || !exists(pipelinePath)) {
      fail(
        catalogPath,
        `pipeline \`${pipelineId}\` points to missing path \`${fields.path ?? ""}\``,
      );
    }

    if (fields.platform_invocation === "skill-wrapper") {
      const codexPath = join(
        root,
        `adapters/codex/materialized/skills/${pipelineId}/SKILL.md`,
      );
      const claudePath = join(
        root,
        `adapters/claude-code/materialized/skills/${pipelineId}/SKILL.md`,
      );
      if (!exists(codexPath)) {
        fail(
          catalogPath,
          `skill-wrapper pipeline \`${pipelineId}\` is missing Codex skill`,
        );
      }
      if (!exists(claudePath)) {
        fail(
          catalogPath,
          `skill-wrapper pipeline \`${pipelineId}\` is missing Claude Code skill`,
        );
      }
    }
  }
}

function validateModelLevels() {
  const allowed = new Set(["cheap", "standard", "deep"]);
  for (const path of walk(
    join(root, "roles"),
    (entry) => basename(entry) === "ROLE.md",
  )) {
    const lines = read(path).split(/\r?\n/);
    const headingIndex = lines.findIndex(
      (line) => line === "## Default Model Level",
    );
    if (headingIndex === -1) {
      fail(path, "missing `## Default Model Level` section");
      continue;
    }

    const sectionLines = [];
    for (let index = headingIndex + 1; index < lines.length; index += 1) {
      if (lines[index].startsWith("## ")) {
        break;
      }
      if (lines[index].trim()) {
        sectionLines.push(lines[index].trim());
      }
    }

    const section = sectionLines.join(" ").toLowerCase();
    const words = [...section.matchAll(/\b[a-z][a-z-]*\b/g)].map(
      (match) => match[0],
    );
    if (!words.some((word) => allowed.has(word))) {
      fail(path, "`Default Model Level` must include cheap, standard, or deep");
    }
    if (section.includes("deterministic script")) {
      fail(path, "`deterministic script` is a runner type, not a model level");
    }
  }
}

function validateRoleSections() {
  const required = [
    "Purpose",
    "When To Use",
    "Rights",
    "Default Model Level",
    "Inputs",
    "Outputs",
    "Hard Rules",
    "References",
  ];

  for (const path of walk(
    join(root, "roles"),
    (entry) => basename(entry) === "ROLE.md",
  )) {
    const text = read(path);
    const roleId = rel(dirname(path)).replace(/^roles\//, "");
    if (!text.startsWith(`# Role: ${roleId}\n`)) {
      fail(path, `heading must be \`# Role: ${roleId}\``);
    }
    validateHeadings(path, required);
  }
}

function validatePipelineSections() {
  const required = [
    "Purpose",
    "Triggers",
    "Roles",
    "Steps",
    "Execution Policy",
    "Human Gates",
    "Adapter Notes",
  ];

  for (const path of walk(
    join(root, "pipelines"),
    (entry) => basename(entry) === "PIPELINE.md",
  )) {
    const text = read(path);
    const pipelineId = rel(dirname(path)).replace(/^pipelines\//, "");
    if (!text.startsWith(`# Pipeline: ${pipelineId}\n`)) {
      fail(path, `heading must be \`# Pipeline: ${pipelineId}\``);
    }
    validateHeadings(path, required);
  }
}

function validateHeadings(path, required) {
  const headings = new Set(
    read(path)
      .split(/\r?\n/)
      .map((line) => line.match(/^## (.+)$/)?.[1])
      .filter(Boolean),
  );

  for (const heading of required) {
    if (!headings.has(heading)) {
      fail(path, `missing \`## ${heading}\` section`);
    }
  }
}

validateMarkdownAdapters();
validateCodexAgentToml();
validateRoleCatalog();
validatePipelineCatalog();
validateModelLevels();
validateRoleSections();
validatePipelineSections();

if (failures.length > 0) {
  console.error("Validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Validation passed.");
