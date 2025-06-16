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

# Opciones disponibles:
--help    # Muestra la ayuda
--backup     # Ejecuta respaldo completo (predeterminado)
--sync    # Sincroniza procedimientos entre ambientes
--reset   # Limpia respaldos antiguos
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

### Respaldo Automático

- **Procedimientos**: Exporta todos los procedimientos de la base de datos, manteniendo la
  estructura y formato original
- **Vistas**: Realiza respaldo de todas las vistas, incluyendo sus definiciones y dependencias
- **Vistas Materializadas**: Exporta vistas materializadas con sus configuraciones de actualización
- **Organización Inteligente**: Estructura los respaldos por fecha y esquema para fácil localización
- **Nomenclatura Avanzada**: Nombres de archivos basados en tipos de argumentos para garantizar
  unicidad

### Formateo y Calidad

- **Formateo SQL**: Aplica formateo consistente a todos los archivos SQL
- **Validación de Sintaxis**: Verifica la sintaxis SQL durante el proceso de respaldo
- **Preservación de Comentarios**: Mantiene comentarios y documentación original

### Gestión de Ambientes

- **Sincronización**: Permite sincronizar procedimientos entre ambientes (ej: HML a PRD)
- **Reset Seguro**: Opción para limpiar respaldos antiguos manteniendo la organización
- **Multi-esquema**: Soporte para respaldo de múltiples esquemas simultáneamente

### Registros y Monitoreo

- **Registros Detallados**: Registra todas las operaciones con marcas de tiempo
- **Manejo de Errores**: Sistema robusto de manejo y reporte de errores
- **Estado en Tiempo Real**: Retroalimentación visual del progreso de las operaciones

### Internacionalización

- **Múltiples Idiomas**: Soporte completo para Español, Portugués e Inglés
- **Interfaz Adaptativa**: Mensajes y registros en el idioma configurado
- **Documentación Multilingüe**: READMEs disponibles en tres idiomas

### Seguridad

- **Credenciales Seguras**: Uso de variables de entorno para datos sensibles
- **Validación de Conexión**: Verificación de permisos antes de las operaciones
- **Respaldo Seguro**: Preserva permisos y propiedad de los objetos

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
cd procedure-backups-script
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
# Configuración de Base de Datos
DB_HOST=tu_host
DB_PORT=tu_puerto
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=tu_base_de_datos
DB_SCHEMA=tu_esquema  # Opcional – si se omite, exporta todos los esquemas no-sistema

# Configuración del Ambiente
LANGUAGE=es  # es, pt, en
```

## 🚀 Cómo Usar

### Instalación

1. Clone el repositorio:

```bash
git clone [REPOSITORY_URL]
cd procedure-backups-script
```

2. Instale las dependencias:

```bash
yarn install
# o
npm install
# o
pnpm install
```

3. Configure el archivo `.env` en la raíz del proyecto:

```env
# Configuración de Base de Datos
DB_HOST=tu_host
DB_PORT=tu_puerto
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=tu_base_de_datos
DB_SCHEMA=tu_esquema  # Opcional – si se omite, exporta todos los esquemas no-sistema

# Configuración del Ambiente
LANGUAGE=es  # es, pt, en
```

### Comandos Disponibles

#### Respaldo Completo

```bash
# Ejecuta respaldo de procedimientos, vistas y vistas materializadas
npm start
# o
yarn start
# o
pnpm start
```

#### Sincronización entre Ambientes

```bash
# Sincroniza procedimientos del ambiente HML a PRD
npm start -- --sync
# o
yarn start --sync
# o
pnpm start --sync
```

#### Limpieza de Respaldos

```bash
# Elimina respaldos antiguos manteniendo la organización
npm start -- --reset
# o
yarn start --reset
# o
pnpm start --reset
```

#### Ayuda

```bash
# Muestra todas las opciones disponibles
npm start -- --help
# o
yarn start --help
# o
pnpm start --help
```

### Estructura de Respaldos

Después de la ejecución, los archivos se organizarán de la siguiente manera:

```
backups/
└── nombre_base_datos/
    └── YYYY-MM-DD/
        ├── procedures/
        │   └── nombre_esquema/
        │       └── nombre_procedimiento_tipo_arg.sql
        ├── views/
        │   └── nombre_esquema/
        │       └── nombre_vista.sql
        ├── materialized-views/
        │   └── nombre_esquema/
        │       └── nombre_vista_materializada.sql
        └── export.log
```

### Registros y Monitoreo

- Los registros se guardan en `backups/[nombre_base_datos]/[fecha]/export.log`
- Cada operación se registra con marca de tiempo
- Los errores se destacan con ❌
- Las operaciones exitosas se marcan con ✅

### Consejos de Uso

1. **Respaldo Regular**: Ejecute el respaldo diariamente para mantener un historial actualizado
2. **Esquemas Específicos**: Use `DB_SCHEMA` para exportar solo esquemas específicos
3. **Idioma**: Configure `LANGUAGE` para recibir mensajes en su idioma preferido
4. **Sincronización**: Use `--sync` para mantener diferentes ambientes sincronizados
5. **Limpieza**: Ejecute `--reset` periódicamente para evitar acumulación de respaldos antiguos

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
- **Nombres de Procedimientos**: Los archivos de procedimientos se nombran usando el nombre del
  procedimiento y los tipos de argumentos para garantizar unicidad

## 🤝 Contribuir

¡Las contribuciones siempre son bienvenidas! Para contribuir:

1. Hacer un fork del proyecto
2. Crear una rama para la funcionalidad (`git checkout -b feature/NuevaFuncion`)
3. Hacer commit de los cambios (`git commit -m 'Agregar NuevaFuncion'`)
4. Hacer push a la rama (`git push origin feature/NuevaFuncion`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.
