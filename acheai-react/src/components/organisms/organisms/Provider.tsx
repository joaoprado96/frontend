import { QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from './Toast';
import { queryClient } from '@/utils/queryClient';

export const Provider = (props: React.PropsWithChildren<unknown>) => (
  <QueryClientProvider client={queryClient}>
    <ToastProvider />
    {props.children}
  </QueryClientProvider>
);
