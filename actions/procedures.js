// scripts/exportProcedures.js
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
const { getAllSchemas } = require('./schema-management');
const { proceduresBackupDir } = require('./constants');
const { dbConfig } = require('./db-config');
const { log, getTranslation } = require('./logger');
const backupDir = proceduresBackupDir;

// Função principal
async function exportProcedures() {
  log(getTranslation('starting_backup'));
  const client = new Client(dbConfig);
  try {
    await client.connect();
    log(`✅ ${getTranslation('connected_to_db')} ${dbConfig.database}`);
    const schemas = dbConfig.schema != null ? [dbConfig.schema] : await getAllSchemas(client);
    console.log('Schemas: ', schemas);
    for (const schema of schemas) {
      await exportSchemaProcedures(client, schema);
    }
    log(`✅ ${getTranslation('backup_completed')}`);
  } catch (error) {
    log(`❌ ${getTranslation('error_exporting')} ${error.message}`);
  } finally {
    await client.end();
  }
}

// Exportar procedures de um schema específico
async function exportSchemaProcedures(client, schemaName) {
  log(`📦 ${getTranslation('exporting_schema')} ${schemaName}...`);

  const query = `
    SELECT 
      p.oid,
      p.proname AS procedure_name,
      pg_get_function_identity_arguments(p.oid) AS args_signature,
      pg_get_functiondef(p.oid) AS definition
    FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = $1;
  `;

  const res = await client.query(query, [schemaName]);

  if (res.rows.length === 0) {
    log(`⚠️ ${getTranslation('no_procedures_found')} ${schemaName}`);
    return;
  }

  const outputDir = path.join(backupDir, schemaName);
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  for (const row of res.rows) {
    const safeArgs = row.args_signature.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
    const fileName = `${row.procedure_name}_${safeArgs}.sql`;
    const filePath = path.join(outputDir, fileName);
    fs.writeFileSync(filePath, row.definition);
    log(
      `📄 ${getTranslation('procedure_saved')} ${schemaName}.${row.procedure_name}(${row.args_signature})`,
    );
  }
}

module.exports = {
  exportProcedures,
};
