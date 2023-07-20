const { Pool } = require('pg');

const pool = new Pool({
  user: 'your-db-user',
  host: 'your-db-host',
  database: 'your-db-name',
  password: 'your-db-password',
  port: 5432 // порт базы данных PostgreSQL по умолчанию
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
