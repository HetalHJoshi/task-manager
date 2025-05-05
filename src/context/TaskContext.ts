import { createContext } from "react";
import { Task } from "../types/Task";

export interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  filterTasks: (
    title: string,
    description: string,
    both: string,
    status: string
  ) => Task[];
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);
