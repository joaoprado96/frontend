import { ComponentProps } from 'react';
import { VariantProps, tv } from 'tailwind-variants';

const labelVariants = tv(
  {
    base: `
    
      `,
    variants: {
      status: {
        none: `
        peer-focus:text-brand-primary-blue
        peer-focus:before:!border-brand-primary-blue
        peer-focus:after:!border-brand-primary-blue
        peer-placeholder-shown:text-gray-500
        text-gray-500

        before:border-brand-neutral-light
        after:border-brand-neutral-light
        `,
        error: `
        peer-focus:text-red-500
        peer-focus:before:!border-red-500
        peer-focus:after:!border-red-500
        peer-placeholder-shown:text-red-500
        text-red-500

        before:border-red-500
        after:border-red-500
        `,
        valid: `
        peer-focus:text-brand-secondary-green-dark
        peer-focus:before:!border-brand-secondary-green-dark
        peer-focus:after:!border-brand-secondary-green-dark
        peer-placeholder-shown:text-brand-secondary-green-dark
        text-brand-secondary-green-dark

        before:border-brand-secondary-green-dark
        after:border-brand-secondary-green-dark
        `,
      },

      hasUnit: {
        true: `
          rounded-tr-none
          after:rounded-tr-none
        `,
      },
    },

    defaultVariants: {
      status: 'none',
    },
  },
  {
    twMerge: false,
    responsiveVariants: false,
  },
);

type LabelProps = VariantProps<typeof labelVariants> & ComponentProps<'label'>;

export const Label = ({ hasUnit, ...props }: LabelProps) => (
  <label
    {...props}
    className={labelVariants({ ...props, hasUnit })
      .trim()
      .replace(/\s+/g, ' ')}
  />
);
