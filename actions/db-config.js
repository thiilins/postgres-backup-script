const dotenv = require('dotenv');
dotenv.config();
// 'prd' ou 'hml'
const dbDefault = process.env.DB_ENV || 'prd';
const dbConfigPrd = {
  user: process.env.DB_USER_PRD,
  host: process.env.DB_HOST_PRD,
  database: process.env.DB_NAME_PRD,
  password: process.env.DB_PASSWORD_PRD,
  port: process.env.DB_PORT_PRD ? parseInt(process.env.DB_PORT_PRD) : 5432,
  schema: process.env.DB_SCHEMA_PRD,
};

const dbConfigHml = {
  user: process.env.DB_USER_HML,
  host: process.env.DB_HOST_HML,
  database: process.env.DB_NAME_HML,
  password: process.env.DB_PASSWORD_HML,
  port: process.env.DB_PORT_HML ? parseInt(process.env.DB_PORT_HML) : 5432,
  schema: process.env.DB_SCHEMA_HML,
};

const dbConfig = dbDefault === 'prd' ? dbConfigPrd : dbConfigHml;

module.exports = {
  dbConfig,
  dbConfigPrd,
  dbConfigHml,
};
