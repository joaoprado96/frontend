import LogoSVG from '@/assets/logo.svg?react';
import { tv, VariantProps } from 'tailwind-variants';
import { Tooltip } from '../Tooltip';
import { useCallback } from 'react';

const logoVariants = tv({
  base: '',
  variants: {
    size: {
      icon: `w-6 h-6`,
      sm: `w-12 h-12`,
      md: `w-16 h-16`,
      lg: `w-32 h-32`,
      x1: `w-48 h-48`,
      x2: `w-64 h-64`,
      x3: `w-80 h-80`,
      x4: `w-96 h-96`,
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

type LogoProps<T extends React.ElementType> = {
  as?: T;
  tooltip?: string;
} & VariantProps<typeof logoVariants> &
  React.ComponentProps<T>;

export const Logo = <T extends React.ElementType>({
  as: Element = 'span',
  tooltip,
  size,
  ...rest
}: LogoProps<T>) => {
  const Wrapper = useCallback(
    ({ children }: { children: React.ReactNode }) =>
      tooltip ? <Tooltip label={tooltip}>{children}</Tooltip> : children,
    [tooltip],
  );

  return (
    <Wrapper>
      <Element
        {...rest}
        className={logoVariants({ size, className: rest.className })}
      >
        <LogoSVG className="w-full h-full" />
      </Element>
    </Wrapper>
  );
};

Logo.displayName = 'Logo';
