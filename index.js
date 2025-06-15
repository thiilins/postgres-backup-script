const { exportProcedures } = require('./actions/procedures');
const { exportViews } = require('./actions/views');
const { exportMaterializedViews } = require('./actions/materialized-views');
const { formatSql } = require('./actions/sql-format');
const { logSection } = require('./actions/logger');
const { resetAllBackups } = require('./actions/clean-old');
const { getTranslation } = require('./translations');
const main = async () => {
  await resetAllBackups();
  logSection(getTranslation('procedures_start'));
  await exportProcedures();

  logSection(getTranslation('views_start'));
  await exportViews();

  logSection(getTranslation('materialized_views_start'));
  await exportMaterializedViews();

  logSection(getTranslation('sql_format_start'));
  await formatSql();

  logSection(getTranslation('finished'));
};

main();
