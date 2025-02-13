require("dotenv").config();
const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

// Configuração do banco de dados via .env
const dbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  schema: process.env.DB_SCHEMA || "public",
};

// Diretório onde os arquivos serão salvos
const backupDir = path.join(__dirname, "backup_procedures");

// Função para conectar ao banco e exportar as procedures
async function exportProcedures() {
  const client = new Client(dbConfig);

  try {
    await client.connect();
    console.log("✅ Conectado ao banco de dados...");

    // Query para obter todas as procedures do schema
    const query = `
      SELECT p.proname AS procedure_name,
             pg_get_functiondef(p.oid) AS definition
      FROM pg_proc p
      JOIN pg_namespace n ON p.pronamespace = n.oid
      WHERE n.nspname = $1;
    `;

    const res = await client.query(query, [dbConfig.schema]);

    if (res.rows.length === 0) {
      console.log("⚠️ Nenhuma procedure encontrada no schema:", dbConfig.schema);
      return;
    }

    // Criar a pasta de backup se não existir
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Salvar cada procedure em um arquivo separado
    for (const row of res.rows) {
      const fileName = `${row.procedure_name}.sql`;
      const filePath = path.join(backupDir, fileName);

      fs.writeFileSync(filePath, row.definition);
      console.log(`📄 Backup criado: ${filePath}`);
    }

    console.log("✅ Backup concluído com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao exportar procedures:", error);
  } finally {
    await client.end();
  }
}

// Executar a função
exportProcedures();
