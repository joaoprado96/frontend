import { tw } from '@/utils/tw';
import { Children, isValidElement, memo } from 'react';

const styles = tw`
  flex gap-4

  min-h-12

  shadow-sm border-b
`;

export const Menu = memo(
  ({ children, ...props }: Omit<React.ComponentProps<'menu'>, 'className'>) => {
    // Makes sure all children are <li />
    const isAllLi = Children.toArray(children).every(
      (child) => isValidElement(child) && child.type === 'li',
    );

    if (!isAllLi) {
      console.warn('Menu children should be <li />');
    }

    return (
      <menu {...props} className={styles}>
        {children}
      </menu>
    );
  },
);
