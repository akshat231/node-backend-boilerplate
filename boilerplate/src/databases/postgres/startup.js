const { Pool } = require("pg");
const logger = require("../../utilities/logger");
const postgresConfig = require('config').get('database.postgres')

// Environment variables take precedence, config file is the fallback.
const PG_HOST = process.env.PG_HOST || postgresConfig.host;
const PG_PORT = parseInt(process.env.PG_PORT || postgresConfig.port, 10);
const PG_USER = process.env.PG_USER || postgresConfig.user;
const PG_PASSWORD = process.env.PG_PASSWORD !== undefined ? process.env.PG_PASSWORD : "";
const PG_DATABASE = process.env.PG_DATABASE || postgresConfig.database;
const PG_SSL_RAW = process.env.PG_SSL !== undefined ? process.env.PG_SSL : postgresConfig.ssl;
const PG_SSL = PG_SSL_RAW === true || PG_SSL_RAW === "true";

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
    ssl: PG_SSL ? { rejectUnauthorized: false } : false,
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
