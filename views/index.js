// scripts/exportViews.js

require("dotenv").config();
const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

const dbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  schema: process.env.DB_SCHEMA,
};

const baseBackupDir = path.join(__dirname, "backup_views");

function getFormattedDate() {
  return new Date().toISOString().slice(0, 10);
}

function getLogPath() {
  const dbDir = path.join(baseBackupDir, dbConfig.database);
  if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });
  return path.join(dbDir, `export_${getFormattedDate()}.log`);
}

const logFile = getLogPath();

function log(message) {
  console.log(message);
  fs.appendFileSync(logFile, message + "\n");
}

async function exportViews() {
  const client = new Client(dbConfig);
  try {
    await client.connect();
    log(`✅ Conectado ao banco: ${dbConfig.database}`);

    const schemas = dbConfig.schema
      ? [dbConfig.schema]
      : await getAllSchemas(client);

    for (const schema of schemas) {
      await exportSchemaViews(client, schema);
    }

    log("✅ Backup de views concluído com sucesso!");
  } catch (error) {
    log("❌ Erro ao exportar views: " + error.message);
  } finally {
    await client.end();
  }
}

async function getAllSchemas(client) {
  const excluded = ["pg_catalog", "information_schema"];
  const query = `
    SELECT schema_name
    FROM information_schema.schemata
    WHERE schema_name NOT IN (${excluded.map((_, i) => `$${i + 1}`).join(", ")})
    ORDER BY schema_name;
  `;
  const res = await client.query(query, excluded);
  return res.rows.map((row) => row.schema_name);
}

async function exportSchemaViews(client, schemaName) {
  log(`📦 Exportando views do schema: ${schemaName}`);

  const queries = {
    views: `
      SELECT c.relname AS view_name,
             pg_get_viewdef(c.oid, true) AS definition
      FROM pg_class c
      JOIN pg_namespace n ON c.relnamespace = n.oid
      WHERE c.relkind = 'v' AND n.nspname = $1;
    `,
    materialized_views: `
      SELECT c.relname AS view_name,
             pg_get_viewdef(c.oid, true) AS definition
      FROM pg_class c
      JOIN pg_namespace n ON c.relnamespace = n.oid
      WHERE c.relkind = 'm' AND n.nspname = $1;
    `,
  };

  for (const [type, query] of Object.entries(queries)) {
    const res = await client.query(query, [schemaName]);

    if (res.rows.length === 0) {
      log(
        `⚠️ Nenhuma ${type.replace("_", " ")} encontrada no schema: ${schemaName}`
      );
      continue;
    }

    const outputDir = path.join(
      baseBackupDir,
      dbConfig.database,
      schemaName,
      type === "views" ? "views" : "views_materializadas"
    );
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    for (const row of res.rows) {
      const filePath = path.join(outputDir, `${row.view_name}.sql`);
      const createStmt =
        type === "views"
          ? `CREATE OR REPLACE VIEW ${schemaName}.${row.view_name} AS \n${row.definition};`
          : `CREATE MATERIALIZED VIEW ${schemaName}.${row.view_name} AS \n${row.definition};`;

      fs.writeFileSync(filePath, createStmt);
      log(
        `📄 ${type === "views" ? "View" : "View materializada"} salva: ${schemaName}.${row.view_name}`
      );
    }
  }
}

exportViews();
