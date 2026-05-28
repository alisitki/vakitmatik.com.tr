#!/bin/sh
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
PROJECT_ROOT=$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)

if [ -n "${NEXT_NODE:-}" ] && [ -x "$NEXT_NODE" ]; then
  NODE_BIN="$NEXT_NODE"
elif [ -x "/opt/homebrew/bin/node" ]; then
  NODE_BIN="/opt/homebrew/bin/node"
elif [ -x "/usr/local/bin/node" ]; then
  NODE_BIN="/usr/local/bin/node"
elif [ -n "${npm_node_execpath:-}" ] && [ -x "$npm_node_execpath" ]; then
  NODE_BIN="$npm_node_execpath"
else
  NODE_BIN=$(command -v node)
fi

cd "$PROJECT_ROOT"
NODE_DIR=$(dirname -- "$NODE_BIN")
export PATH="$NODE_DIR:$PATH"
exec "$NODE_BIN" "$PROJECT_ROOT/node_modules/next/dist/bin/next" "$@"
