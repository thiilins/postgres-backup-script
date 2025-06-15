const path = require('path');
const moment = require('moment');
const date = moment().format('YYYY-MM-DD');
const { dbConfig } = require('./db-config');

const baseBackupDir = path.join(__dirname, '..', 'backups');
const backupDir = path.join(baseBackupDir, dbConfig.database, date);
const viewsBackupDir = path.join(backupDir, 'views');
const materializedViewsBackupDir = path.join(backupDir, 'materialized-views');
const proceduresBackupDir = path.join(backupDir, 'procedures');

module.exports = {
  backupDir,
  viewsBackupDir,
  materializedViewsBackupDir,
  proceduresBackupDir,
};
