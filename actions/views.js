// scripts/exportViews.js

const fs = require("fs");
const path = require("path");
const { Client } = require("pg");
const { getAllSchemas } = require("./schema-management");
const { viewsBackupDir } = require("./constants");
const { dbConfig } = require("./db-config");
const { log } = require("./logger");
const backupDir = viewsBackupDir;

async function exportViews() {
  log("Iniciando backup de views...");

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

async function exportSchemaViews(client, schemaName) {
  log(`📦 Exportando views do schema: ${schemaName}`);

  const query = `
    SELECT c.relname AS view_name,
           pg_get_viewdef(c.oid, true) AS definition
    FROM pg_class c
    JOIN pg_namespace n ON c.relnamespace = n.oid
    WHERE c.relkind = 'v' AND n.nspname = $1;
  `;

  const res = await client.query(query, [schemaName]);

  if (res.rows.length === 0) {
    log(`⚠️ Nenhuma view encontrada no schema: ${schemaName}`);
    return;
  }

  const outputDir = path.join(backupDir, schemaName);

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  for (const row of res.rows) {
    const filePath = path.join(outputDir, `${row.view_name}.sql`);
    const createStmt = `CREATE OR REPLACE VIEW ${schemaName}.${row.view_name} AS \n${row.definition};`;
    fs.writeFileSync(filePath, createStmt);
    log(`📄 View salva: ${schemaName}.${row.view_name}`);
  }
}

module.exports = {
  exportViews,
};
