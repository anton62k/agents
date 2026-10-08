ARG BASE_IMAGE=docker.io/docker/sandbox-templates:shell-docker@sha256:5fc81bc7a127e59d81b244a06831ae3212a0310b2e5a0349c54e29249e45e919
FROM ${BASE_IMAGE}

ARG NODE_VERSION=26
ARG NVM_VERSION=0.40.8
ARG PACKAGE_MANAGER=pnpm
ARG PACKAGE_MANAGER_VERSION=12.4.1

USER root
RUN apt-get update -qq \
    && apt-get install -y --no-install-recommends libatomic1 \
    && rm -rf /var/lib/apt/lists/*

USER agent
ENV NVM_DIR=/home/agent/.nvm
RUN bash -euc 'unset NPM_CONFIG_PREFIX npm_config_prefix; \
    curl --fail --silent --show-error --location \
      "https://raw.githubusercontent.com/nvm-sh/nvm/v${NVM_VERSION}/install.sh" \
      --output /tmp/install-nvm.sh; \
    PROFILE=/dev/null bash /tmp/install-nvm.sh; \
    . "$NVM_DIR/nvm.sh" --no-use; \
    nvm install "$NODE_VERSION"; \
    nvm alias default "$NODE_VERSION"; \
    node_root="$(dirname "$(dirname "$(nvm which "$NODE_VERSION")")")"; \
    ln -s "$node_root" "$NVM_DIR/current"; \
    if [ "$PACKAGE_MANAGER_VERSION" != "bundled" ]; then \
      if [ "$PACKAGE_MANAGER" = "pnpm" ]; then \
        npm install --global --allow-scripts=pnpm "pnpm@$PACKAGE_MANAGER_VERSION"; \
      else \
        npm install --global "$PACKAGE_MANAGER@$PACKAGE_MANAGER_VERSION"; \
      fi; \
    fi; \
    rm /tmp/install-nvm.sh'

ENV PATH="/home/agent/.nvm/current/bin:${PATH}"
ENV SANDBOX_PACKAGE_MANAGER=${PACKAGE_MANAGER}
COPY --chown=agent:agent persistent-env.sh /home/agent/.worktree-sandbox-env.sh
RUN cat /home/agent/.worktree-sandbox-env.sh >> /etc/sandbox-persistent.sh
RUN node --version \
    && "$SANDBOX_PACKAGE_MANAGER" --version \
    && bash -lc 'nvm --version; node --version; "$SANDBOX_PACKAGE_MANAGER" --version'
