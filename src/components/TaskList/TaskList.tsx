import { Container, Grid, Title, Paper, rem, Group, Button } from '@mantine/core';
import TaskItem from '@/components/TaskItem/TaskItem';
import { useGetTasksQuery } from '@/store/api/tasksApi';
import { IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export default function TaskList() {
  const { data: tasks = [], isLoading, error } = useGetTasksQuery();
  const navigate = useNavigate();

  if (isLoading) return <Container>Загрузка...</Container>;
  if (error) return <Container>Ошибка при загрузке задач</Container>;

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
              <TaskItem task={task} />
            </Paper>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
