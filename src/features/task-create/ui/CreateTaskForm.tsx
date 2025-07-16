import { Button, Modal, TextInput, Textarea, Select, Group } from '@mantine/core';
import { useState } from 'react';
import { useCreateTaskMutation } from '@/entities/task';
import { Task, TaskCategory, TaskStatus, TaskPriority } from '@/shared/types';
import { IconPlus } from '@tabler/icons-react';

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

interface CreateTaskFormProps {
  onSuccess?: () => void;
}

export function CreateTaskForm({ onSuccess }: CreateTaskFormProps) {
  const [opened, setOpened] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TaskCategory>('Bug');
  const [status, setStatus] = useState<TaskStatus>('To Do');
  const [priority, setPriority] = useState<TaskPriority>('Medium');
  
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
      
      setTitle('');
      setDescription('');
      setCategory('Bug');
      setStatus('To Do');
      setPriority('Medium');
      setOpened(false);
      onSuccess?.();
    } catch (error) {
      console.error('Ошибка при создании задачи:', error);
    }
  };

  return (
    <>
      <Button leftSection={<IconPlus size={16} />} onClick={() => setOpened(true)}>
        Создать задачу
      </Button>
      
      <Modal opened={opened} onClose={() => setOpened(false)} title="Создать новую задачу">
        <TextInput 
          label="Заголовок" 
          value={title} 
          onChange={(e) => setTitle(e.currentTarget.value)} 
          required 
          mb="md" 
        />
        <Textarea 
          label="Описание" 
          value={description} 
          onChange={(e) => setDescription(e.currentTarget.value)} 
          mb="md" 
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
          <Button variant="outline" onClick={() => setOpened(false)}>Отмена</Button>
          <Button onClick={handleCreate} disabled={!title.trim()} loading={isLoading}>
            Создать
          </Button>
        </Group>
      </Modal>
    </>
  );
}
