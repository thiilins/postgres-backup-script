# 📦 PostgreSQL Procedures and Views Backup

🌐 **Escolha o idioma / Select language / Elige el idioma:**

- 🇧🇷 [Português](README.pt.md)
- 🇺🇸 [English](README.en.md)
- 🇪🇸 [Español](README.es.md)

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
    - [Automatic Backup](#automatic-backup)
    - [Formatting and Quality](#formatting-and-quality)
    - [Environment Management](#environment-management)
    - [Logging and Monitoring](#logging-and-monitoring)
    - [Internationalization](#internationalization)
    - [Security](#security)
  - [🛠️ Technologies Used](#️-technologies-used)
  - [📋 Prerequisites](#-prerequisites)
  - [🔧 Installation](#-installation)
  - [🚀 How to Use](#-how-to-use)
    - [Installation](#installation)
    - [Available Commands](#available-commands)
      - [Complete Backup](#complete-backup)
      - [Environment Synchronization](#environment-synchronization)
      - [Backup Cleanup](#backup-cleanup)
      - [Help](#help)
    - [Backup Structure](#backup-structure)
    - [Logs and Monitoring](#logs-and-monitoring)
    - [Usage Tips](#usage-tips)
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

# Available options:
--help    # Shows help
--all     # Runs complete backup (default)
--sync    # Syncs procedures between environments
--reset   # Cleans old backups
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

### Automatic Backup

- **Procedures**: Exports all database procedures, maintaining original structure and formatting
- **Views**: Backs up all views, including their definitions and dependencies
- **Materialized Views**: Exports materialized views with their refresh configurations
- **Smart Organization**: Structures backups by date and schema for easy location
- **Advanced Naming**: File names based on argument types to ensure uniqueness

### Formatting and Quality

- **SQL Formatting**: Applies consistent formatting to all SQL files
- **Syntax Validation**: Verifies SQL syntax during the backup process
- **Comment Preservation**: Maintains original comments and documentation

### Environment Management

- **Synchronization**: Allows syncing procedures between environments (e.g., HML to PRD)
- **Safe Reset**: Option to clean old backups while maintaining organization
- **Multi-schema**: Support for backing up multiple schemas simultaneously

### Logging and Monitoring

- **Detailed Logs**: Records all operations with timestamps
- **Error Handling**: Robust error handling and reporting system
- **Real-time Status**: Visual feedback of operation progress

### Internationalization

- **Multiple Languages**: Full support for English, Portuguese, and Spanish
- **Adaptive Interface**: Messages and logs in configured language
- **Multilingual Documentation**: READMEs available in three languages

### Security

- **Secure Credentials**: Uses environment variables for sensitive data
- **Connection Validation**: Permission verification before operations
- **Secure Backup**: Preserves permissions and object ownership

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
cd procedure-backups-script
```

2. Install dependencies:

```bash
yarn install
# or
npm install
# or
pnpm install
```

3. Configure the `.env` file in the project root:

```env
# Database Settings
DB_HOST=your_host
DB_PORT=your_port
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database
DB_SCHEMA=your_schema  # Optional – if omitted, exports all non-system schemas

# Environment Settings
LANGUAGE=en  # en, pt, es
```

## 🚀 How to Use

### Installation

1. Clone the repository:

```bash
git clone [REPOSITORY_URL]
cd procedure-backups-script
```

2. Install dependencies:

```bash
yarn install
# or
npm install
# or
pnpm install
```

3. Configure the `.env` file in the project root:

```env
# Database Settings
DB_HOST=your_host
DB_PORT=your_port
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database
DB_SCHEMA=your_schema  # Optional – if omitted, exports all non-system schemas

# Environment Settings
LANGUAGE=en  # en, pt, es
```

### Available Commands

#### Complete Backup

```bash
# Executes backup of procedures, views, and materialized views
npm start
# or
yarn start
# or
pnpm start
```

#### Environment Synchronization

```bash
# Syncs procedures from HML to PRD environment
npm start -- --sync
# or
yarn start --sync
# or
pnpm start --sync
```

#### Backup Cleanup

```bash
# Removes old backups while maintaining organization
npm start -- --reset
# or
yarn start --reset
# or
pnpm start --reset
```

#### Help

```bash
# Shows all available options
npm start -- --help
# or
yarn start --help
# or
pnpm start --help
```

### Backup Structure

After execution, files will be organized as follows:

```
backups/
└── database_name/
    └── YYYY-MM-DD/
        ├── procedures/
        │   └── schema_name/
        │       └── procedure_name_arg_type.sql
        ├── views/
        │   └── schema_name/
        │       └── view_name.sql
        ├── materialized-views/
        │   └── schema_name/
        │       └── materialized_view_name.sql
        └── export.log
```

### Logs and Monitoring

- Logs are saved in `backups/[database_name]/[date]/export.log`
- Each operation is logged with timestamp
- Errors are highlighted with ❌
- Successful operations are marked with ✅

### Usage Tips

1. **Regular Backup**: Run the backup daily to maintain an updated history
2. **Specific Schemas**: Use `DB_SCHEMA` to export only specific schemas
3. **Language**: Configure `LANGUAGE` to receive messages in your preferred language
4. **Synchronization**: Use `--sync` to keep different environments in sync
5. **Cleanup**: Run `--reset` periodically to avoid accumulation of old backups

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
- **Procedure Names**: Procedure files are named using the procedure name and argument types to
  ensure uniqueness

## 🤝 Contributing

Contributions are always welcome! To contribute:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is under the MIT license. See the [LICENSE](LICENSE) file for more details.
