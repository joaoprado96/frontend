import LogoSVG from '@/assets/logo.svg?react';

export function Logo({ className = 'w-32 h-32' }: { className?: string }) {
  return <LogoSVG className={className} />;
}
