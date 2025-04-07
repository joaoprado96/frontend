import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Estabelecimentos } from '@/pages/Estabelecimentos';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'estabelecimentos',
        element: <Estabelecimentos />,
      }
    ],
  },
]);
