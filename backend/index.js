const express = require('express');
const cors = require('cors');
const db = require('./db'); // Файл для подключения к базе данных

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Здесь определяем обработчики запросов, например:
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await db.query('SELECT * FROM tasks');
    res.json(tasks.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving tasks' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
