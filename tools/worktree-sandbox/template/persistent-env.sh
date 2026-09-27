
unset NPM_CONFIG_PREFIX npm_config_prefix
export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  . "$NVM_DIR/nvm.sh" --no-use
  nvm use --silent default >/dev/null
fi
