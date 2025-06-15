// scripts/formatSql.js

const { format } = require('sql-formatter');
const { readFileSync, writeFileSync } = require('fs');
const { log, logSection, getTranslation } = require('./logger');

const formatSql = async () => {
  const globby = (await import('globby')).globby;

  logSection(getTranslation('formatting_sql'));

  const paths = await globby(['backups/**/*.sql', '!backups/**/node_modules/**']);

  for (const file of paths) {
    try {
      const raw = readFileSync(file, 'utf-8');
      const formatted = format(raw, {
        language: 'postgresql',
        indent: '  ',
        uppercase: true,
      });

      writeFileSync(file, formatted, 'utf-8');
      log(`✔ ${getTranslation('formatted_file')} ${file}`);
    } catch (err) {
      log(`❌ ${getTranslation('error_formatting')} ${file}: ${err.message}`);
    }
  }

  log(`✅ ${getTranslation('formatting_completed')}`);
};

module.exports = {
  formatSql,
};
