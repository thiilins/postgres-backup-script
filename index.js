// main.js
const { exportProcedures } = require('./actions/procedures');
const { exportViews } = require('./actions/views');
const { exportMaterializedViews } = require('./actions/materialized-views');
const { formatSql } = require('./actions/sql-format');
const { logSection } = require('./actions/logger');
const { resetAllBackups } = require('./actions/clean-old');
const { getTranslation } = require('./translations');
const { syncProcedures } = require('./actions/sync-procedures-db');
const { help } = require('./actions/help');
const { resetProcedure } = require('./actions/reset-procedure');
const { applySelectedProcedures } = require('./actions/apply-procedures');
const args = process.argv.slice(2); // remove node + script
const runAll = args.length === 0 || args.includes('--backup');
const runSync = args.includes('--sync');
const runReset = args.includes('--reset');
const runApply = args.includes('--apply');

const main = async () => {
  if (args.includes('--help')) {
    help();
    return;
  }
  if (runApply) {
    applySelectedProcedures();
    return;
  }
  if (runAll) {
    resetAllBackups();

    logSection(getTranslation('procedures_start'));
    await exportProcedures();

    logSection(getTranslation('views_start'));
    await exportViews();

    logSection(getTranslation('materialized_views_start'));
    await exportMaterializedViews();
    logSection(getTranslation('sql_format_start'));
    await formatSql();
    logSection(getTranslation('finished'));
  }

  if (runReset) {
    logSection(getTranslation('reset_start'));
    resetProcedure();
    logSection(getTranslation('reset_finished'));
  }

  if (runSync) {
    logSection(getTranslation('sync_start'));
    await syncProcedures();
    logSection(getTranslation('sync_finished'));
  }
};

main();
