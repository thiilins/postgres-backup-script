// scripts/sync-procedures-hml-to-prd.js
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
const { log } = require('./logger');
const { dbConfigPrd, dbConfigHml } = require('./db-config');

async function exportProceduresToTempDir(client, tempDir) {
  const query = `
    SELECT 
      p.proname AS procedure_name,
      n.nspname AS schema_name,
      pg_get_function_identity_arguments(p.oid) AS args_signature,
      pg_get_functiondef(p.oid) AS definition
    FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname NOT IN ('pg_catalog', 'information_schema')
      AND p.prokind IN ('f', 'p');
  `;

  const res = await client.query(query);

  for (const row of res.rows) {
    const schemaDir = path.join(tempDir, row.schema_name);
    if (!fs.existsSync(schemaDir)) fs.mkdirSync(schemaDir, { recursive: true });

    const fileName = `${row.procedure_name}_${row.args_signature.replace(/\s+/g, '').replace(/[^a-zA-Z0-9_]/g, '_')}.sql`;
    fs.writeFileSync(path.join(schemaDir, fileName), row.definition);
  }
  log(`📥 ${getTranslation('sync_procedure_exported')}`);
}

async function dropAllProcedures(client) {
  const query = `
    DO $$
    DECLARE
      r RECORD;
    BEGIN
      FOR r IN
        SELECT n.nspname, p.proname, pg_get_function_identity_arguments(p.oid) as args, p.prokind
        FROM pg_proc p
        JOIN pg_namespace n ON p.pronamespace = n.oid
        WHERE n.nspname NOT IN ('pg_catalog', 'information_schema')
          AND p.prokind IN ('f', 'p')
      LOOP
        EXECUTE format('DROP %s %I.%I(%s);',
                       CASE WHEN r.prokind = 'p' THEN 'PROCEDURE' ELSE 'FUNCTION' END,
                       r.nspname,
                       r.proname,
                       r.args);
      END LOOP;
    END
    $$;
  `;

  await client.query(query);
  log(`🧹 ${getTranslation('sync_procedure_dropped')}`);
}

async function applyFromTempToPrd(tempDir, client) {
  const schemas = fs.readdirSync(tempDir);
  for (const schema of schemas) {
    const schemaPath = path.join(tempDir, schema);
    const files = fs.readdirSync(schemaPath);
    for (const file of files) {
      const content = fs.readFileSync(path.join(schemaPath, file), 'utf8');
      await client.query(content);
      log(`✅ ${getTranslation('sync_procedure_applied')} ${schema}.${file}`);
    }
  }
}
async function syncProcedures() {
  const tempDir = path.join(__dirname, '../tmp-sync');

  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

  const hml = new Client(dbConfigHml);
  const prd = new Client(dbConfigPrd);

  try {
    await hml.connect();
    await exportProceduresToTempDir(hml, tempDir);
    await hml.end();

    await prd.connect();
    await dropAllProcedures(prd);
    await applyFromTempToPrd(tempDir, prd);
    log(`✅ ${getTranslation('sync_finished')}`);
  } catch (err) {
    log(`❌ ${getTranslation('sync_error')} ${err.message}`);
  } finally {
    await prd.end();
  }
}

module.exports = {
  syncProcedures,
};
