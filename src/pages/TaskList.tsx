import React, { useState, useMemo } from "react";
import { useTaskContext } from "../context/TaskContext";
import { Task } from "../types/Task";
import { Link } from "react-router-dom";

const TaskList = () => {
  const { deleteTask, filterTasks } = useTaskContext();

  const [filters, setFilters] = useState({
    title: "",
    desc: "",
    both: "",
    status: "",
  });

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    filterType: string
  ) => {
    setFilters((prev) => ({ ...prev, [filterType]: e.target.value }));
  };

  const getFilterMessage = () => {
    const filtersApplied = [];

    if (filters.title) filtersApplied.push(`Title: ${filters.title}`);
    if (filters.desc) filtersApplied.push(`Description: ${filters.desc}`);
    if (filters.both) filtersApplied.push(`Title/Description: ${filters.both}`);
    if (filters.status) filtersApplied.push(`Status: ${filters.status}`);

    return filtersApplied.length
      ? `No tasks found based on ${filtersApplied.join(" & ")}`
      : "";
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "todo":
        return "bg-danger bg-opacity-25 border border-danger";
      case "inprogress":
        return "bg-warning bg-opacity-25 border border-warning";
      case "done":
        return "bg-success bg-opacity-25 border border-success";
      default:
        return "";
    }
  };

  // Memoizing filtered tasks to avoid unnecessary re-renders
  const filteredTasks: Task[] = useMemo(() => {
    return filterTasks(
      filters.title,
      filters.desc,
      filters.both,
      filters.status
    );
  }, [filters, filterTasks]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Task List</h2>

      {/* Legend */}
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

      {/* Filter Section */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Filter Tasks</h5>
          <div className="row mb-4">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Filter by Title"
                value={filters.title}
                onChange={(e) => handleFilterChange(e, "title")}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Filter by Description"
                value={filters.desc}
                onChange={(e) => handleFilterChange(e, "desc")}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Filter by Title / Description"
                value={filters.both}
                onChange={(e) => handleFilterChange(e, "both")}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={filters.status}
                onChange={(e) => handleFilterChange(e, "status")}
              >
                <option value="">All Status</option>
                <option value="todo">To Do</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <div className="alert alert-info" role="alert">
          {getFilterMessage() || "No tasks found."}
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="row">
              {filteredTasks.map((task: Task) => (
                <div className="col-md-4 col-sm-6 mb-3" key={task.id}>
                  <div
                    className={`card shadow-sm ${getStatusClass(task.status)}`}
                  >
                    <div className="card-body">
                      <h5 className="card-title">{task.title}</h5>
                      <p className="card-text">{task.desc}</p>

                      {/* Status badge shown after description */}
                      <div
                        className={`badge ${
                          task.status === "todo"
                            ? "bg-danger bg-opacity-50"
                            : task.status === "inprogress"
                            ? "bg-warning bg-opacity-50"
                            : "bg-success bg-opacity-50"
                        }`}
                      >
                        {task.status.charAt(0).toUpperCase() +
                          task.status.slice(1)}
                      </div>

                      <div className="d-flex justify-content-between mt-3">
                        <Link
                          to={`/edit-task/${task.id}`}
                          className="btn btn-warning btn-sm"
                          aria-label={`Edit task ${task.title}`}
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteTask(task.id)}
                          aria-label={`Delete task ${task.title}`}
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
