import React, { useState } from 'react';
import Head from 'next/head';
import styles from '../globals.css';    

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [resetUsername, setResetUsername] = useState('');
    const [resetEmail, setResetEmail] = useState('');
    const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '' });
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://application-backend.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('currentUser', data.currentUser);
        setNotification({ message: 'Login bem-sucedido! Redirecionando...', type: 'success' });
        // Substitua abaixo pelo seu método de redirecionamento
        setTimeout(() => window.location.href = '/home', 4500);
      } else {
        setNotification({ message: 'Falha no login. Tente novamente.', type: 'error' });
      }
    } catch (error) {
      setNotification({ message: 'Erro no servidor. Tente novamente.', type: 'error' });
    }
  };

  const resetPassword = async () => {
    try {
      const response = await fetch('https://application-backend.onrender.com/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: resetUsername, email: resetEmail }),
      });
      if (response.ok) {
        setNotification({ message: 'Senha redefinida com sucesso!', type: 'success' });
      } else {
        setNotification({ message: 'Erro ao redefinir senha.', type: 'error' });
      }
    } catch (error) {
      setNotification({ message: 'Erro no servidor ao redefinir senha.', type: 'error' });
    }
  };

  return (
    <>
    <Head>
        <title>AcheAi</title>
        <link rel="icon" type="image/png" href="/icons/logo.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
        <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css" />
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" />
    </Head>
      <div className="page">
        <form onSubmit={handleLogin} className="formLogin">
          <h3 style={{ textAlign: 'center' }}>🚀 Bem-Vindo ao AcheAi! 🚀</h3>
          <p style={{ textAlign: 'center' }}>Vamos lá, faça seu login e explore!</p>
          <label htmlFor="username">Usuário</label>
          <input type="text" id="username" placeholder="Digite seu usuário" autoFocus value={username} onChange={e => setUsername(e.target.value)} />
          <label htmlFor="password">Senha</label>
          <input type="password" id="password" placeholder="Digite sua senha" value={password} onChange={e => setPassword(e.target.value)} />
          <a href="#" onClick={(e) => {
            e.preventDefault();
            setShowResetPasswordModal(true);
            }}>Esqueci minha senha</a>

          <a href="/usuario">Quero me cadastrar</a>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5px' }}>
            <input type="submit" value="Acessar" className="btn"/>
          </div>
        </form>

        {notification.message && (
          <div className={`notification-popup ${notification.type === 'success' ? 'success' : 'error'}`}>
            <p>{notification.message}</p>
          </div>
        )}

        {showResetPasswordModal && (
            <div className="modal-overlay">
                <div id="resetPasswordModal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowResetPasswordModal(false)}>&times;</span>
                        <div className="formulario-cadastro">
                            <h4>Ops, Senha Esquecida?</h4>
                            <p style={{ fontSize: '12px' }}>🌟 Relaxa, acontece nas melhores famílias! Só precisamos do seu usuário e e-mail. 🌟</p>
                            <label htmlFor="resetUsername">Usuário</label>
                            <input type="text" id="resetUsername" placeholder="👥 Seu nome de usuário" value={resetUsername} onChange={e => setResetUsername(e.target.value)} />
                            <label htmlFor="resetEmail">E-mail</label>
                            <input type="email" id="resetEmail" placeholder="✉️ Seu e-mail" value={resetEmail} onChange={e => setResetEmail(e.target.value)} />
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5px' }}>
                                <button onClick={resetPassword} className="btn">Gerar Senha Segura!</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </>
  );
}
