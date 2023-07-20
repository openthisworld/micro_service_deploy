import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('/api/tasks') // Обращение к нашему REST API
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Tasks List</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
