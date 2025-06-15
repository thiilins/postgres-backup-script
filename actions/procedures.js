// scripts/exportProcedures.js
const fs = require("fs");
const path = require("path");
const { Client } = require("pg");
const { getAllSchemas } = require("./schema-management");
const { proceduresBackupDir } = require("./constants");
const { dbConfig } = require("./db-config");
const backupDir = proceduresBackupDir;

// Gera caminho do log
function getLogPath() {
  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
  const fileName = `export.log`;
  return path.join(backupDir, fileName);
}

const logFile = () => {
  const logPath = getLogPath();
  if (!fs.existsSync(logPath)) fs.writeFileSync(logPath, "");
  return logPath;
};

// Grava mensagem no console e no log
function log(message) {
  console.log(message);
  fs.appendFileSync(logFile(), message + "\n");
}

// Função principal
async function exportProcedures() {
  log("Iniciando backup de procedures...");
  const client = new Client(dbConfig);
  try {
    await client.connect();
    log(`✅ Conectado ao banco de dados: ${dbConfig.database}`);
    const schemas =
      dbConfig.schema != null ? [dbConfig.schema] : await getAllSchemas(client);
    console.log("Schemas: ", schemas);
    for (const schema of schemas) {
      await exportSchemaProcedures(client, schema);
    }
    log("✅ Backup concluído com sucesso!");
  } catch (error) {
    log("❌ Erro geral ao exportar procedures: " + error.message);
  } finally {
    await client.end();
  }
}

// Exportar procedures de um schema específico
async function exportSchemaProcedures(client, schemaName) {
  log(`📦 Exportando procedures do schema: ${schemaName}...`);

  const query = `
    SELECT p.proname AS procedure_name,
           pg_get_functiondef(p.oid) AS definition
    FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = $1;
  `;
  const res = await client.query(query, [schemaName]);

  if (res.rows.length === 0) {
    log(`⚠️ Nenhuma procedure encontrada no schema: ${schemaName}`);
    return;
  }

  const outputDir = path.join(backupDir, schemaName);
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  for (const row of res.rows) {
    const fileName = `${row.procedure_name}.sql`;
    const filePath = path.join(outputDir, fileName);
    fs.writeFileSync(filePath, row.definition);
    log(`📄 Procedure salva: ${schemaName}.${row.procedure_name}`);
  }
}

module.exports = {
  exportProcedures,
};

exportProcedures();
