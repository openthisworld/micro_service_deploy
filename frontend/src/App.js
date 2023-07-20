import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async () => {
    try {
      await axios.post('/api/tasks', { title, description, due_date: dueDate });
      fetchTasks();
      setTitle('');
      setDescription('');
      setDueDate('');
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (id) => {
    try {
      const taskToUpdate = tasks.find((task) => task.id === id);
      if (!taskToUpdate) return;

      await axios.put(`/api/tasks/${id}`, {
        title: taskToUpdate.title,
        description: taskToUpdate.description,
        due_date: taskToUpdate.due_date,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>ToDo Manager</h1>
      <div>
        <h3>Create New Task</h3>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <button onClick={createTask}>Create</button>
      </div>
      <div>
        <h3>Task List</h3>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.title} - {task.description} (Due: {new Date(task.due_date).toLocaleDateString()})
              <button onClick={() => updateTask(task.id)}>Done</button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
