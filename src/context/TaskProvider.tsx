import { useState, useEffect, ReactNode } from 'react';
import { TaskContext } from './TaskContext';
import { Task, TaskStatus } from '../types/Task';

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>(
    JSON.parse(localStorage.getItem('tasks') || '[]'),
  );

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const filterTasks = (
    title: string,
    description: string,
    both: string,
    status: string,
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
        ? task.status === (status as TaskStatus)
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
