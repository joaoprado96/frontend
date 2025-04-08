// components/atoms/Input.tsx
import { forwardRef, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  unstyled?: boolean; // permite ignorar os estilos padrões quando quiser
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, unstyled = false, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={clsx(
          !unstyled &&
          'w-full border border-black rounded-lg px-3 mb-1 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition',
          className
        )}
      />
    );
  }
);

Input.displayName = 'Input';
