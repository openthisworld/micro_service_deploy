import React, { useState, useEffect } from 'react';
import { fetchTasks, createTask } from './api'; // Обновленный импорт

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasks = await fetchTasks();
        setTasks(tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddTask = async () => {
    try {
      const newTask = { text: newTaskText, completed: false };
      const createdTask = await createTask(newTask);
      setTasks([...tasks, createdTask]);
      setNewTaskText('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  // Остальной код компонента
};

export default App;
