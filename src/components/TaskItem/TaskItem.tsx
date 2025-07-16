import { Text, Group, Badge, Button, Stack, ActionIcon } from '@mantine/core';
import { Task } from '@/types';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/redux';
import { deleteTask } from '@/store/slices/tasksSlice';
import { IconTrash } from '@tabler/icons-react';

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <Stack gap={24} style={{ height: '100%' }}>
      <Group justify="space-between" align="flex-start">
        <Text fw={700} size="lg" style={{ lineHeight: 1.2 }}>{task.title}</Text>
        <Group gap={4}>
          <Button size="xs" variant="light" color="blue" onClick={() => navigate(`/task/${task.id}`)}>
            Редактировать
          </Button>
          <ActionIcon size="sm" color="red" variant="light" onClick={handleDelete}>
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
