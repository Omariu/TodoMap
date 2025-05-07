// components/TaskItem.jsx
import React from "react";
import { ListItem, ListItemText, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskItem = ({ task, onComplete, onUncomplete, onDelete, onClick }) => {
  return (
    <ListItem
      key={task.id}
      component="nav"
      onClick={onClick}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => onDelete(task.id)}
        >
          <DeleteIcon color="error" />
        </IconButton>
      }
    >
      <Checkbox
        checked={task.completed}
        onChange={() => {
          if (!task.completed) onComplete(task.id);
          else onUncomplete(task.id);
        }}
      />
      <ListItemText
        primary={task.text}
        secondary={new Date(task.createdAt).toLocaleString()}
      />
    </ListItem>
  );
};

export default TaskItem;
