import React, { useState } from 'react';
import Link from 'next/link'; // Importe o componente Link do Next.js

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  return (
    <nav className={`nav ${isNavOpen ? 'openNav' : ''} ${isSearchOpen ? 'openSearch' : ''}`}>
      <i className={`uil uil-bars navOpenBtn ${isNavOpen ? 'hidden' : ''}`} onClick={() => setIsNavOpen(true)}></i>
      {/* Use o componente Link para navegação interna */}
      <Link href="/home">
        <p className="logo">
          <img src="icons/logo.png" alt="Logo" style={{ height: '40px' }} />
        </p>
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

      <div className="user-icon-container">
        <img src="icons/icon-usuario.png" alt="Usuário" className="user-icon" onMouseEnter={() => setIsSubmenuOpen(true)} onMouseLeave={() => setIsSubmenuOpen(false)} />
        <div className={`user-submenu ${isSubmenuOpen ? 'show' : ''}`}>
          <Link href="/login"><p>Login</p></Link>
          <Link href="/usuario"><p>Usuário</p></Link>
          <Link href="/cadastro"><p>Cadastrar</p></Link>
          <Link href="/editar_estabelecimento"><p>Atualizar</p></Link>
          <Link href="/fotos"><p>Fotos</p></Link>
        </div>
      </div>
    </nav>
  );
}
