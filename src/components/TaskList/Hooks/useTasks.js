// hooks/useTasks.js
import { useState, useEffect } from "react";
import TasksAPI from "../../../api/TasksAPI";
import { TasksActions, useTasksDispatch } from "../../../context/TasksContext";

export const useTasks = (page, limit) => {
  const dispatch = useTasksDispatch();

  const [counts, setCounts] = useState({
    uncompleted: 0,
    completed: 0,
    deleted: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await TasksAPI.getAllTasks(page, limit);
      dispatch({
        type: TasksActions.SET_TASKS,
        payload: data.tasks,
      });
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCounts = async () => {
    try {
      const data = await TasksAPI.getTaskCounts();
      setCounts(data);
    } catch (error) {
      console.error("Failed to fetch counts:", error);
    }
  };

  const addTask = async (taskData) => {
    try {
      await TasksAPI.addTask(taskData);
      await Promise.all([fetchTasks(), fetchCounts()]);
    } catch (error) {
      console.error("Failed to add task:", error);
      throw error;
    }
  };

  const handleCompleteTask = async (id) => {
    try {
      await TasksAPI.markTaskCompleted(id);
      await Promise.all([fetchTasks(), fetchCounts()]);
    } catch (error) {
      console.error("Failed to complete task:", error);
      throw error;
    }
  };

  const handleUnCompleteTask = async (id) => {
    try {
      await TasksAPI.markTaskUnCompleted(id);
      await Promise.all([fetchTasks(), fetchCounts()]);
    } catch (error) {
      console.error("Failed to uncomplete task:", error);
      throw error;
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await TasksAPI.deleteTask(id);
      await Promise.all([fetchTasks(), fetchCounts()]);
    } catch (error) {
      console.error("Failed to delete task:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchCounts();
  }, [page]);

  return {
    counts,
    loading,
    fetchTasks,
    fetchCounts,
    addTask,
    handleCompleteTask,
    handleUnCompleteTask,
    handleDeleteTask,
  };
};
