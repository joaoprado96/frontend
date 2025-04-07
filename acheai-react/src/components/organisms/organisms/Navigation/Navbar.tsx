// components/Navbar.tsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../atoms/Logo';
// import { Logo } from '../../atoms/Logo';

export const Navbar = () => {
  useEffect(() => {
    const nav = document.querySelector(".nav")!;
    const searchIcon = document.querySelector(".search-icon")!;
    const navOpenBtn = document.querySelector(".navOpenBtn")!;
    const navCloseBtn = document.querySelector(".navCloseBtn")!;
    const userIconContainer = document.querySelector(".user-icon")!;
    const userSubmenu = document.querySelector(".user-submenu")!;

    let closeTimeout: any;
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
           <Logo className='w-16 h-16' />
          </Link>

          {/* Menu */}
          <nav className="flex gap-6">
            <Link to="/home" className="text-gray-700 hover:text-blue-600 transition">
              Início
            </Link>
            <Link to="/estabelecimentos" className="text-gray-700 hover:text-blue-600 transition">
              Estabelecimentos
            </Link>
            <Link to="/informacoes" className="text-gray-700 hover:text-blue-600 transition">
              Quem somos
            </Link>
            <Link to="/contato" className="text-gray-700 hover:text-blue-600 transition">
              Contato
            </Link>
          </nav>

          {/* Ações */}
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">
              Entrar
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
