const { Pool } = require("pg");
const logger = require("../../utilities/logger");

// Read env variables or config
const {
  PG_HOST = "localhost",
  PG_PORT = 5432,
  PG_USER = "postgres",
  PG_PASSWORD = "postgres",
  PG_DATABASE = "mydb",
  PG_SSL = "false",
} = process.env;

let pool;

/**
 * Initialize PostgreSQL connection pool
 */
async function initPostgres() {
  if (pool) return pool; // avoid re-creating pool

  logger.info("⏳ Initializing PostgreSQL connection...");

  pool = new Pool({
    host: PG_HOST,
    port: PG_PORT,
    user: PG_USER,
    password: PG_PASSWORD,
    database: PG_DATABASE,
    ssl: PG_SSL === "true" ? { rejectUnauthorized: false } : false,
    max: 20,              // max clients in pool
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
  });

  try {
    const client = await pool.connect();
    await client.query("SELECT NOW()"); // test query
    client.release();
    logger.info("✅ Connected to PostgreSQL successfully");
  } catch (err) {
    logger.error("❌ PostgreSQL connection failed", err);
    process.exit(1);
  }

  return pool;
}

/**
 * Gracefully close PostgreSQL pool
 */
async function closePostgres() {
  if (pool) {
    logger.info("Closing PostgreSQL connection pool...");
    await pool.end();
    pool = null;
  }
}

module.exports = {
  initPostgres,
  closePostgres,
};
