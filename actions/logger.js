const fs = require("fs");
const path = require("path");
const { backupDir } = require("./constants");
const resetLog = () => {
  const fileName = `export.log`;
  const logPath = path.join(backupDir, fileName);

  try {
    if (fs.existsSync(logPath)) {
      fs.unlinkSync(logPath);
      console.log("🧹 Log anterior apagado:", logPath);
    }
  } catch (err) {
    console.error("❌ Erro ao tentar limpar o log:", err.message);
  }

  return logPath;
};

const getLogPath = () => {
  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
  const fileName = `export.log`;
  return path.join(backupDir, fileName);
};
const logSection = (title) => {
  const sectionHeader = `
  
========================================
🔹 ${title.toUpperCase()}
========================================
`;

  log(sectionHeader.trim());
};
const logFile = () => {
  const logPath = getLogPath();
  if (!fs.existsSync(logPath)) fs.writeFileSync(logPath, "");
  return logPath;
};

// Grava mensagem no console e no log
const log = (message) => {
  console.log(message);
  fs.appendFileSync(logFile(), message + "\n");
};

module.exports = {
  log,
  resetLog,
  logSection,
};
