FROM python:3.13-alpine
WORKDIR /app
COPY server.py /app/server.py
RUN adduser -D -u 1000 stats && mkdir -p /data && chown -R stats:stats /data /app
USER stats
EXPOSE 8080
ENV STATS_DB=/data/counts.db LATEST_JSON=/data/latest.json
CMD ["python", "-u", "/app/server.py"]
