# 📦 Backup de Procedures e Views do PostgreSQL

🌐 **Escolha o idioma / Select language / Elige el idioma:**

- 🇧🇷 [Português](README.pt.md)
- 🇺🇸 [English](README.en.md)
- 🇪🇸 [Español](README.es.md)

Este projeto é uma ferramenta automatizada para realizar backup de procedures, views e views
materializadas de bancos de dados PostgreSQL. Foi desenvolvido para auxiliar na documentação e
versionamento de objetos de banco, organizando os arquivos por data e schema.

## 📑 Índice

- [📦 Backup de Procedures e Views do PostgreSQL](#-backup-de-procedures-e-views-do-postgresql)
  - [📑 Índice](#-índice)
  - [🚀 Scripts Disponíveis](#-scripts-disponíveis)
    - [Iniciar](#iniciar)
    - [Formatar (Prettier)](#formatar-prettier)
  - [🌍 Suporte a Múltiplos Idiomas](#-suporte-a-múltiplos-idiomas)
  - [🚀 Funcionalidades](#-funcionalidades)
  - [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
  - [📋 Requisitos](#-requisitos)
  - [🔧 Instalação](#-instalação)
  - [🚀 Como Usar](#-como-usar)
  - [📁 Estrutura de Arquivos](#-estrutura-de-arquivos)
  - [📝 Logs](#-logs)
  - [🧐 Detalhes Técnicos](#-detalhes-técnicos)
  - [🤝 Contribuição](#-contribuição)
  - [📄 Licença](#-licença)

## 🚀 Scripts Disponíveis

Scripts útis para rodar o backup e formatar arquivos SQL:

### Iniciar

```bash
# Inicia o processo de backup
yarn start
# ou
npm start
# ou
pnpm start
```

### Formatar (Prettier)

```bash
# Formata todos os arquivos do projeto com Prettier
yarn format
# ou
npm run format
# ou
pnpm format
```

## 🌍 Suporte a Múltiplos Idiomas

O projeto suporta três idiomas:

- Inglês (en)
- Português (pt)
- Espanhol (es)

Para definir o idioma, use a variável de ambiente `LANGUAGE`:

```env
# Para Inglês
LANGUAGE=en

# Para Português
LANGUAGE=pt

# Para Espanhol
LANGUAGE=es
```

Se nenhum idioma for especificado, o padrão será inglês.

## 🚀 Funcionalidades

- Backup automático de procedures
- Backup automático de views
- Backup automático de views materializadas
- Formatação automática de SQL
- Organização por data e schema
- Logs detalhados do processo
- Suporte a múltiplos schemas do PostgreSQL

## 🛠️ Tecnologias Utilizadas

- Node.js
- PostgreSQL (pg)
- SQL Formatter
- Moment.js (para manipulação de datas)
- Dotenv (para variáveis de ambiente)
- Globby (para manipulação de arquivos)

## 📋 Requisitos

- Node.js instalado
- Acesso a um banco de dados PostgreSQL
- Yarn, NPM ou PNPM instalado

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone [REPOSITORY_URL]
```

2. Instale as dependências:

```bash
yarn install
# ou
npm install
# ou
pnpm install
```

3. Configure o arquivo `.env` na raiz do projeto com as variáveis:

```env
DB_HOST=seu_host
DB_PORT=sua_porta
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seu_banco
DB_SCHEMA=seu_schema  # Opcional – se omitido, exporta todos os schemas não-sistema
```

## 🚀 Como Usar

Para rodar o backup, execute:

```bash
node index.js
# Ou utilize o script:
npm start
```

O script vai:

1. Criar uma pasta de backup com a data atual
2. Exportar todas as procedures
3. Exportar todas as views
4. Exportar todas as views materializadas
5. Formatar todos os arquivos SQL
6. Organizar os arquivos por schema e data

## 📁 Estrutura de Arquivos

```
backups/
└── nome_do_banco/
    └── YYYY-MM-DD/
        ├── procedures/
        │   └── nome_do_schema/
        │       └── nome_procedure.sql
        ├── views/
        │   └── nome_do_schema/
        │       └── nome_view.sql
        ├── materialized-views/
        │   └── nome_do_schema/
        │       └── nome_view_materializada.sql
        └── export.log
```

## 📝 Logs

O projeto gera logs detalhados com:

- Início e fim de cada etapa
- Status das operações
- Erros (se houver)
- Arquivos gerados
- Schemas processados

Os logs são salvos em `backups/[nome_do_banco]/[data]/export.log`

## 🧐 Detalhes Técnicos

- **Schemas**: Por padrão, o script exporta de todos os schemas não-sistema. Excluídos:
  `pg_catalog`, `information_schema`, `pg_temp_*`, `pg_toast*`
- **Formatação SQL**: Todos os SQLs são formatados com sql-formatter (modo PostgreSQL)
- **Organização**: Pastas por data e schema facilitam o versionamento
- **Conexão**: Usa cliente `pg` do Node.js
- **Erros**: Possui tratamento robusto para falhas em qualquer etapa

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork no repositório
2. Crie uma branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit das mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para o repositório (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais
detalhes.
