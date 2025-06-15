# 📦 PostgreSQL Procedures and Views Backup

[Português](README.md) | [Español](README.es.md)

This project is an automated tool for backing up procedures, views, and materialized views from
PostgreSQL databases. It was developed to help with documentation and versioning of database
objects, organizing backups by date and schema.

## 📑 Table of Contents

- [📦 PostgreSQL Procedures and Views Backup](#-postgresql-procedures-and-views-backup)
  - [📑 Table of Contents](#-table-of-contents)
  - [🚀 Available Scripts](#-available-scripts)
    - [Start](#start)
    - [Format (Prettier)](#format-prettier)
  - [🌍 Multi-language Support](#-multi-language-support)
  - [🚀 Features](#-features)
  - [🛠️ Technologies Used](#️-technologies-used)
  - [📋 Prerequisites](#-prerequisites)
  - [🔧 Installation](#-installation)
  - [🚀 How to Use](#-how-to-use)
  - [📁 File Structure](#-file-structure)
  - [📝 Logs](#-logs)
  - [🧐 Technical Details](#-technical-details)
  - [🤝 Contributing](#-contributing)
  - [📄 License](#-license)

## 🚀 Available Scripts

Useful npm scripts for running backups and formatting SQL files:

### Start

```bash
# Starts the backup process
npm start
# or
pnpm start
# or
yarn start
```

### Format (Prettier)

```bash
# Formats all project files using Prettier
npm run format
# or
pnpm format
# or
yarn format
```

## 🌍 Multi-language Support

The project supports three languages:

- English (en)
- Portuguese (pt)
- Spanish (es)

To set the language, use the `LANGUAGE` environment variable:

```env
# For English
LANGUAGE=en

# For Portuguese
LANGUAGE=pt

# For Spanish
LANGUAGE=es
```

If no language is specified, the system will use English as default.

## 🚀 Features

- Automatic procedures backup
- Automatic views backup
- Automatic materialized views backup
- Automatic SQL formatting
- Backup organization by date and schema
- Detailed process logs
- Support for multiple PostgreSQL schemas

## 🛠️ Technologies Used

- Node.js
- PostgreSQL (pg)
- SQL Formatter
- Moment.js (for date manipulation)
- Dotenv (for environment variables)
- Globby (for file handling)

## 📋 Prerequisites

- Node.js installed
- Access to a PostgreSQL database
- Yarn, NPM, or PNPM installed

## 🔧 Installation

1. Clone the repository:

```bash
git clone [REPOSITORY_URL]
```

2. Install dependencies:

```bash
yarn install
# or
npm install
# or
pnpm install
```

3. Configure environment variables: Create a `.env` file in the project root with the following
   variables:

```env
DB_HOST=your_host
DB_PORT=your_port
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database
DB_SCHEMA=your_schema  # Optional – if omitted, exports all schemas except system ones
```

## 🚀 How to Use

To run the backup, simply execute:

```bash
node index.js
# Or use the script:
npm start
```

The script will:

1. Create a new backup folder with the current date
2. Export all procedures
3. Export all views
4. Export all materialized views
5. Format all generated SQL
6. Save files in the organized structure

## 📁 File Structure

```
backups/
└── database_name/
    └── YYYY-MM-DD/
        ├── procedures/
        │   └── schema_name/
        │       └── procedure_name.sql
        ├── views/
        │   └── schema_name/
        │       └── view_name.sql
        ├── materialized-views/
        │   └── schema_name/
        │       └── materialized_view_name.sql
        └── export.log
```

## 📝 Logs

The project generates detailed logs during execution, showing:

- Start and end of each section
- Status of each operation
- Errors (if any)
- Generated files
- Processed schemas

Logs are saved in `backups/[database_name]/[date]/export.log`

## 🧐 Technical Details

- **Schemas**: By default, the script exports objects from all non-system schemas. Excluded schemas:
  `pg_catalog`, `information_schema`, `pg_temp_*`, `pg_toast*`
- **SQL Formatting**: All SQL is automatically formatted using sql-formatter with
  PostgreSQL-specific settings
- **Organization**: Backups are organized by date and schema, facilitating location and versioning
- **Connection**: Uses the pg client for database connection
- **Error Handling**: Implements robust error handling in all operations

## 🤝 Contributing

Contributions are always welcome! To contribute:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is under the MIT license. See the [LICENSE](LICENSE) file for more details.
