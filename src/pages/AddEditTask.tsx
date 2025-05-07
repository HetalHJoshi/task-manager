import React, { useEffect, useState } from "react";
import { useTaskContext } from "../hooks/useTaskContext";
import { useNavigate, useParams } from "react-router-dom";
import { Task, TaskStatus } from "../types/Task";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const taskSchema = z.object({
  title: z.string().min(3),
  desc: z.string().min(10),
  status: z.enum([TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE]),
});
type TaskFormData = z.infer<typeof taskSchema>;

const AddEditTask: React.FC = () => {
  const { tasks, setTasks } = useTaskContext();
  const [taskId, setTaskId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: { title: "", desc: "", status: TaskStatus.TODO },
  });

  useEffect(() => {
    if (id) {
      const task = tasks.find((task) => task.id === id);
      if (task) {
        setTaskId(task.id);
        setValue("title", task.title);
        setValue("desc", task.desc);
        setValue("status", task.status);
      }
    } else {
      setTaskId(null);
      reset({ title: "", desc: "", status: TaskStatus.TODO });
    }
  }, [id, tasks, reset]);

  const onSubmit = (data: TaskFormData) => {
    if (isEditMode && taskId) {
      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? { ...task, ...data } : task))
      );
    } else {
      const newTask: Task = { id: uuidv4(), ...data };
      setTasks((prev) => [...prev, newTask]);
    }

    navigate("/");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4 text-center">
            {isEditMode ? "Update Task" : "Add Task"}
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="row g-3"
            noValidate
          >
            <div className="col-12">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                {...register("title")}
              />
              {errors.title && (
                <span className="text-danger">{errors.title.message}</span>
              )}
            </div>

            <div className="col-12">
              <textarea
                className="form-control"
                placeholder="Description"
                rows={4}
                {...register("desc")}
              />
              {errors.desc && (
                <span className="text-danger">{errors.desc.message}</span>
              )}
            </div>

            <div className="col-12">
              <select className="form-select" {...register("status")}>
                <option value={TaskStatus.TODO}>To Do</option>
                <option value={TaskStatus.IN_PROGRESS} disabled={!isEditMode}>
                  In Progress
                </option>
                <option value={TaskStatus.DONE} disabled={!isEditMode}>
                  Done
                </option>
              </select>
            </div>

            <div className="col-6">
              <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
            </div>
            <div className="col-6">
              <button type="submit" className="btn btn-primary w-100">
                {isEditMode ? "Update Task" : "Add Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditTask;
