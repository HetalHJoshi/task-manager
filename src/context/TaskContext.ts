import { createContext } from "react";
import { Task } from "../types/Task";

export interface TaskContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);
