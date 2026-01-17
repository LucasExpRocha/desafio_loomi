'use client';

import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import React from 'react';
import { TicketProvider } from '@/contexts/TicketContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 20 * 1000,
            gcTime: 24 * 60 * 60 * 1000,
          },
        },
      })
  );

  const isBrowser = typeof window !== 'undefined';
  const persister = React.useMemo(() => {
    if (!isBrowser) return null;
    return createAsyncStoragePersister({
      storage: window.localStorage,
    });
  }, [isBrowser]);

  if (!isBrowser || !persister) {
    return (
      <QueryClientProvider client={queryClient}>
        <TicketProvider>{children}</TicketProvider>
      </QueryClientProvider>
    );
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <TicketProvider>{children}</TicketProvider>
    </PersistQueryClientProvider>
  );
}
