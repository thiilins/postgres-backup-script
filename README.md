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

# Opções disponíveis:
--help    # Mostra a ajuda
--all     # Executa backup completo (padrão)
--sync    # Sincroniza procedures entre ambientes
--reset   # Limpa backups antigos
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

### Backup Automático

- **Procedures**: Exporta todas as procedures do banco de dados, mantendo a estrutura original e
  formatação
- **Views**: Realiza backup de todas as views, incluindo suas definições e dependências
- **Views Materializadas**: Exporta views materializadas com suas configurações de refresh
- **Organização Inteligente**: Estrutura os backups por data e schema para fácil localização
- **Nomenclatura Avançada**: Nomes de arquivos baseados em tipos de argumentos para garantir
  unicidade

### Formatação e Qualidade

- **Formatação SQL**: Aplica formatação consistente em todos os arquivos SQL
- **Validação de Sintaxe**: Verifica a sintaxe SQL durante o processo de backup
- **Preservação de Comentários**: Mantém comentários e documentação original

### Gerenciamento de Ambientes

- **Sincronização**: Permite sincronizar procedures entre ambientes (ex: HML para PRD)
- **Reset Seguro**: Opção para limpar backups antigos mantendo a organização
- **Multi-schema**: Suporte para backup de múltiplos schemas simultaneamente

### Logs e Monitoramento

- **Logs Detalhados**: Registra todas as operações com timestamps
- **Tratamento de Erros**: Sistema robusto de tratamento e reportagem de erros
- **Status em Tempo Real**: Feedback visual do progresso das operações

### Internacionalização

- **Múltiplos Idiomas**: Suporte completo para Português, Inglês e Espanhol
- **Interface Adaptativa**: Mensagens e logs no idioma configurado
- **Documentação Multilíngue**: READMEs disponíveis em três idiomas

### Segurança

- **Credenciais Seguras**: Uso de variáveis de ambiente para dados sensíveis
- **Validação de Conexão**: Verificação de permissões antes das operações
- **Backup Seguro**: Preserva permissões e ownership dos objetos

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
cd procedure-backups-script
```

2. Instale as dependências:

```bash
yarn install
# ou
npm install
# ou
pnpm install
```

3. Configure o arquivo `.env` na raiz do projeto:

```env
# Configurações do Banco de Dados
DB_HOST=seu_host
DB_PORT=sua_porta
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seu_banco
DB_SCHEMA=seu_schema  # Opcional – se omitido, exporta todos os schemas não-sistema

# Configurações do Ambiente
LANGUAGE=pt  # pt, en, es
```

## 🚀 Como Usar

### Instalação

1. Clone o repositório:

```bash
git clone [REPOSITORY_URL]
cd procedure-backups-script
```

2. Instale as dependências:

```bash
yarn install
# ou
npm install
# ou
pnpm install
```

3. Configure o arquivo `.env` na raiz do projeto:

```env
# Configurações do Banco de Dados
DB_HOST=seu_host
DB_PORT=sua_porta
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seu_banco
DB_SCHEMA=seu_schema  # Opcional – se omitido, exporta todos os schemas não-sistema

# Configurações do Ambiente
LANGUAGE=pt  # pt, en, es
```

### Comandos Disponíveis

#### Backup Completo

```bash
# Executa backup de procedures, views e views materializadas
npm start
# ou
yarn start
# ou
pnpm start
```

#### Sincronização entre Ambientes

```bash
# Sincroniza procedures do ambiente HML para PRD
npm start -- --sync
# ou
yarn start --sync
# ou
pnpm start --sync
```

#### Limpeza de Backups

```bash
# Remove backups antigos mantendo a organização
npm start -- --reset
# ou
yarn start --reset
# ou
pnpm start --reset
```

#### Ajuda

```bash
# Mostra todas as opções disponíveis
npm start -- --help
# ou
yarn start --help
# ou
pnpm start --help
```

### Estrutura de Backups

Após a execução, os arquivos serão organizados da seguinte forma:

```
backups/
└── nome_do_banco/
    └── YYYY-MM-DD/
        ├── procedures/
        │   └── nome_do_schema/
        │       └── nome_procedure_tipo_arg.sql
        ├── views/
        │   └── nome_do_schema/
        │       └── nome_view.sql
        ├── materialized-views/
        │   └── nome_do_schema/
        │       └── nome_view_materializada.sql
        └── export.log
```

### Logs e Monitoramento

- Os logs são salvos em `backups/[nome_do_banco]/[data]/export.log`
- Cada operação é registrada com timestamp
- Erros são destacados com ❌
- Operações bem-sucedidas são marcadas com ✅

### Dicas de Uso

1. **Backup Regular**: Execute o backup diariamente para manter um histórico atualizado
2. **Schemas Específicos**: Use `DB_SCHEMA` para exportar apenas schemas específicos
3. **Idioma**: Configure `LANGUAGE` para receber mensagens no seu idioma preferido
4. **Sincronização**: Use `--sync` para manter ambientes diferentes sincronizados
5. **Limpeza**: Execute `--reset` periodicamente para evitar acúmulo de backups antigos

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
- **Nomes de Procedures**: Os arquivos de procedures são nomeados usando o nome da procedure e os
  tipos de argumentos para garantir unicidade

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
