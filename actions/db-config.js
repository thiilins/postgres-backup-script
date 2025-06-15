const dotenv = require("dotenv");
dotenv.config();
const dbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  schema: process.env.DB_SCHEMA,
};

module.exports = {
  dbConfig,
};
