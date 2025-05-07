// components/TaskList.jsx
import React from "react";
import { List } from "@mui/material";
import TaskItem from "./TaskItem";
import { useTranslation } from "react-i18next";

const TaskList = ({
  tasks,
  loading,
  onComplete,
  onUncomplete,
  onClick,
  onDelete,
}) => {
  const { t } = useTranslation();

  if (loading) {
    return <div>{t("loading")}</div>;
  }

  if (!tasks || tasks.length === 0) return <div>No tasks available</div>;

  return (
    <List>
      {tasks
        .filter((task) => !task.deleted)
        .map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onComplete={onComplete}
            onUncomplete={onUncomplete}
            onDelete={onDelete}
            onClick={() => onClick(task)}
          />
        ))}
    </List>
  );
};

export default TaskList;
