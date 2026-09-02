#!/bin/sh
# Assemble DATABASE_URL from discrete parts (ECS injects DB_HOST/DB_PORT/DB_NAME/
# DB_USERNAME/DB_PASSWORD separately since the RDS-managed secret is JSON, not a
# connection string), unless DATABASE_URL is already set (e.g. local docker-compose).
set -e

if [ -z "$DATABASE_URL" ]; then
  if [ -z "$DB_HOST" ] || [ -z "$DB_NAME" ] || [ -z "$DB_USERNAME" ] || [ -z "$DB_PASSWORD" ]; then
    echo "[assemble-database-url] DATABASE_URL not set and DB_HOST/DB_NAME/DB_USERNAME/DB_PASSWORD are incomplete" >&2
    exit 1
  fi
  DB_PORT=${DB_PORT:-5432}
  case "$DB_PORT" in
    ''|*[!0-9]*)
      echo "[assemble-database-url] DB_PORT '${DB_PORT}' is not a valid numeric port" >&2
      exit 1
      ;;
  esac
  # percent-encode credentials so special characters (@ # : % /) in RDS-generated
  # secrets can't break the connection string's host/port/path parsing
  DB_USERNAME_ENC=$(node -e "process.stdout.write(encodeURIComponent(process.argv[1]))" "$DB_USERNAME")
  DB_PASSWORD_ENC=$(node -e "process.stdout.write(encodeURIComponent(process.argv[1]))" "$DB_PASSWORD")
  export DATABASE_URL="postgresql://${DB_USERNAME_ENC}:${DB_PASSWORD_ENC}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public"
fi

exec "$@"
