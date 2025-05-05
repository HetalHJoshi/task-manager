// src/components/AddEditTask.tsx

import { useState, useEffect } from 'react';
import { useTaskContext } from '../hooks/useTaskContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Task, TaskStatus } from '../types/Task';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const taskSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters long' }),
  desc: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long' }),
  status: z.enum([TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE], {
    errorMap: () => ({ message: 'Please select a valid status' }),
  }),
});

type TaskFormData = z.infer<typeof taskSchema>;

const AddEditTask = () => {
  const [taskId, setTaskId] = useState<string | null>(null);
  const { tasks, addTask, updateTask } = useTaskContext();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  useEffect(() => {
    if (id) {
      const task = tasks.find((task: Task) => task.id === id);
      if (task) {
        setTaskId(task.id);
        setValue('title', task.title);
        setValue('desc', task.desc);
        setValue('status', task.status);
      }
    }
  }, [id, tasks, setValue]);

  const onSubmit = (data: TaskFormData) => {
    const task: Task = {
      id: taskId || uuidv4(),
      ...data,
    };

    if (taskId) {
      updateTask(task);
    } else {
      addTask(task);
    }

    navigate('/');
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4 text-center">
            {taskId ? 'Edit Task' : 'Add Task'}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
            <div className="col-12">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                {...register('title')}
              />
              {errors.title && (
                <span className="text-danger">{errors.title.message}</span>
              )}
            </div>

            <div className="col-12">
              <textarea
                className="form-control"
                placeholder="Description"
                {...register('desc')}
                rows={4}
              />
              {errors.desc && (
                <span className="text-danger">{errors.desc.message}</span>
              )}
            </div>

            <div className="col-12">
              <select
                aria-label="Task Status"
                className="form-select"
                {...register('status')}
              >
                <option value={TaskStatus.TODO}>To Do</option>
                <option value={TaskStatus.IN_PROGRESS} disabled={!taskId}>
                  In Progress
                </option>
                <option value={TaskStatus.DONE} disabled={!taskId}>
                  Done
                </option>
              </select>
              {errors.status && (
                <span className="text-danger">{errors.status.message}</span>
              )}
            </div>

            <div className="col-12">
              <button className="btn btn-primary w-100" type="submit">
                {taskId ? 'Update Task' : 'Add Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditTask;
