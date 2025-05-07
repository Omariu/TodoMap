import React, { useReducer } from "react";
import PropTypes from "prop-types";
import { createContext, useContextSelector } from "use-context-selector";

const TasksContext = createContext(null);

const TasksActions = {
  SET_TASKS: "SET_TASKS", // Fixed typo (was SET_CURRET_TIME)
};

const initialState = {
  tasks: [],
};

const tasksReducer = (state, action) => {
  switch (action.type) {
    case TasksActions.SET_TASKS:
      return {
        ...state,
        tasks: action.payload, // Changed from action.tasks to action.payload for consistency
      };
    default:
      return state;
  }
};

const TasksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  // Memoize context value if needed for performance
  const contextValue = React.useMemo(() => [state, dispatch], [state]);

  return (
    <TasksContext.Provider value={contextValue}>
      {children}
    </TasksContext.Provider>
  );
};

TasksContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook to get dispatch function
const useTasksDispatch = () => {
  return useContextSelector(TasksContext, (v) => v[1]);
};

// Hook to get state
const useTasksState = () => {
  return useContextSelector(TasksContext, (v) => v[0]);
};

// Hook to get specific state property
const useTasks = () => {
  return useContextSelector(TasksContext, (v) => v[0].tasks);
};

export {
  useTasksDispatch,
  useTasksState,
  useTasks,
  TasksContextProvider,
  TasksActions,
};
