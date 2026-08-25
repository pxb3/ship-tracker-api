#!/bin/sh
# Wait for Redis to be reachable, then exec the provided command.
set -e

REDIS_HOST=${REDIS_HOST:-redis}
REDIS_PORT=${REDIS_PORT:-6379}
MAX_ATTEMPTS=${REDIS_WAIT_MAX_ATTEMPTS:-30}
SLEEP_MS=${REDIS_WAIT_SLEEP_MS:-1000}

attempt=0
echo "[wait-for-redis] Waiting for Redis at ${REDIS_HOST}:${REDIS_PORT}"
while [ $attempt -lt $MAX_ATTEMPTS ]; do
  attempt=$((attempt + 1))
  if redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT" ping >/dev/null 2>&1; then
    echo "[wait-for-redis] Redis is available (attempt $attempt)"
    break
  fi
  echo "[wait-for-redis] Redis not available yet, attempt $attempt/$MAX_ATTEMPTS — sleeping ${SLEEP_MS}ms"
  sleep $(expr $SLEEP_MS / 1000)
done

if [ $attempt -ge $MAX_ATTEMPTS ]; then
  echo "[wait-for-redis] Timed out waiting for Redis after ${MAX_ATTEMPTS} attempts" >&2
  # still continue and exec the command so the app can fallback if desired
fi

echo "[wait-for-redis] Executing: $@"
exec "$@"
