import AppRouter from './AppRouter';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { store } from '@/store';

function App() {
  return (
    <MantineProvider withCssVariables>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </MantineProvider>
  );
}

export default App;