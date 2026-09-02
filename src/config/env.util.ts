// Fails fast on boot if a secret ECS/​.env was supposed to inject is missing,
// instead of silently falling back to an insecure hardcoded default.
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}
