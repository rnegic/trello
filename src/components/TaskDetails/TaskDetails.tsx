import { useParams, useNavigate } from 'react-router-dom';
import { useTaskContext } from '@/context/TaskContext';
import { Container, Title, Button, TextInput, Textarea, Select, Group } from '@mantine/core';
import { useState } from 'react';

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

export default function TaskDetails() {
  const { id } = useParams();
  const { tasks, updateTask } = useTaskContext();
  const navigate = useNavigate();
  const task = tasks.find((t) => t.id === id);

  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [category, setCategory] = useState(task?.category || 'Bug');
  const [status, setStatus] = useState(task?.status || 'To Do');
  const [priority, setPriority] = useState(task?.priority || 'Low');

  if (!task) return <Container>Задача не найдена</Container>;

  const handleSave = () => {
    updateTask({
      ...task,
      title,
      description,
      category,
      status,
      priority,
    });
    navigate('/');
  };

  return (
    <Container size="sm" py="xl">
      <Title order={2} mb="md">Редактировать задачу</Title>
      <TextInput label="Заголовок" value={title} onChange={(e) => setTitle(e.currentTarget.value)} required mb="md" />
      <Textarea label="Описание" value={description} onChange={(e) => setDescription(e.currentTarget.value)} mb="md" />
      <Select label="Категория" data={categories} value={category} onChange={(v) => v && setCategory(v as typeof category)} required mb="md" />
      <Select label="Статус" data={statuses} value={status} onChange={(v) => v && setStatus(v as typeof status)} required mb="md" />
      <Select label="Приоритет" data={priorities} value={priority} onChange={(v) => v && setPriority(v as typeof priority)} required mb="md" />
      <Group mt="lg">
        <Button onClick={handleSave}>Сохранить</Button>
        <Button variant="outline" color="gray" onClick={() => navigate('/')}>Отмена</Button>
      </Group>
    </Container>
  );
}
