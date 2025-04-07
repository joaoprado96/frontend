import { tw } from '@/utils/tw';

const styles = tw`
  min-w-64

  shadow-sm border-r
`;

export const Sidebar = (props: React.ComponentProps<'aside'>) => (
  <aside {...props} className={styles} />
);
