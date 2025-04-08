import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Estabelecimentos } from '@/pages/Estabelecimentos';
import { CadastroEstabelecimento } from '@/pages/Estabelecimento/CadastroEstabelecimento';
import { MainLayout } from '@/components/layouts/MainLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
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
      },
      {
        path: 'cadastroEstabelecimento',
        element: <CadastroEstabelecimento />,
      }
    ],
  },
]);
