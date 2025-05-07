import React, { useState, useMemo, ChangeEvent } from "react";
import { useTaskContext } from "./TaskProvider";
import { Task, TaskStatus } from "../../types/Task/types";
import { Link } from "react-router-dom";
import TaskFilter, { FilterKey } from "../../components/Task/TaskFilter";

const TaskList: React.FC = () => {
  const { tasks, setTasks } = useTaskContext();

  const [filters, setFilters] = useState<Record<FilterKey, string>>({
    title: "",
    desc: "",
    both: "",
    status: "",
  });

  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: FilterKey
  ) => {
    setFilters((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const titleMatch = filters.title
        ? task.title.toLowerCase().includes(filters.title.toLowerCase())
        : true;
      const descMatch = filters.desc
        ? task.desc.toLowerCase().includes(filters.desc.toLowerCase())
        : true;
      const bothMatch = filters.both
        ? task.title.toLowerCase().includes(filters.both.toLowerCase()) ||
          task.desc.toLowerCase().includes(filters.both.toLowerCase())
        : true;
      const statusMatch = filters.status
        ? task.status === (filters.status as TaskStatus)
        : true;
      return titleMatch && descMatch && bothMatch && statusMatch;
    });
  }, [tasks, filters]);

  const getStatusClass = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.TODO:
        return "bg-danger bg-opacity-25 border border-danger";
      case TaskStatus.IN_PROGRESS:
        return "bg-warning bg-opacity-25 border border-warning";
      case TaskStatus.DONE:
        return "bg-success bg-opacity-25 border border-success";
      default:
        return "";
    }
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const handleStatusChange = (task: Task, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t))
    );
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Task List</h2>

      {/* Embedded TaskLegend */}
      <div className="card p-3 mb-4 shadow-lg">
        <h5 className="mb-3">Legend</h5>
        <div className="d-flex align-items-center gap-4">
          <div className="d-flex align-items-center">
            <span className="badge bg-danger bg-opacity-25 border border-danger me-2">
              &nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            To Do
          </div>
          <div className="d-flex align-items-center">
            <span className="badge bg-warning bg-opacity-25 border border-warning text-dark me-2">
              &nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            In Progress
          </div>
          <div className="d-flex align-items-center">
            <span className="badge bg-success bg-opacity-25 border border-success me-2">
              &nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            Done
          </div>
        </div>
      </div>

      <TaskFilter filters={filters} handleFilterChange={handleFilterChange} />

      {filteredTasks.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          No tasks found.
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="row">
              {filteredTasks.map((task) => (
                <div className="col-md-4 col-sm-6 mb-3" key={task.id}>
                  <div
                    className={`card shadow-sm ${getStatusClass(task.status)}`}
                  >
                    <div className="card-body">
                      <h5 className="card-title">{task.title}</h5>
                      <p className="card-text">{task.desc}</p>

                      <div className="mb-2">
                        <select
                          className="form-select form-select-sm"
                          value={task.status}
                          onChange={(e) =>
                            handleStatusChange(
                              task,
                              e.target.value as TaskStatus
                            )
                          }
                          aria-label="Change Task Status"
                        >
                          <option value={TaskStatus.TODO}>To Do</option>
                          <option value={TaskStatus.IN_PROGRESS}>
                            In Progress
                          </option>
                          <option value={TaskStatus.DONE}>Done</option>
                        </select>
                      </div>

                      <div className="d-flex justify-content-between mt-3">
                        <Link
                          to={`/edit-task/${task.id}`}
                          className="btn btn-warning btn-sm"
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(task.id, task.title)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
