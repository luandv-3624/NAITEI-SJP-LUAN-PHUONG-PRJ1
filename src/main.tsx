import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'jotai';
import { store } from './atoms';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { persistOptions, queryClient } from './api/query-client';
import { Toaster } from './components/ui/sonner.tsx';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={persistOptions}
      >
        <ReactQueryDevtools initialIsOpen={true} position='bottom' />
        <App />
        <Toaster position='top-center' />
      </PersistQueryClientProvider>
    </Provider>
  </StrictMode>,
);
