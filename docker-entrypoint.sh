#!/bin/sh
set -eu
mkdir -p /data/downloads
if [ ! -f /data/downloads/nginx-aliases.conf ]; then
  printf '# no aliases yet — run scripts/sync-downloads.sh\n' > /data/downloads/nginx-aliases.conf
fi
if [ ! -f /data/downloads/latest.json ]; then
  printf '{"version":"0.9.5","tag":"v0.9.5","files":[]}\n' > /data/downloads/latest.json
fi
nginx -t
exec nginx -g 'daemon off;'
