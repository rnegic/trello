import { Container, Title, Button, TextInput, Textarea, Select, Group, Paper } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateTaskMutation } from '@/entities/task';
import { TaskCategory, TaskStatus, TaskPriority } from '@/shared/types';
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

export function CreateTaskPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TaskCategory>('Bug');
  const [status, setStatus] = useState<TaskStatus>('To Do');
  const [priority, setPriority] = useState<TaskPriority>('Medium');
  
  const navigate = useNavigate();
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const handleCreate = async () => {
    if (!title.trim()) return;
    
    try {
      await createTask({
        title: title.trim(),
        description: description.trim() || undefined,
        category,
        status,
        priority,
      }).unwrap();
      
      navigate('/');
    } catch (error) {
      console.error('Ошибка при создании задачи:', error);
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
        <Title order={2} mb="lg">Создать новую задачу</Title>
        
        <TextInput 
          label="Заголовок" 
          value={title} 
          onChange={(e) => setTitle(e.currentTarget.value)} 
          required 
          mb="md"
          error={!title.trim() && title.length > 0 ? 'Заголовок обязателен' : null}
        />
        
        <Textarea 
          label="Описание" 
          value={description} 
          onChange={(e) => setDescription(e.currentTarget.value)} 
          mb="md"
          minRows={3}
        />
        
        <Select 
          label="Категория" 
          data={categories} 
          value={category} 
          onChange={(v) => v && setCategory(v as TaskCategory)} 
          required 
          mb="md" 
        />
        
        <Select 
          label="Статус" 
          data={statuses} 
          value={status} 
          onChange={(v) => v && setStatus(v as TaskStatus)} 
          required 
          mb="md" 
        />
        
        <Select 
          label="Приоритет" 
          data={priorities} 
          value={priority} 
          onChange={(v) => v && setPriority(v as TaskPriority)} 
          required 
          mb="lg" 
        />
        
        <Group justify="flex-end">
          <Button variant="outline" onClick={() => navigate('/')}>
            Отмена
          </Button>
          <Button 
            onClick={handleCreate} 
            disabled={!title.trim()} 
            loading={isLoading}
          >
            Создать задачу
          </Button>
        </Group>
      </Paper>
    </Container>
  );
}
