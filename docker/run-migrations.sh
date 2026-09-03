#!/bin/sh
# Apply pending Prisma migrations before starting the app. Idempotent and safe
# to run from multiple containers concurrently (Prisma uses a DB advisory lock).
set -e

npx prisma migrate deploy --schema=./src/shared/prisma/schema.prisma

exec "$@"
