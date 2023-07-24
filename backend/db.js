const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://openthisworld:p@ssw0rd@postgres:5432/main', // Обновленный URL подключения
  ssl: false, // Отключаем SSL
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
