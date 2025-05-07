import {
  BrowserRouter as BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { TaskProvider } from "./context/TaskProvider";
import Navbar from "./components/Navbar/Navbar";
import AddEditTask from "./pages/AddEditTask";
import TaskList from "./pages/TaskList";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <TaskProvider>
        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/add-task" element={<AddEditTask />} />
            <Route path="/edit-task/:id" element={<AddEditTask />} />
          </Routes>
        </main>
      </TaskProvider>
    </BrowserRouter>
  );
};

export default App;
