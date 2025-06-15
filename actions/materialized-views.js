// scripts/exportMaterializedViews.js

const fs = require("fs");
const path = require("path");
const { Client } = require("pg");
const { getAllSchemas } = require("./schema-management");
const { materializedViewsBackupDir } = require("./constants");
const { dbConfig } = require("./db-config");

const backupDir = materializedViewsBackupDir;

function getLogPath() {
  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
  return path.join(backupDir, `export.log`);
}

const logFile = getLogPath();

function log(message) {
  console.log(message);
  fs.appendFileSync(logFile, message + "\n");
}

async function exportMaterializedViews() {
  log("Iniciando backup de views materializadas...");

  const client = new Client(dbConfig);
  try {
    await client.connect();
    log(`✅ Conectado ao banco: ${dbConfig.database}`);

    const schemas = dbConfig.schema
      ? [dbConfig.schema]
      : await getAllSchemas(client);

    for (const schema of schemas) {
      await exportSchemaMaterializedViews(client, schema);
    }

    log("✅ Backup de views materializadas concluído com sucesso!");
  } catch (error) {
    log("❌ Erro ao exportar views materializadas: " + error.message);
  } finally {
    await client.end();
  }
}

async function exportSchemaMaterializedViews(client, schemaName) {
  log(`📦 Exportando views materializadas do schema: ${schemaName}`);

  const query = `
    SELECT c.relname AS view_name,
           pg_get_viewdef(c.oid, true) AS definition
    FROM pg_class c
    JOIN pg_namespace n ON c.relnamespace = n.oid
    WHERE c.relkind = 'm' AND n.nspname = $1;
  `;

  const res = await client.query(query, [schemaName]);

  if (res.rows.length === 0) {
    log(`⚠️ Nenhuma view materializada encontrada no schema: ${schemaName}`);
    return;
  }

  const outputDir = path.join(backupDir, schemaName);

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  for (const row of res.rows) {
    const filePath = path.join(outputDir, `${row.view_name}.sql`);
    const createStmt = `CREATE MATERIALIZED VIEW ${schemaName}.${row.view_name} AS \n${row.definition};`;
    fs.writeFileSync(filePath, createStmt);
    log(`📄 View materializada salva: ${schemaName}.${row.view_name}`);
  }
}

module.exports = {
  exportMaterializedViews,
};

exportMaterializedViews();
