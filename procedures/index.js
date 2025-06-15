// scripts/exportProcedures.js

require("dotenv").config();
const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

// Configuração do banco de dados via .env
const dbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  schema: process.env.DB_SCHEMA, // Pode ser undefined
};

// Diretório base de backup
const backupDir = path.join(__dirname, "backup_procedures");

// Formata data YYYY-MM-DD
function getFormattedDate() {
  return new Date().toISOString().slice(0, 10);
}

// Gera caminho do log
function getLogPath() {
  const dbDir = path.join(backupDir, dbConfig.database);
  if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

  const fileName = `export_${getFormattedDate()}.log`;
  return path.join(dbDir, fileName);
}

const logFile = getLogPath();

// Grava mensagem no console e no log
function log(message) {
  console.log(message);
  fs.appendFileSync(logFile, message + "\n");
}

// Função principal
async function exportProcedures() {
  const client = new Client(dbConfig);
  try {
    await client.connect();
    log(`✅ Conectado ao banco de dados: ${dbConfig.database}`);

    const schemas =
      dbConfig.schema != null ? [dbConfig.schema] : await getAllSchemas(client);

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

// Buscar todos os schemas válidos do banco
async function getAllSchemas(client) {
  const excludedSchemas = ["pg_catalog", "information_schema"];
  const query = `
    SELECT schema_name
    FROM information_schema.schemata
    WHERE schema_name NOT IN (${excludedSchemas
      .map((_, i) => `$${i + 1}`)
      .join(", ")})
    ORDER BY schema_name;
  `;
  const res = await client.query(query, excludedSchemas);
  return res.rows.map((row) => row.schema_name);
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

  const schemaBackupDir = path.join(backupDir, dbConfig.database, schemaName);
  if (!fs.existsSync(schemaBackupDir)) {
    fs.mkdirSync(schemaBackupDir, { recursive: true });
  }

  for (const row of res.rows) {
    const fileName = `${row.procedure_name}.sql`;
    const filePath = path.join(schemaBackupDir, fileName);
    fs.writeFileSync(filePath, row.definition);
    log(`📄 Procedure salva: ${schemaName}.${row.procedure_name}`);
  }
}

// Executar
exportProcedures();
