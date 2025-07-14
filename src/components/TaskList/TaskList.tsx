import { useTaskContext } from '@/context/TaskContext';
import { Container, Grid, Title, Paper, rem } from '@mantine/core';
import TaskItem from '@/components/TaskItem/TaskItem';

export default function TaskList() {
  const { tasks } = useTaskContext();

  return (
    <Container size="md" py="xl">
      <Title order={2} mb="lg" style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>Список задач</Title>
      <Grid gutter={32}>
        {tasks.map((task) => (
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={task.id}>
            <Paper shadow={undefined} radius="lg" p="lg" withBorder style={{ background: '#fff', minHeight: rem(220), display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1.5px solid #ececec' }}>
              <TaskItem task={task} />
            </Paper>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
