# 📦 Respaldo de Procedimientos y Vistas de PostgreSQL

🌐 **Escolha o idioma / Select language / Elige el idioma:**

- 🇧🇷 [Português](README.pt.md)
- 🇺🇸 [English](README.en.md)
- 🇪🇸 [Español](README.es.md)

  Este proyecto es una herramienta automatizada para respaldar procedimientos, vistas y vistas
  materializadas de bases de datos PostgreSQL. Fue desarrollado para ayudar con la documentación y
  el versionado de objetos de base de datos, organizando los respaldos por fecha y esquema.

## 📑 Índice

- [📦 Respaldo de Procedimientos y Vistas de PostgreSQL](#-respaldo-de-procedimientos-y-vistas-de-postgresql)
  - [📑 Índice](#-índice)
  - [🚀 Scripts Disponibles](#-scripts-disponibles)
    - [Iniciar](#iniciar)
    - [Formatear (Prettier)](#formatear-prettier)
  - [🌍 Soporte Multilenguaje](#-soporte-multilenguaje)
  - [🚀 Características](#-características)
  - [🛠️ Tecnologías Utilizadas](#️-tecnologías-utilizadas)
  - [📋 Requisitos Previos](#-requisitos-previos)
  - [🔧 Instalación](#-instalación)
  - [🚀 Cómo Usar](#-cómo-usar)
  - [📁 Estructura de Archivos](#-estructura-de-archivos)
  - [📝 Registros (Logs)](#-registros-logs)
  - [🧐 Detalles Técnicos](#-detalles-técnicos)
  - [🤝 Contribuir](#-contribuir)
  - [📄 Licencia](#-licencia)

## 🚀 Scripts Disponibles

Scripts útiles de npm para ejecutar respaldos y formatear archivos SQL:

### Iniciar

```bash
# Inicia el proceso de respaldo
npm start
# o
pnpm start
# o
yarn start
```

### Formatear (Prettier)

```bash
# Formatea todos los archivos del proyecto usando Prettier
npm run format
# o
pnpm format
# o
yarn format
```

## 🌍 Soporte Multilenguaje

El proyecto soporta tres idiomas:

- Inglés (en)
- Portugués (pt)
- Español (es)

Para definir el idioma, use la variable de entorno `LANGUAGE`:

```env
# Para Inglés
LANGUAGE=en

# Para Portugués
LANGUAGE=pt

# Para Español
LANGUAGE=es
```

Si no se especifica ningún idioma, se utilizará Inglés por defecto.

## 🚀 Características

- Respaldo automático de procedimientos
- Respaldo automático de vistas
- Respaldo automático de vistas materializadas
- Formateo automático de SQL
- Organización del respaldo por fecha y esquema
- Registro detallado del proceso
- Soporte para múltiples esquemas de PostgreSQL

## 🛠️ Tecnologías Utilizadas

- Node.js
- PostgreSQL (pg)
- SQL Formatter
- Moment.js (para manipulación de fechas)
- Dotenv (para variables de entorno)
- Globby (para manejo de archivos)

## 📋 Requisitos Previos

- Node.js instalado
- Acceso a una base de datos PostgreSQL
- Yarn, NPM o PNPM instalados

## 🔧 Instalación

1. Clonar el repositorio:

```bash
git clone [REPOSITORY_URL]
```

2. Instalar dependencias:

```bash
yarn install
# o
npm install
# o
pnpm install
```

3. Configurar las variables de entorno: Crear un archivo `.env` en la raíz del proyecto con las
   siguientes variables:

```env
DB_HOST=tu_host
DB_PORT=tu_puerto
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=tu_base_de_datos
DB_SCHEMA=tu_esquema  # Opcional – si se omite, se exportan todos los esquemas excepto los del sistema
```

## 🚀 Cómo Usar

Para ejecutar el respaldo, simplemente ejecute:

```bash
node index.js
# O utilice el script:
npm start
```

El script realizará:

1. Crear una nueva carpeta de respaldo con la fecha actual
2. Exportar todos los procedimientos
3. Exportar todas las vistas
4. Exportar todas las vistas materializadas
5. Formatear todos los archivos SQL generados
6. Guardar los archivos en la estructura organizada

## 📁 Estructura de Archivos

```
backups/
└── nombre_base_datos/
    └── YYYY-MM-DD/
        ├── procedures/
        │   └── nombre_esquema/
        │       └── nombre_procedimiento.sql
        ├── views/
        │   └── nombre_esquema/
        │       └── nombre_vista.sql
        ├── materialized-views/
        │   └── nombre_esquema/
        │       └── nombre_vista_materializada.sql
        └── export.log
```

## 📝 Registros (Logs)

El proyecto genera registros detallados durante la ejecución, mostrando:

- Inicio y fin de cada sección
- Estado de cada operación
- Errores (si los hay)
- Archivos generados
- Esquemas procesados

Los registros se guardan en `backups/[nombre_base_datos]/[fecha]/export.log`

## 🧐 Detalles Técnicos

- **Esquemas**: Por defecto, el script exporta objetos de todos los esquemas que no sean del
  sistema. Se excluyen los esquemas: `pg_catalog`, `information_schema`, `pg_temp_*`, `pg_toast*`
- **Formateo de SQL**: Todo el SQL se formatea automáticamente usando sql-formatter con
  configuración para PostgreSQL
- **Organización**: Los respaldos se organizan por fecha y esquema, facilitando su localización y
  versionado
- **Conexión**: Utiliza el cliente `pg` para la conexión a la base de datos
- **Manejo de Errores**: Implementa manejo de errores robusto en todas las operaciones

## 🤝 Contribuir

¡Las contribuciones siempre son bienvenidas! Para contribuir:

1. Hacer un fork del proyecto
2. Crear una rama para la funcionalidad (`git checkout -b feature/NuevaFuncion`)
3. Hacer commit de los cambios (`git commit -m 'Agregar NuevaFuncion'`)
4. Hacer push a la rama (`git push origin feature/NuevaFuncion`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.
