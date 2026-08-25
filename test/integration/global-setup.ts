import { spawnSync } from 'child_process';
import { resolve } from 'path';
import { loadTestEnv } from './load-test-env';

// Jest `globalSetup`: runs once, in its own process, before any test file.
export default async function globalSetup(): Promise<void> {
  loadTestEnv();

  const result = spawnSync('npx prisma migrate deploy', {
    cwd: resolve(__dirname, '..', '..'),
    stdio: 'inherit',
    env: process.env,
    shell: true,
  });

  if (result.status !== 0) {
    throw new Error(
      'Failed to apply Prisma migrations to the integration test database. ' +
        'Make sure it is running: npm run test:integration:up',
    );
  }
}
