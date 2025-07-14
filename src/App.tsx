import { TaskProvider } from '@/context/TaskContext';
import AppRouter from './AppRouter';
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider withCssVariables>
      <TaskProvider>
        <AppRouter />
      </TaskProvider>
    </MantineProvider>
  );
}

export default App;