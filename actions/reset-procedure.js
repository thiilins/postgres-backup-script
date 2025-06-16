// scripts/reset-procedures.js
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
const { dbConfig } = require('./db-config');
const { log } = require('./logger');
const { getTranslation } = require('../translations');
const BACKUP_DIR = path.join(__dirname, '../backups');

async function dropAllProcedures(client) {
  const query = `
  DO $$
  DECLARE
    r RECORD;
  BEGIN
    FOR r IN
      SELECT n.nspname, p.proname, pg_get_function_identity_arguments(p.oid) AS args
      FROM pg_proc p
      JOIN pg_namespace n ON p.pronamespace = n.oid
      WHERE p.prokind = 'p'  -- Apenas PROCEDURE
        AND n.nspname NOT IN ('pg_catalog', 'information_schema')
    LOOP
      EXECUTE format('DROP PROCEDURE %I.%I(%s);',
                     r.nspname,
                     r.proname,
                     r.args);
    END LOOP;
  END
  $$;
`;

  await client.query(query);
  log(`🧹 ${getTranslation('reset_procedure_dropped')}`);
}

async function applyProceduresFromBackup(client, schemaPath) {
  const files = fs.readdirSync(schemaPath).filter((f) => f.endsWith('.sql'));
  for (const file of files) {
    const content = fs.readFileSync(path.join(schemaPath, file), 'utf8');
    await client.query(content);
    log(`✅ ${getTranslation('reset_procedure_applied')} ${file}`);
  }
}

const resetProcedure = async () => {
  const client = new Client(dbConfig);
  try {
    await client.connect();
    log(`📡 ${getTranslation('reset_procedure_connected')} ${dbConfig.database}`);
    await dropAllProcedures(client);

    const schemas = fs.readdirSync(BACKUP_DIR);
    for (const schema of schemas) {
      const schemaPath = path.join(BACKUP_DIR, schema);
      if (fs.statSync(schemaPath).isDirectory()) {
        log(`📂 ${getTranslation('reset_procedure_applying')} ${schema}`);
        await applyProceduresFromBackup(client, schemaPath);
      }
    }

    log(`✅ ${getTranslation('reset_procedure_finished')}`);
  } catch (err) {
    log(`❌ Erro: ${err.message}`);
  } finally {
    await client.end();
  }
};
module.exports = {
  resetProcedure,
};
