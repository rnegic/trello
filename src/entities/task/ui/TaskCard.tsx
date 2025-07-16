import { Text, Group, Badge, Button, Stack, ActionIcon } from '@mantine/core';
import { Task } from '@/shared/types';
import { useNavigate } from 'react-router-dom';
import { useDeleteTaskMutation } from '@/entities/task';
import { IconTrash } from '@tabler/icons-react';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const navigate = useNavigate();
  const [deleteTask, { isLoading }] = useDeleteTaskMutation();

  const handleDelete = async () => {
    try {
      await deleteTask(task.id).unwrap();
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
    }
  };

  return (
    <Stack gap={24} style={{ height: '100%' }}>
      <Group justify="space-between" align="flex-start">
        <Text fw={700} size="lg" style={{ lineHeight: 1.2 }}>{task.title}</Text>
        <Group gap={4}>
          <Button size="xs" variant="light" color="blue" onClick={() => navigate(`/task/${task.id}`)}>
            Редактировать
          </Button>
          <ActionIcon 
            size="md" 
            color="red" 
            variant="light" 
            onClick={handleDelete}
            loading={isLoading}
          >
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Group>
      {task.description && <Text size="sm" c="dimmed" mt={-4}>{task.description}</Text>}
      <Group mt="auto" gap={6}>
        <Badge color="blue" variant="light" radius="sm">{task.category}</Badge>
        <Badge color="teal" variant="light" radius="sm">{task.status}</Badge>
        <Badge color="red" variant="light" radius="sm">{task.priority}</Badge>
      </Group>
    </Stack>
  );
}
