// scripts/apply-selected-procedures.js
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
const { dbConfig } = require('./db-config');
const { getTranslation } = require('../translations');
const { log } = require('./logger');
const SELECTED_DIR = path.join(__dirname, '../procedures-to-apply');

async function applySelectedProcedures() {
  const client = new Client(dbConfig);

  try {
    await client.connect();
    log(`📡 ${getTranslation('reset_procedure_connected')} ${dbConfig.database}`);

    const schemas = fs.readdirSync(SELECTED_DIR);
    for (const schema of schemas) {
      const schemaPath = path.join(SELECTED_DIR, schema);
      if (!fs.statSync(schemaPath).isDirectory()) continue;

      log(`📂 ${getTranslation('reset_procedure_applying')} ${schema}`);

      const files = fs.readdirSync(schemaPath).filter((f) => f.endsWith('.sql'));

      for (const file of files) {
        const filePath = path.join(schemaPath, file);
        const sql = fs.readFileSync(filePath, 'utf8');
        try {
          await client.query(sql);
          log(`✅ ${getTranslation('reset_procedure_applied')} ${schema}.${file}`);
        } catch (err) {
          log(`❌ ${getTranslation('error_exporting')} ${file} → ${err.message}`);
        }
      }
    }

    log(`✅ ${getTranslation('reset_procedure_finished')}`);
  } catch (err) {
    log(`❌ ${getTranslation('error_exporting')} ${err.message}`);
  } finally {
    await client.end();
  }
}

module.exports = {
  applySelectedProcedures,
};
