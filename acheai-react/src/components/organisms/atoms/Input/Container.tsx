import { ComponentProps } from 'react';
import { VariantProps, tv } from 'tailwind-variants';

const inputContainerVariants = tv({
  base: 'flex flex-col gap-2 relative w-full rounded transition',
});

type InputContainerProps = VariantProps<typeof inputContainerVariants> &
  ComponentProps<'div'>;

export const Container = (props: InputContainerProps) => (
  <div {...props} className={inputContainerVariants(props)} />
);
