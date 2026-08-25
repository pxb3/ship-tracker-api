// Jest `globalTeardown`: runs once after all integration test files finish.
// Containers are left running; stop them explicitly via `npm run test:integration:down`.
export default async function globalTeardown(): Promise<void> {}
