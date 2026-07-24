import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var skydiveLeadPool: Pool | undefined;
}

export function getDatabaseUrl() {
  return process.env.DATABASE_URL?.trim() || "";
}

export function isDatabaseConfigured() {
  return getDatabaseUrl().length > 0;
}

export function getPool() {
  const connectionString = getDatabaseUrl();

  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured.");
  }

  if (!globalThis.skydiveLeadPool) {
    globalThis.skydiveLeadPool = new Pool({
      connectionString,
      ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : undefined,
      max: Number(process.env.DATABASE_POOL_MAX || 5),
      idleTimeoutMillis: 30000
    });
  }

  return globalThis.skydiveLeadPool;
}

