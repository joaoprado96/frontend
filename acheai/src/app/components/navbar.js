import React, { useState } from 'react';
import Link from 'next/link'; // Importe o componente Link do Next.js
import Image from 'next/image';


export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const toggleSubmenu = (open) => {
    setIsSubmenuOpen(open);
  };

  return (
    <nav className={`nav ${isNavOpen ? 'openNav' : ''} ${isSearchOpen ? 'openSearch' : ''}`}>
      <i className={`uil uil-bars navOpenBtn ${isNavOpen ? 'hidden' : ''}`} onClick={() => setIsNavOpen(true)}></i>
      {/* Use o componente Link para navegação interna */}
      <Link href="/home">
          <img className="logo" src="icons/logo.png" alt="Logo" style={{ height: '40px' }} />
      </Link>

      <ul className="nav-links">
        <i className={`uil uil-times navCloseBtn ${isNavOpen ? 'visible' : ''}`} onClick={() => setIsNavOpen(false)}></i>
        {/* Use o componente Link para navegação interna */}
        <li><Link href="/home">Início</Link></li>
        <li><Link href="/estabelecimentos">Estabelecimentos</Link></li>
        <li><Link href="/informacoes">Quem somos</Link></li>
        <li><Link href="/contato">Contato</Link></li>
      </ul>

      <div className="search-box">
        <i className={`uil uil-search search-icon ${isNavOpen ? 'hidden' : ''}`} onClick={() => setIsSearchOpen(!isSearchOpen)}></i>
        <input type="text" placeholder="Search here..." style={{ pointerEvents: isSearchOpen ? 'auto' : 'none' }} />
      </div>

      <div className="user-icon-container" 
           onMouseEnter={() => toggleSubmenu(true)} 
           onMouseLeave={() => toggleSubmenu(false)}>
        <Image src="/icons/icon-usuario.png" alt="Usuário" width={40} height={40} className="user-icon" />
        <div className={`user-submenu ${isSubmenuOpen ? 'show' : ''}`}>
          <Link href="/login">Login</Link>
          <Link href="/usuario">Usuário</Link>
          <Link href="/cadastro">Cadastrar</Link>
          <Link href="/editar_estabelecimento">Atualizar</Link>
          <Link href="/fotos">Fotos</Link>
        </div>
      </div>
    </nav>
  );
}
