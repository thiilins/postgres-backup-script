const { exportProcedures } = require("./actions/procedures");
const { exportViews } = require("./actions/views");
const { exportMaterializedViews } = require("./actions/materialized-views");
const { resetAllBackups } = require("./actions/folder-management");
const main = async () => {
  await resetAllBackups();
  await exportProcedures();
  await exportViews();
  await exportMaterializedViews();
};

main();
