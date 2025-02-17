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

// Diretórios onde os arquivos serão salvos
const baseBackupDir = path.join(__dirname, "backup_views");
const viewsDir = path.join(baseBackupDir, "views");
const materializedViewsDir = path.join(baseBackupDir, "views_materializadas");

// Função para conectar ao banco e exportar views e views materializadas
async function exportViews() {
  const client = new Client(dbConfig);

  try {
    await client.connect();
    console.log("✅ Conectado ao banco de dados...");

    // Queries para obter views e views materializadas
    const queries = {
      views: `
        SELECT c.relname AS view_name,
               pg_get_viewdef(c.oid, true) AS definition
        FROM pg_class c
        JOIN pg_namespace n ON c.relnamespace = n.oid
        WHERE c.relkind = 'v' AND n.nspname = $1;
      `,
      materialized_views: `
        SELECT c.relname AS view_name,
               pg_get_viewdef(c.oid, true) AS definition
        FROM pg_class c
        JOIN pg_namespace n ON c.relnamespace = n.oid
        WHERE c.relkind = 'm' AND n.nspname = $1;
      `,
    };

    // Criar diretórios de backup se não existirem
    if (!fs.existsSync(viewsDir)) fs.mkdirSync(viewsDir, { recursive: true });
    if (!fs.existsSync(materializedViewsDir)) fs.mkdirSync(materializedViewsDir, { recursive: true });

    for (const [type, query] of Object.entries(queries)) {
      const res = await client.query(query, [dbConfig.schema]);

      if (res.rows.length === 0) {
        console.log(`⚠️ Nenhuma ${type.replace('_', ' ')} encontrada no schema:`, dbConfig.schema);
        continue;
      }

      for (const row of res.rows) {
        const fileName = `${row.view_name}.sql`;
        const filePath = path.join(type === "views" ? viewsDir : materializedViewsDir, fileName);

        fs.writeFileSync(filePath, `CREATE OR REPLACE VIEW ${row.view_name} AS \n${row.definition};`);
        console.log(`📄 Backup criado: ${filePath}`);
      }
    }

    console.log("✅ Backup concluído com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao exportar views:", error);
  } finally {
    await client.end();
  }
}

// Executar a função
exportViews();
