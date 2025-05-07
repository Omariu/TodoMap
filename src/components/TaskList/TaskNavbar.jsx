// components/jsx
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Badge,
  Chip,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { useTasks } from "./Hooks/useTasks";
import { useMapTasks } from "./Hooks/useMapTasks";
import AddTaskDialog from "./AddTaskDialog";
import { useTasksState } from "../../context/TasksContext";
import ThemeToggle from "../UI/ThemeToggle";
import LanguageToggle from "../UI/LanguageToggle";
import { useTranslation } from "react-i18next";

const TaskNavbar = ({ view }) => {
  const { t } = useTranslation();

  const limit = 10;
  const page = 1;

  const { fetchTasks, addTask } = useTasks(page, limit);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { tasks } = useTasksState();

  const {
    graphic,
    selectedLocation,
    addingMode,
    cancelAddTaskProcess,
    setSelectedLocation,
    setGraphic,
    startAddTaskProcess,
  } = useMapTasks(view);

  // Calculate counts
  const completedCount = tasks.filter((todo) => todo.completed).length;
  const unCompletedCount = tasks.filter((todo) => !todo.completed).length;
  const deletedCount = tasks.filter((todo) => todo.deleted).length;

  useEffect(() => {
    setDialogOpen(!!selectedLocation);
  }, [selectedLocation]);

  const handleAddTask = async (text) => {
    try {
      const newTask = {
        text,
        completed: false,
        deleted: false,
        createdAt: new Date().toISOString(),
        coordinates: selectedLocation,
      };
      await addTask(newTask);

      // Clean up temporary marker
      if (graphic) {
        view.graphics.remove(graphic);
        setGraphic(null);
      }
      setSelectedLocation(null);
      setDialogOpen(false);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  return (
    <>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {t("appName")}
          </Typography>

          {/* Counters */}
          <Box sx={{ display: "flex", gap: 1, mr: 2 }}>
            <Chip
              label={t("activeCount", { count: unCompletedCount })}
              color="primary"
              variant="outlined"
              size="small"
            />
            <Chip
              label={t("completedCount", { count: completedCount })}
              color="success"
              variant="outlined"
              size="small"
            />
            <Chip
              label={t("deletedCount", { count: deletedCount })}
              color="error"
              variant="outlined"
              size="small"
            />
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <ThemeToggle />
            <LanguageToggle />
            <IconButton
              color="inherit"
              onClick={() => {
                fetchTasks();
              }}
              aria-label={t("refreshAriaLabel")}
            >
              <Badge color="info">
                <RefreshIcon />
              </Badge>
            </IconButton>

            {addingMode ? (
              <Button
                variant="outlined"
                color="error"
                startIcon={<AddTaskIcon />}
                onClick={() => cancelAddTaskProcess()}
              >
                {t("cancelButton")}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddTaskIcon />}
                onClick={startAddTaskProcess}
              >
                {t("addButton")}
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <AddTaskDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          cancelAddTaskProcess();
        }}
        onAddTask={handleAddTask}
        location={selectedLocation}
      />
    </>
  );
};

export default TaskNavbar;
