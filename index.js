const { exportProcedures } = require("./actions/procedures");
const { exportViews } = require("./actions/views");
const { exportMaterializedViews } = require("./actions/materialized-views");
const { formatSql } = require("./actions/sql-format");
const { logSection } = require("./actions/logger");
const { resetAllBackups } = require("./actions/clean-old");
const main = async () => {
  await resetAllBackups();
  logSection("Exportando procedures");
  await exportProcedures();

  logSection("Exportando views");
  await exportViews();

  logSection("Exportando views materializadas");
  await exportMaterializedViews();

  logSection("Formatando SQL");
  await formatSql();

  logSection("Finalizado");
};

main();
