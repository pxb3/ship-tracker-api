FROM node:20-bookworm-slim
WORKDIR /app

# install all dependencies (including dev) so we can run Nest in dev mode inside the container
COPY package.json package-lock.json* ./
RUN apt-get update -y && apt-get install -y openssl ca-certificates redis-tools && rm -rf /var/lib/apt/lists/* \
	&& npm ci

# copy everything

# copy everything
COPY . .

# add wait-for-redis entrypoint script
COPY docker/wait-for-redis.sh /usr/local/bin/wait-for-redis.sh
RUN chmod +x /usr/local/bin/wait-for-redis.sh

# remove any host-generated prisma client and generate it for the container platform
RUN rm -rf ./generated/prisma
RUN npx prisma generate --schema=./src/shared/prisma/schema.prisma

ENV NODE_ENV=development
ENV PORT=8080
ENV SHIP_GRPC_PORT=50051
ENV TZ=Europe/Athens
EXPOSE 8080 50051

# run a wait-for-redis wrapper then Nest in watch/dev mode (script will exec CMD)
ENTRYPOINT ["/bin/sh", "/usr/local/bin/wait-for-redis.sh"]
CMD ["npm", "run", "start:dev"]
