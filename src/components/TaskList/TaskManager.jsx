import React from "react";
import TaskList from "./TaskList";
import { Box, Paper } from "@mui/material";
import { useMapTasks } from "./Hooks/useMapTasks";
import { useTasks } from "./Hooks/useTasks";
import { useTaskGraphics } from "./Hooks/useTaskGraphics";
import { useTasksState } from "../../context/TasksContext";
import { useTranslation } from "react-i18next";

const TaskManager = ({ view }) => {
  const limit = 20;
  const page = 1;
  const { tasks } = useTasksState();
  const { t } = useTranslation();

  // Custom hooks
  const {
    loading,
    handleCompleteTask,
    handleUnCompleteTask,
    handleDeleteTask,
  } = useTasks(page, limit);

  const { addingMode } = useMapTasks(view);

  useTaskGraphics(view, tasks);

  const handleClick = (task) => {
    view.goTo({
      center: task.coordinates,
      zoom: 12,
    });
  };
  return (
    <Box>
      {addingMode && (
        <Box sx={{ mb: 2, fontStyle: "italic" }}>{t("locateInfo")}</Box>
      )}
      <TaskList
        tasks={tasks}
        loading={loading}
        onComplete={handleCompleteTask}
        onUncomplete={handleUnCompleteTask}
        onDelete={handleDeleteTask}
        onClick={handleClick}
      />
    </Box>
  );
};

export default TaskManager;
