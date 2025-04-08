// components/layouts/MainLayout.tsx
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/organisms/organisms/Navigation/Navbar';

export function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
