const fs = require("fs");
const {
  backupDir,
  viewsBackupDir,
  materializedViewsBackupDir,
  proceduresBackupDir,
} = require("./constants");

const cleanOldBackups = () => {
  // Apaga a pasta de backup de views
  if (fs.existsSync(viewsBackupDir))
    fs.rmSync(viewsBackupDir, { recursive: true });

  // Apaga a pasta de backup de views materializadas
  if (fs.existsSync(materializedViewsBackupDir))
    fs.rmSync(materializedViewsBackupDir, { recursive: true });

  // Apaga a pasta de backup de procedures
  if (fs.existsSync(proceduresBackupDir))
    fs.rmSync(proceduresBackupDir, { recursive: true });
};

const createBackupDir = () => {
  // Cria a pasta de backup principal
  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
  // Cria a pasta de backup de views
  if (!fs.existsSync(viewsBackupDir))
    fs.mkdirSync(viewsBackupDir, { recursive: true });

  // Cria a pasta de backup de views materializadas
  if (!fs.existsSync(materializedViewsBackupDir))
    fs.mkdirSync(materializedViewsBackupDir, { recursive: true });

  // Cria a pasta de backup de procedures
  if (!fs.existsSync(proceduresBackupDir))
    fs.mkdirSync(proceduresBackupDir, { recursive: true });
};

const resetAllBackups = () => {
  cleanOldBackups();
  createBackupDir();
};

module.exports = {
  cleanOldBackups,
  createBackupDir,
  resetAllBackups,
};
