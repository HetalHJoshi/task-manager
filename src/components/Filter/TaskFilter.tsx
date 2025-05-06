// src/components/Filter/TaskFilter.tsx
import React, { ChangeEvent } from "react";
import { TaskStatus } from "../../types/Task";

export type FilterKey = "title" | "desc" | "both" | "status";

export interface TaskFilterProps {
  filters: Record<FilterKey, string>;
  handleFilterChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    filterType: FilterKey
  ) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({
  filters,
  handleFilterChange,
}) => {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="row g-2">
          <div className="col-md-3 col-sm-6">
            <input
              type="text"
              className="form-control"
              placeholder="Filter by title"
              value={filters.title}
              onChange={(e) => handleFilterChange(e, "title")}
            />
          </div>
          <div className="col-md-3 col-sm-6">
            <input
              type="text"
              className="form-control"
              placeholder="Filter by description"
              value={filters.desc}
              onChange={(e) => handleFilterChange(e, "desc")}
            />
          </div>
          <div className="col-md-3 col-sm-6">
            <input
              type="text"
              className="form-control"
              placeholder="Filter by title or description"
              value={filters.both}
              onChange={(e) => handleFilterChange(e, "both")}
            />
          </div>
          <div className="col-md-3 col-sm-6">
            <select
              className="form-select"
              value={filters.status}
              onChange={(e) => handleFilterChange(e, "status")}
            >
              <option value="">All Status</option>
              <option value={TaskStatus.TODO}>To Do</option>
              <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
              <option value={TaskStatus.DONE}>Done</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskFilter;
