import { ComponentProps } from 'react';
import { VariantProps, tv } from 'tailwind-variants';

const inputBadgesVariants = tv({
  base: `
     absolute
     
     flex gap-2

     transition-all transform-gpu
     
     w-fit h-5
     place-items-center top-2/4 right-4 -translate-y-2/4
   `,
  variants: {
    status: {
      none: 'text-brand-neutral-light peer-focus:text-brand-primary-blue',
      error: 'text-red-500 peer-focus:text-red-600',
      valid:
        'text-brand-secondary-green-dark peer-focus:text-brand-secondary-green-dark',
    },
  },
  defaultVariants: {
    status: 'none',
  },
});

type InputBadgesProps = VariantProps<typeof inputBadgesVariants> &
  ComponentProps<'div'>;

export const Badges = (props: InputBadgesProps) => (
  <div {...props} className={inputBadgesVariants(props)} />
);
