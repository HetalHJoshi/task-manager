import React from "react";
import {
  BrowserRouter as BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import Navbar from "./components/Navbar";
import AddEditTask from "./pages/AddEditTask";
import TaskList from "./pages/TaskList";

const App = () => {
  return (
    <TaskProvider>
      <BrowserRouter>
        <Navbar />
        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/add-task" element={<AddEditTask />} />
            <Route path="/edit-task/:id" element={<AddEditTask />} />
          </Routes>
        </main>
      </BrowserRouter>
    </TaskProvider>
  );
};

export default App;
