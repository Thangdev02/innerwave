import api from './api';

const journeyTaskService = {
  // Lấy tất cả tasks của user (có thể filter theo date)
  getUserTasks: async (date = null) => {
    try {
      const params = date ? { date: date.toISOString() } : {};
      const response = await api.get('/JourneyTasks', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error.response?.data || error.message;
    }
  },

  // Lấy task theo ID
  getTaskById: async (id) => {
    try {
      const response = await api.get(`/JourneyTasks/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching task:', error);
      throw error.response?.data || error.message;
    }
  },

  // Tạo task mới
  createTask: async (taskData) => {
    try {
      const response = await api.post('/JourneyTasks', {
        date: taskData.date,
        title: taskData.title,
        description: taskData.description || null,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error.response?.data || error.message;
    }
  },

  // Cập nhật task
  updateTask: async (id, taskData) => {
    try {
      const response = await api.put(`/JourneyTasks/${id}`, {
        title: taskData.title,
        description: taskData.description,
        isCompleted: taskData.isCompleted,
      });
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error.response?.data || error.message;
    }
  },

  // Xóa task
  deleteTask: async (id) => {
    try {
      const response = await api.delete(`/JourneyTasks/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error.response?.data || error.message;
    }
  },

  // Toggle trạng thái completed của task
  toggleTaskCompletion: async (id) => {
    try {
      const response = await api.post(`/JourneyTasks/${id}/toggle`);
      return response.data;
    } catch (error) {
      console.error('Error toggling task:', error);
      throw error.response?.data || error.message;
    }
  },
};

export default journeyTaskService;