const fs = require('fs');
const {
  backupDir,
  viewsBackupDir,
  materializedViewsBackupDir,
  proceduresBackupDir,
} = require('./constants');
const { resetLog } = require('./logger');

const cleanOldBackups = () => {
  // Apaga a pasta de backup de views

  // Apaga a pasta de backup de views materializadas
  if (fs.existsSync(materializedViewsBackupDir))
    fs.rmSync(materializedViewsBackupDir, { recursive: true });

  // Apaga a pasta de backup de procedures
  if (fs.existsSync(proceduresBackupDir)) fs.rmSync(proceduresBackupDir, { recursive: true });
};

const createBackupDir = () => {
  // Cria a pasta de backup principal

  // Cria a pasta de backup de views

  // Cria a pasta de backup de views materializadas
  if (!fs.existsSync(materializedViewsBackupDir))
    fs.mkdirSync(materializedViewsBackupDir, { recursive: true });

  // Cria a pasta de backup de procedures
  if (!fs.existsSync(proceduresBackupDir)) fs.mkdirSync(proceduresBackupDir, { recursive: true });
};

const resetAllBackups = () => {
  if (fs.existsSync(backupDir)) fs.rmSync(backupDir, { recursive: true });
  fs.mkdirSync(backupDir, { recursive: true });
  resetLog();
};

module.exports = {
  resetAllBackups,
};
