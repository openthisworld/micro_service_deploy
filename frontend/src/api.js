import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'; // Обновляем baseURL

const api = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});

// Остальной код для обращения к API
export const fetchTasks = async () => {
  try {
    const response = await api.get('/api/tasks');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createTask = async (task) => {
  try {
    const response = await api.post('/api/tasks', task);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Другие методы API
