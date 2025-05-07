import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const AddTaskDialog = ({ open, onClose, onAddTask }) => {
  const { t } = useTranslation();
  const [taskText, setTaskText] = useState("");

  const handleSubmit = () => {
    if (taskText.trim()) {
      onAddTask(taskText);
      setTaskText("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t("addTaskDialog.title")}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label={t("addTaskDialog.descriptionLabel")}
          fullWidth
          variant="standard"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          style={{ marginBottom: "16px", width: 400 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("addTaskDialog.cancelButton")}</Button>
        <Button onClick={handleSubmit}>{t("addTaskDialog.addButton")}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskDialog;
