# Build the static site first: `npm ci && npm run build` (writes out/).
# The image itself is only nginx + the export, so it stays small on the VPS.
FROM nginx:1.27-alpine
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.sh /docker-entrypoint.sh
COPY out /usr/share/nginx/html
RUN chmod +x /docker-entrypoint.sh && mkdir -p /data/downloads
EXPOSE 80
ENTRYPOINT ["/docker-entrypoint.sh"]
