import React from 'react';

const TaskLegend: React.FC = () => (
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
);

export default TaskLegend;
