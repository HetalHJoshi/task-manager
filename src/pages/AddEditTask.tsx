import React, { useState, useEffect } from "react";
import { useTaskContext } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import { Task, TaskStatus } from "../types/Task"; // ✅ Import TaskStatus enum
import { v4 as uuidv4 } from "uuid";

const AddEditTask = () => {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.TODO); // Use TaskStatus enum
  const [taskId, setTaskId] = useState<string | null>(null);
  const { tasks, addTask, updateTask } = useTaskContext();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      const task = tasks.find((task: Task) => task.id === id);
      if (task) {
        setTitle(task.title);
        setDesc(task.desc);
        setStatus(task.status);
        setTaskId(task.id);
      }
    }
  }, [id, tasks]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !desc) {
      alert("Both title and description are required!");
      return;
    }

    const task: Task = {
      id: taskId || uuidv4(),
      title,
      desc,
      status,
    };

    if (taskId) {
      updateTask(task);
    } else {
      addTask(task);
    }

    navigate("/");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4 text-center">
            {taskId ? "Edit Task" : "Add Task"}
          </h2>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-12">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="col-12">
              <textarea
                className="form-control"
                placeholder="Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={4}
              />
            </div>

            <div className="col-12">
              <select
                aria-label="Task Status"
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
              >
                <option value={TaskStatus.TODO}>To Do</option>
                {/* Disable "In Progress" and "Done" if adding a new task */}
                <option
                  value={TaskStatus.IN_PROGRESS}
                  disabled={!taskId} // Disable if adding a new task
                >
                  In Progress
                </option>
                <option
                  value={TaskStatus.DONE}
                  disabled={!taskId} // Disable if adding a new task
                >
                  Done
                </option>
              </select>
            </div>

            <div className="col-12">
              <button className="btn btn-primary w-100" type="submit">
                {taskId ? "Update Task" : "Add Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditTask;
