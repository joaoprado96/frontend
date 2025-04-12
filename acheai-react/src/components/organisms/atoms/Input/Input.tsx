import IMask, { InputMask } from 'imask';
import React, {
  ComponentProps,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { tv, VariantProps } from 'tailwind-variants';

import { useFormContext } from 'react-hook-form';
import { Badges } from './Badges';
import { Container } from './Container';
import { Label } from './Label';

const inputVariants = tv({
  base: 'border font-semibold transition',
  variants: {
    status: {
      none: `
            border-brand-neutral-light
            focus:border-brand-primary-blue
            placeholder-shown:border-brand-neutral-light
            placeholder-shown:border-t-brand-neutral-light
            text-gray-700 
          `,
      error: `
            border-red-500
            focus:border-red-600
            placeholder-shown:border-red-500
            placeholder-shown:border-t-red-500
            text-red-500 focus:text-gray-700
          `,
      valid: `
            border-brand-secondary-green-dark
            focus:border-brand-secondary-green-dark
            placeholder-shown:border-brand-secondary-green-dark
            placeholder-shown:border-t-brand-secondary-green-dark
            text-brand-secondary-green-dark focus:text-gray-700
          `,
    },
    hasUnit: {
      true: `
          rounded-r-none
          rounded-l
        `,
    },
    sizing: {
      sm: 'text-sm px-2 py-1',
      md: 'text-base px-3 py-2',
      lg: 'text-lg px-4 py-3',
    },
    rounded: {
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      x2: 'rounded-2xl'
    },
    selected: {
      true: 'bg-orange-500 text-white border-orange-500',
      false: 'bg-white text-gray-700 border-gray-300 hover:border-gray-500',
    },
    variant: {
      default: 'border-black',
      gray: 'border-gray-300 text-gray-800',
      error: 'border-red-500 text-red-600',
    },
  },
  defaultVariants: {
    sizing: 'md',
    rounded: 'md',
    variant: 'default',
  }
});

export type InputProps = {
  label?: string;
  children?: React.ReactNode;
  message?: string;
  shouldForwardMaskedValue?: boolean;
  unit?: string;
} & VariantProps<typeof inputVariants> &
  Omit<ComponentProps<'input'>, 'placeholder' | 'ref'> & {
    maskConfig?: Parameters<typeof IMask>[1];
  };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ children, maskConfig, shouldForwardMaskedValue, ...props }, ref) => {
    const context = useFormContext();

    const inputRef = useRef<HTMLInputElement>(null);
    const maskRef = useRef<InputMask<any> | null>(null);

    useImperativeHandle(
      ref,
      () => ({
        ...inputRef.current!,
        get value() {
          maskRef.current?.updateValue();

          if (shouldForwardMaskedValue || !maskRef.current) {
            return inputRef.current?.value ?? '';
          }

          return maskRef.current?.unmaskedValue ?? '';
        },

        set value(value: string) {
          if (!inputRef.current) return;
          inputRef.current.value = value;
          maskRef.current?.updateValue();
        },

        focus() {
          inputRef.current?.focus();
        },
      }),
      [shouldForwardMaskedValue],
    );

    useImperativeHandle(
      ref,
      () =>
        Object.assign(inputRef.current!, {
          get value() {
            maskRef.current?.updateValue();

            if (shouldForwardMaskedValue) {
              return inputRef.current?.value ?? '';
            }

            return maskRef.current?.unmaskedValue ?? '';
          },

          set value(value: string) {
            if (!inputRef.current) return;
            inputRef.current.value = value;
            maskRef.current?.updateValue();
          },
        }),
      [shouldForwardMaskedValue],
    );

    useEffect(() => {
      if (!inputRef.current || !maskConfig) return;
      maskRef.current = IMask(inputRef.current, maskConfig);
    });

    const getMessage = () => {
      if (props.message) return props.message;

      if (context && props.name && context.formState.errors[props.name]) {
        return context.formState.errors[props.name]?.message?.toString() ?? '';
      }

      return '';
    };

    const getStatus = () => {
      if (context && props.name && context.formState.errors[props.name]) {
        return { status: 'error' } as const;
      }

      return { status: props.status };
    };

    const status = getStatus().status || props.status || 'none';

    const hasUnit = !!props.unit;

    const { rounded, ...rest } = props;

    return (
      <>
        <Container>
          <input
            {...props}
            className={inputVariants({ ...props, status, hasUnit, rounded })
              .trim()
              .replace(/\s+/g, ' ')}
            placeholder=" "
            ref={inputRef}
          />

          <Badges status={status}>{children}</Badges>
        </Container>

        {props.label != null && props.name != null && (
          <Label hasUnit={hasUnit} status={status}>
            {props.label || props.name}
          </Label>
        )}

        <span className="flex empty:hidden text-xs justify-center items-center px-[18px] py-[11px] border border-l-0 border-brand-neutral-light bg-brand-neutral-lightest rounded-e">
          {props.unit}
        </span>

        <span className="text-xs pl-2 pt-1 text-red-600 text-left empty:hidden empty:opacity-0 opacity-100">
          {getMessage() || ''}
        </span>
      </>
    );
  },
);