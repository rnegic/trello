import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { AppRouter } from '@/app/router';

export function App() {
  return (
    <MantineProvider withCssVariables>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </MantineProvider>
  );
}
