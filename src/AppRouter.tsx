import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskList from '@/components/TaskList/TaskList';
import TaskDetails from '@/components/TaskDetails/TaskDetails';
import CreateTaskPage from '@/pages/CreateTaskPage/CreateTaskPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/task/new" element={<CreateTaskPage />} />
        <Route path="/task/:id" element={<TaskDetails />} />
        <Route path="*" element={<TaskList />} />
      </Routes>
    </BrowserRouter>
  );
}
