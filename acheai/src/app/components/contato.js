import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Modal from 'react-modal';
import Image from 'next/image';


// Ajustes iniciais para o modal
Modal.setAppElement('#__next');

export default function Contato() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [sugestao, setSugestao] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true); // Ativa o loader

    const data = { nome, email, sugestao };

    fetch('https://application-backend.onrender.com/api/incluir-sugestao', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      setIsLoading(false); // Desativa o loader
      setModalMessage('Sugestão enviada com sucesso! Agradecemos o seu contato.');
      setModalIsOpen(true);
    })
    .catch((error) => {
      setIsLoading(false); // Desativa o loader
      setModalMessage('Falha ao enviar a sugestão. Por favor, tente novamente mais tarde.');
      setModalIsOpen(true);
    });
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
  <>
    <Head>
        <title>Contato - AcheAi</title>
    </Head>
    <div className="page">
      <div className="container-side">
        <div className="container2">
          <h2 style={{ fontSize: '24px', textAlign: 'center' }}>📢 Oi, Vamos Conversar! 📢</h2>
          <p>Tá com uma ideia genial ou quer nos dar um toque sobre algo? Conta tudo! Adoramos ouvir o que você tem a dizer. 😊</p>
          <div className="contact-icons">
            <a href="https://exemplo-whatsapp.com" className="icon-container2">
                <Image src="/icons/icon-whatsapp.png" alt="Chama no Zap" width={50} height={50} />
                <span>Chama no Zap! 📱 (11) 9999-9999</span>
            </a>
            <a href="https://exemplo-instagram.com" className="icon-container2">
                <Image src="/icons/icon-instagram.png" alt="Segue a gente no Instagram" width={50} height={50} />
                <span>Segue a gente! 📸 @ache.ai</span>
            </a>
            <a href="mailto:exemplo-email@example.com" className="icon-container2">
                <Image src="/icons/icon-email.png" alt="Manda um e-mail" width={50} height={50} />
                <span>Manda um e-mail! 📧 contato@acheai.app.br</span>
            </a>
        </div>
          <p style={{ marginTop: '20px', textAlign: 'justify' }}>
            🕒 Respondemos rapidinho! Todas as suas mensagens serão atendidas em até 6 horas. E ei, você aí que tá cheio de ideias e energia, sabia que estamos de braços abertos para novos parceiros? Se você acha que pode contribuir com o nosso projeto de alguma forma incrível, não deixe de entrar em contato. Vamos juntos fazer algo sensacional! 🚀
          </p>
        </div>

        <div className="container2">
          <form id="contactForm" className="formulario-cadastro" onSubmit={handleSubmit}>
            <label htmlFor="nome">Nome</label>
            <input type="text" id="nome" name="nome" required value={nome} onChange={(e) => setNome(e.target.value)} />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="sugestao">Sugestão</label>
            <textarea id="sugestao" name="sugestao" required value={sugestao} onChange={(e) => setSugestao(e.target.value)}></textarea>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5px' }}>
              <button type="submit" className="btn">Enviar</button>
            </div>
          </form>
          {isLoading && (
            <div className="loader-overlay">
            <div className="loader"></div>
            </div>
        )}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Feedback Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>Feedback</h2>
        <p>{modalMessage}</p>
        <button onClick={closeModal}>Fechar</button>
      </Modal>
    </div>
</>
  );
}
