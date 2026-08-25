// Minimal Prisma client shim for tests when the generated client is not available.
// The real Prisma client is generated into `generated/prisma` by `prisma generate`.
// This lightweight stub prevents tests that import PrismaService from failing when
// the generated client hasn't been created in the local environment.

export class PrismaClient {
  // no-op connect/disconnect so PrismaService can extend this in tests
  async $connect(): Promise<void> {
    return Promise.resolve();
  }

  async $disconnect(): Promise<void> {
    return Promise.resolve();
  }
}

export default PrismaClient;
