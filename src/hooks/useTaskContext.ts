import { useContext } from "react";
import { TaskContext, TaskContextType } from "../context/TaskContext";

export const useTaskContext = (): TaskContextType => {
  const ctx = useContext(TaskContext);
  if (!ctx) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return ctx;
};
