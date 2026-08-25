import { loadTestEnv } from './load-test-env';

// Runs once per test file (Jest `setupFiles`), before the test framework
// and application modules are loaded, so PrismaService/RedisModule pick up
// the test database/redis connection strings.
loadTestEnv();
