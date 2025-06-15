import { exportProcedures } from "./procedures/index.js";
import { exportViews } from "./views/index.js";

const main = async () => {
  console.log("--------------------------------");
  console.log("Iniciando backup...");
  console.log("--------------------------------");
  console.log("Iniciando backup de procedures...");
  await exportProcedures();
  console.log("Backup de procedures concluído!");
  console.log("--------------------------------");
  console.log("Iniciando backup de views...");
  await exportViews();
  console.log("Backup de views concluído!");
  console.log("--------------------------------");
  console.log("Backup concluído com sucesso!");
};

main();
