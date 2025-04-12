import { tv, VariantProps } from 'tailwind-variants';
import clsx from 'clsx';
import React from 'react';

const buttonStyles = tv({
  base: `
    font-semibold
    rounded
    transition
    disabled:opacity-50
    disabled:cursor-not-allowed
  `,
  variants: {
    variant: {
      solid: 'bg-purple-700 hover:bg-purple-800 text-white',
      outline: 'border border-purple-700 text-purple-700 bg-transparent hover:bg-purple-100',
      ghost: 'text-purple-700 bg-transparent hover:bg-purple-100',
    },
    size: {
      sm: 'text-sm px-3 py-1.5',
      md: 'text-base px-6 py-2',
      lg: 'text-lg px-8 py-3',
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
});

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
} & VariantProps<typeof buttonStyles>;

export const Button = ({
  children,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  variant,
  size,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(buttonStyles({ variant, size }), className)}
    >
      {children}
    </button>
  );
};
