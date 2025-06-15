// scripts/formatSql.js

const { format } = require("sql-formatter");
const { readFileSync, writeFileSync } = require("fs");
const { log, logSection } = require("./logger");
const formatSql = async () => {
  const globby = (await import("globby")).globby;

  logSection("Formatação de arquivos SQL");

  const paths = await globby([
    "backups/**/*.sql",
    "!backups/**/node_modules/**",
  ]);

  for (const file of paths) {
    try {
      const raw = readFileSync(file, "utf-8");
      const formatted = format(raw, {
        language: "postgresql",
        indent: "  ",
        uppercase: true,
      });

      writeFileSync(file, formatted, "utf-8");
      log(`✔ Formatado: ${file}`);
    } catch (err) {
      log(`❌ Erro ao formatar ${file}: ${err.message}`);
    }
  }

  log("✅ Formatação concluída.");
};

module.exports = {
  formatSql,
};
