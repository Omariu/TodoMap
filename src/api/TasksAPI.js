import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const TasksAPI = {
  getAllTasks: async (page = 1, limit = 10) => {
    try {
      const response = await api.get("/tasks", {
        params: {
          _page: page,
          _limit: limit,
        },
      });
      return {
        tasks: response.data,
        total: parseInt(response.headers["x-total-count"] || 0, 10),
        page,
        limit,
      };
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },

  getTaskCounts: async () => {
    try {
      const response = await api.get("/counts");
      return response.data;
    } catch (error) {
      console.error("Error fetching task counts:", error);
      throw error;
    }
  },

  addTask: async (task) => {
    try {
      const response = await api.post("/tasks", task);
      return response.data;
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  },

  updateTask: async (id, task) => {
    try {
      const response = await api.put(`/tasks/${id}`, task);
      return response.data;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  },

  markTaskCompleted: async (id) => {
    try {
      const response = await api.patch(`/tasks/${id}`, { completed: true });
      return response.data;
    } catch (error) {
      console.error("Error marking task as completed:", error);
      throw error;
    }
  },

  markTaskUnCompleted: async (id) => {
    try {
      const response = await api.patch(`/tasks/${id}`, { completed: false });
      return response.data;
    } catch (error) {
      console.error("Error marking task as completed:", error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      const response = await api.delete(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  },
};

export default TasksAPI;
