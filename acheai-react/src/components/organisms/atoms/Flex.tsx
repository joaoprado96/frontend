import { ComponentProps } from 'react';
import { VariantProps, tv } from 'tailwind-variants';

const flexVariants = tv({
  base: 'flex',

  variants: {
    vertical: {
      true: 'flex-col',
    },

    p: {
      xs: 'p-1',
      sm: 'p-2',
      md: 'p-3',
      lg: 'p-4',
      xl: 'p-6',
    },

    justify: {
      start: 'justify-start',
      end: 'justify-end',
      center: 'justify-center',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },

    align: {
      start: 'items-start',
      end: 'items-end',
      center: 'items-center',
      baseline: 'items-baseline',
      stretch: 'items-stretch',
    },

    gap: {
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-4',
      xl: 'gap-6',
    },
  },
});

type FlexProps<T extends React.ElementType> = VariantProps<
  typeof flexVariants
> &
  ComponentProps<T> & {
    as?: T;
  };

export const Flex = <T extends React.ElementType>({
  as: Component = 'div',
  vertical,
  ...props
}: FlexProps<T>) => (
  <Component {...props} className={flexVariants({ ...props, vertical })} />
);
