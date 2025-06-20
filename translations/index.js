const dotenv = require('dotenv');
dotenv.config();

const getTranslation = (key) => {
  const LANGUAGE = process.env.LANGUAGE || 'en';
  return translations[LANGUAGE]?.[key] || translations['en'][key];
};

const translations = {
  en: {
    starting_backup: 'Starting backup...',
    connected_to_db: 'Connected to database:',
    exporting_schema: 'Exporting schema:',
    procedures: 'Exporting Procedures',
    views: 'Exporting Views',
    materialized_views: 'Exporting Materialized Views',
    sql_format: 'Formatting SQL',
    finished: 'Finished',
    no_procedures_found: 'No procedures found in schema:',
    procedure_saved: 'Procedure saved:',
    no_views_found: 'No views found in schema:',
    view_saved: 'View saved:',
    no_materialized_views_found: 'No materialized views found in schema:',
    materialized_view_saved: 'Materialized view saved:',
    backup_completed: 'Backup completed successfully!',
    error_exporting: 'Error exporting:',
    formatting_sql: 'Formatting SQL files',
    formatted_file: 'Formatted:',
    error_formatting: 'Error formatting:',
    formatting_completed: 'Formatting completed.',
    previous_log_cleared: 'Previous log cleared:',
    error_clearing_log: 'Error clearing log:',
    procedures_start: 'Exporting Procedures',
    views_start: 'Exporting Views',
    materialized_views_start: 'Exporting Materialized Views',
    sql_format_start: 'Formatting SQL',
    finished: 'Finished',
    reset_start: 'Resetting backups...',
    reset_finished: 'Backups reset successfully!',
    sync_start: 'Syncing procedures...',
    sync_finished: 'Procedures synced successfully!',
    reset_procedure_finished: 'Procedures reseted and restored successfully!',
    reset_procedure_dropped: 'All procedures were removed.',
    reset_procedure_connected: 'Connected to database:',
    reset_procedure_applying: 'Applying procedures from schema:',
    reset_procedure_applied: 'Procedure applied:',
    sync_error: 'Error during synchronization:',
    sync_finished: 'HML → PRD synchronization completed successfully!',
    sync_procedure_applied: 'Procedure applied in PRD:',
    sync_procedure_exported: 'HML export completed.',
    sync_procedure_dropped: 'Procedures removed from production database.',
    help: 'Usage: node index.js [options]\n\nOptions:\n--backup       Run complete backup\n--reset     Reset all backups\n--sync      Sync procedures from HML to PRD\n--help      Show this help message\n--apply     Apply procedures to database',
  },
  pt: {
    starting_backup: 'Iniciando backup...',
    connected_to_db: 'Conectado ao banco:',
    exporting_schema: 'Exportando schema:',
    no_procedures_found: 'Nenhuma procedure encontrada no schema:',
    procedure_saved: 'Procedure salva:',
    no_views_found: 'Nenhuma view encontrada no schema:',
    view_saved: 'View salva:',
    no_materialized_views_found: 'Nenhuma view materializada encontrada no schema:',
    materialized_view_saved: 'View materializada salva:',
    backup_completed: 'Backup concluído com sucesso!',
    error_exporting: 'Erro ao exportar:',
    formatting_sql: 'Formatando arquivos SQL',
    formatted_file: 'Formatado:',
    error_formatting: 'Erro ao formatar:',
    formatting_completed: 'Formatação concluída.',
    previous_log_cleared: 'Log anterior apagado:',
    error_clearing_log: 'Erro ao tentar limpar o log:',
    procedures_start: 'Exportando Procedures',
    views_start: 'Exportando Views',
    materialized_views_start: 'Exportando Views Materializadas',
    sql_format_start: 'Formatando SQL',
    finished: 'Finalizado',
    reset_start: 'Resetando backups...',
    reset_finished: 'Backups resetados com sucesso!',
    sync_start: 'Sincronizando procedures...',
    sync_finished: 'Procedures sincronizadas com sucesso!',
    reset_procedure_finished: 'Procedures resetadas e restauradas com sucesso!',
    reset_procedure_dropped: 'Todas as procedures foram removidas.',
    reset_procedure_connected: 'Conectado ao banco:',
    reset_procedure_applying: 'Aplicando procedures do schema:',
    reset_procedure_applied: 'Procedure aplicada:',
    sync_error: 'Error durante sincronización:',
    sync_finished: 'Sincronización HML → PRD concluida con éxito!',
    sync_procedure_applied: 'Procedure aplicada em PRD:',
    sync_procedure_exported: 'Exportação do HML finalizada.',
    sync_procedure_dropped: 'Procedures removidas do banco de produção.',
    help: 'Uso: node index.js [opções]\n\nOpções:\n--backup       Executar backup completo\n--reset     Resetar todos os backups\n--sync      Sincronizar procedures do HML para PRD\n--help      Mostrar esta ajuda\n--apply     Aplicar procedures a base de dados',
  },
  es: {
    starting_backup: 'Iniciando respaldo...',
    connected_to_db: 'Conectado a la base de datos:',
    exporting_schema: 'Exportando esquema:',
    no_procedures_found: 'No se encontraron procedimientos en el esquema:',
    procedure_saved: 'Procedimiento guardado:',
    no_views_found: 'No se encontraron vistas en el esquema:',
    view_saved: 'Vista guardada:',
    no_materialized_views_found: 'No se encontraron vistas materializadas en el esquema:',
    materialized_view_saved: 'Vista materializada guardada:',
    backup_completed: '¡Respaldo completado con éxito!',
    error_exporting: 'Error al exportar:',
    formatting_sql: 'Formateando archivos SQL',
    formatted_file: 'Formateado:',
    error_formatting: 'Error al formatear:',
    formatting_completed: 'Formateo completado.',
    previous_log_cleared: 'Registro anterior borrado:',
    error_clearing_log: 'Error al intentar borrar el registro:',
    procedures_start: 'Exportando Procedimientos',
    views_start: 'Exportando Vistas',
    materialized_views_start: 'Exportando Vistas Materializadas',
    sql_format_start: 'Formateando SQL',
    finished: 'Finalizado',
    reset_start: 'Reseteando backups...',
    reset_finished: 'Backups resetados con éxito!',
    sync_start: 'Sincronizando procedures...',
    sync_finished: 'Procedures sincronizadas con éxito!',
    reset_procedure_finished: 'Procedures resetadas y restauradas con éxito!',
    reset_procedure_dropped: 'Todas las procedures fueron removidas.',
    reset_procedure_connected: 'Conectado a la base de datos:',
    reset_procedure_applying: 'Aplicando procedures del schema:',
    reset_procedure_applied: 'Procedure aplicada:',
    sync_error: 'Error durante sincronización:',
    sync_finished: 'Sincronización HML → PRD concluida con éxito!',
    sync_procedure_applied: 'Procedure aplicada en PRD:',
    sync_procedure_exported: 'Exportación del HML finalizada.',
    sync_procedure_dropped: 'Procedures removidas del banco de producción.',
    help: 'Uso: node index.js [opciones]\n\nOpciones:\n--backup       Ejecutar backup completo\n--reset     Reiniciar todos los backups\n--sync      Sincronizar procedures del HML para PRD\n--help      Mostrar esta ayuda\n--apply     Aplicar procedures a la base de datos',
  },
};

module.exports = {
  translations,
  getTranslation,
};
