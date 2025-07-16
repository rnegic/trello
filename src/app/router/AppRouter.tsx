import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskListPage } from '@/pages/task-list';
import { CreateTaskPage } from '@/pages/task-create';
import { TaskEditPage } from '@/pages/task-edit';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskListPage />} />
        <Route path="/task/new" element={<CreateTaskPage />} />
        <Route path="/task/:id" element={<TaskEditPage />} />
        <Route path="*" element={<TaskListPage />} />
      </Routes>
    </BrowserRouter>
  );
}
