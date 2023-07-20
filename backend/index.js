const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Создаем таблицу tasks, если она не существует
db.query(
  `CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    due_date DATE
  )`
)
  .then(() => {
    console.log('Table "tasks" created successfully.');
  })
  .catch((error) => {
    console.error('Error creating table "tasks":', error);
  });

app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await db.query('SELECT * FROM tasks ORDER BY due_date ASC');
    res.json(tasks.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving tasks' });
  }
});

app.post('/api/tasks', async (req, res) => {
  const { title, description, due_date } = req.body;
  try {
    const newTask = await db.query(
      'INSERT INTO tasks (title, description, due_date) VALUES ($1, $2, $3) RETURNING *',
      [title, description, due_date]
    );
    res.status(201).json(newTask.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error creating task' });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, due_date } = req.body;
  try {
    const updatedTask = await db.query(
      'UPDATE tasks SET title = $1, description = $2, due_date = $3 WHERE id = $4 RETURNING *',
      [title, description, due_date, id]
    );
    if (updatedTask.rows.length === 0) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.json(updatedTask.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating task' });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await db.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    if (deletedTask.rows.length === 0) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.json(deletedTask.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
