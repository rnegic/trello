import { useParams } from 'react-router-dom';
import { EditTaskForm } from '@/features/task-edit';

export function TaskEditPage() {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    return <div>Неверный ID задачи</div>;
  }

  return <EditTaskForm taskId={id} />;
}
