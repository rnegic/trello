import { Container, Grid, Title, Paper, rem, Group, Button } from '@mantine/core';
import { TaskCard } from '@/entities/task';
import { useGetTasksQuery } from '@/entities/task';
import { IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export function TaskList() {
  const { data: tasksData = [], isLoading, error } = useGetTasksQuery();
  const navigate = useNavigate();

  // Убеждаемся, что tasks - это массив
  const tasks = Array.isArray(tasksData) ? tasksData : [];

  if (isLoading) return <Container>Загрузка...</Container>;
  if (error) {
    console.error('Error loading tasks:', error);
    return <Container>Ошибка при загрузке задач. Проверьте консоль для подробностей.</Container>;
  }

  console.log('Tasks data:', tasksData, 'Is array:', Array.isArray(tasksData));

  if (tasks.length === 0) {
    return (
      <Container size="md" py="xl">
        <Group justify="space-between" align="center" mb="lg">
          <Title order={2} style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
            Список задач
          </Title>
          <Button 
            leftSection={<IconPlus size={16} />} 
            onClick={() => navigate('/task/new')}
          >
            Создать задачу
          </Button>
        </Group>
        <Container ta="center" py="xl">
          <Title order={3} c="dimmed">Нет задач</Title>
          <Button 
            mt="md"
            leftSection={<IconPlus size={16} />} 
            onClick={() => navigate('/task/new')}
          >
            Создать первую задачу
          </Button>
        </Container>
      </Container>
    );
  }

  return (
    <Container size="md" py="xl">
      <Group justify="space-between" align="center" mb="lg">
        <Title order={2} style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
          Список задач
        </Title>
        <Button 
          leftSection={<IconPlus size={16} />} 
          onClick={() => navigate('/task/new')}
        >
          Создать задачу
        </Button>
      </Group>
      <Grid gutter={32}>
        {tasks.map((task) => (
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={task.id}>
            <Paper 
              shadow={undefined} 
              radius="lg" 
              p="lg" 
              withBorder 
              style={{ 
                background: '#fff', 
                minHeight: rem(220), 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between', 
                border: '1.5px solid #ececec' 
              }}
            >
              <TaskCard task={task} />
            </Paper>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
