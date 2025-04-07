import { useToastStore } from '@/stores/toast.store';
import { useEffect } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

const styles = tv({
  base: `
    flex flex-col  
  
    px-4 py-2

    min-w-[164px]
    max-w-[240px]

    rounded shadow-md transition

    cursor-pointer
  `,

  variants: {
    intent: {
      info: 'bg-cyan-500 text-white hover:bg-cyan-600',
      success: 'bg-green-500 text-white hover:bg-green-600',
      error: 'bg-red-500 text-white hover:bg-red-600',
      warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
    },
  },

  defaultVariants: {
    intent: 'info',
  },
});

type ToastProps = VariantProps<typeof styles> & {
  title?: string;
  children?: React.ReactNode;
};

export const Toast = (props: ToastProps) => {
  return (
    <div className={styles(props)}>
      <header>
        {props.title && (
          <h1 className="text-xl font-semibold">{props.title}</h1>
        )}
      </header>
      {props.children}
    </div>
  );
};

// TODO: Fix garbage collector and rendering
export const ToastProvider = () => {
  const { toasts, _gb } = useToastStore();

  useEffect(() => {
    const handler = setInterval(() => {
      toasts.length > 0 && _gb();
    }, 300);
    return () => clearInterval(handler);
  }, [_gb, toasts]);

  return (
    <aside className="fixed flex flex-col right-6 top-2 gap-2 z-50">
      {toasts.map((toast) => (
        <Toast key={toast.id} title={toast.title} intent={toast.intent}>
          {toast.message}
        </Toast>
      ))}
    </aside>
  );
};
