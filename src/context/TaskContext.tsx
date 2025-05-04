import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { Task, TaskStatus } from "../types/Task"; // Import Task and TaskStatus types

interface TaskContextType {
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

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );

  // Sync tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks); // No need to update localStorage here
  };

  const updateTask = (updatedTask: Task) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks); // No need to update localStorage here
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks); // No need to update localStorage here
  };

  const filterTasks = (
    title: string,
    description: string,
    both: string,
    status: string
  ) => {
    return tasks.filter((task) => {
      const titleMatch = title
        ? task.title.toLowerCase().includes(title.toLowerCase())
        : true;

      const descMatch = description
        ? task.desc.toLowerCase().includes(description.toLowerCase())
        : true;

      const bothMatch = both
        ? task.title.toLowerCase().includes(both.toLowerCase()) ||
          task.desc.toLowerCase().includes(both.toLowerCase())
        : true;

      const statusMatch = status
        ? task.status === (status as TaskStatus) // ✅ safely cast to TaskStatus
        : true;

      return titleMatch && descMatch && bothMatch && statusMatch;
    });
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask, filterTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useTaskContext must be used within a TaskProvider");
  return context;
};
