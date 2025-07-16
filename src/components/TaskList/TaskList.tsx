import { Container, Grid, Title, Paper, rem, Group } from '@mantine/core';
import TaskItem from '@/components/TaskItem/TaskItem';
import CreateTaskModal from '@/components/CreateTaskModal/CreateTaskModal';
import { useAppSelector } from '@/hooks/redux';

export default function TaskList() {
  const tasks = useAppSelector(state => state.tasks.tasks);

  return (
    <Container size="md" py="xl">
      <Group justify="space-between" align="center" mb="lg">
        <Title order={2} style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>Список задач</Title>
        <CreateTaskModal />
      </Group>
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
