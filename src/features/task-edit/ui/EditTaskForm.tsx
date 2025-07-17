import { Container, Title, Button, TextInput, Textarea, Select, Group, Paper } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetTasksQuery, useUpdateTaskMutation } from '@/entities/task';
import { IconArrowLeft } from '@tabler/icons-react';

const categories = [
  { value: 'Bug', label: 'Bug' },
  { value: 'Feature', label: 'Feature' },
  { value: 'Documentation', label: 'Documentation' },
  { value: 'Refactor', label: 'Refactor' },
  { value: 'Test', label: 'Test' },
];

const statuses = [
  { value: 'To Do', label: 'To Do' },
  { value: 'In Progress', label: 'In Progress' },
  { value: 'Done', label: 'Done' },
];

const priorities = [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
];

interface EditTaskFormProps {
  taskId: string;
}

export function EditTaskForm({ taskId }: EditTaskFormProps) {
  const { data: tasksData = [], isLoading: isLoadingTasks } = useGetTasksQuery();
  const [updateTask, { isLoading }] = useUpdateTaskMutation();
  const navigate = useNavigate();
  
  // Убеждаемся, что tasks - это массив
  const tasks = Array.isArray(tasksData) ? tasksData : [];
  const task = tasks.find((t) => t.id === taskId);

  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [category, setCategory] = useState(task?.category || 'Bug');
  const [status, setStatus] = useState(task?.status || 'To Do');
  const [priority, setPriority] = useState(task?.priority || 'Low');

  if (isLoadingTasks) return <Container>Загрузка...</Container>;
  if (!task) return <Container>Задача не найдена</Container>;

  const handleSave = async () => {
    if (!task) return;
    
    try {
      await updateTask({
        ...task,
        title,
        description,
        category,
        status,
        priority,
      }).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Ошибка при обновлении задачи:', error);
    }
  };

  return (
    <Container size="sm" py="xl">
      <Group mb="lg">
        <Button 
          variant="subtle" 
          leftSection={<IconArrowLeft size={16} />}
          onClick={() => navigate('/')}
        >
          Назад к списку
        </Button>
      </Group>
      
      <Paper shadow="sm" radius="md" p="xl" withBorder>
        <Title order={2} mb="lg">Редактировать задачу</Title>
        <TextInput label="Заголовок" value={title} onChange={(e) => setTitle(e.currentTarget.value)} required mb="md" />
        <Textarea label="Описание" value={description} onChange={(e) => setDescription(e.currentTarget.value)} mb="md" />
        <Select label="Категория" data={categories} value={category} onChange={(v) => v && setCategory(v as typeof category)} required mb="md" />
        <Select label="Статус" data={statuses} value={status} onChange={(v) => v && setStatus(v as typeof status)} required mb="md" />
        <Select label="Приоритет" data={priorities} value={priority} onChange={(v) => v && setPriority(v as typeof priority)} required mb="md" />
        <Group mt="lg">
          <Button onClick={handleSave} loading={isLoading}>Сохранить</Button>
          <Button variant="outline" color="gray" onClick={() => navigate('/')}>Отмена</Button>
        </Group>
      </Paper>
    </Container>
  );
}
