const fs = require('fs');
const {
  backupDir,
  viewsBackupDir,
  materializedViewsBackupDir,
  proceduresBackupDir,
} = require('./constants');
const { resetLog } = require('./logger');

const resetAllBackups = () => {
  if (fs.existsSync(backupDir)) fs.rmSync(backupDir, { recursive: true });
  fs.mkdirSync(backupDir, { recursive: true });
  resetLog();
};

module.exports = {
  resetAllBackups,
};
