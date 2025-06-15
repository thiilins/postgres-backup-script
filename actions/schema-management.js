async function getAllSchemas(client) {
  const excluded = ['pg_catalog', 'information_schema'];
  const query = `
    SELECT schema_name
    FROM information_schema.schemata
    WHERE schema_name NOT IN (${excluded.map((_, i) => `$${i + 1}`).join(', ')})
      AND schema_name NOT LIKE 'pg\\_temp\\_%'
      AND schema_name NOT LIKE 'pg\\_toast%'
    ORDER BY schema_name;
  `;
  const res = await client.query(query, excluded);
  return res.rows.map((row) => row.schema_name);
}

module.exports = {
  getAllSchemas,
};
