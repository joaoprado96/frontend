import React, { useState } from 'react';

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  return (
    <nav className={`nav ${isNavOpen ? 'openNav' : ''} ${isSearchOpen ? 'openSearch' : ''}`}>
      <i className={`uil uil-bars navOpenBtn ${isNavOpen ? 'hidden' : ''}`} onClick={() => setIsNavOpen(true)}></i>
      <a href="/home" className="logo">
        <img src="icons/logo.png" alt="Logo" style={{ height: '40px' }} />
      </a>

      <ul className="nav-links">
        <i className={`uil uil-times navCloseBtn ${isNavOpen ? 'visible' : ''}`} onClick={() => setIsNavOpen(false)}></i>
        <li><a href="/home">Início</a></li>
        <li><a href="/estabelecimentos">Estabelecimentos</a></li>
        <li><a href="/informacoes">Quem somos</a></li>
        <li><a href="/contato">Contato</a></li>
      </ul>

      <div className="search-box">
        <i className={`uil uil-search search-icon ${isNavOpen ? 'hidden' : ''}`} onClick={() => setIsSearchOpen(!isSearchOpen)}></i>
        <input type="text" placeholder="Search here..." style={{ pointerEvents: isSearchOpen ? 'auto' : 'none' }} />
      </div>

      <div className="user-icon-container">
        <img src="icons/icon-usuario.png" alt="Usuário" className="user-icon" onMouseEnter={() => setIsSubmenuOpen(true)} onMouseLeave={() => setIsSubmenuOpen(false)} />
        <div className={`user-submenu ${isSubmenuOpen ? 'show' : ''}`}>
          <a href="/login">Login</a>
          <a href="/usuario">Usuário</a>
          <a href="/cadastro">Cadastrar</a>
          <a href="/editar_estabelecimento">Atualizar</a>
          <a href="/fotos">Fotos</a>
        </div>
      </div>
    </nav>
  );
}
