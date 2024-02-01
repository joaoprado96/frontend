import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Modal from 'react-modal';

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
        <title>AcheAi</title>
        <link rel="icon" type="image/png" href="/icons/logo.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
        <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css" />
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" />
      </Head>
      <div className="pagecontato">
        <div className="container-side-contato">
          <div className="text-section">
            <h2 className='p-texto-contato'>Oi! Vamos <span className='p-texto-contato'>conversar?</span></h2>
            <p>Tá com uma ideia genial ou quer nos dar um toque sobre algo?</p>
            <p>Me conta o que você está pensando! </p>
            <div className="contact-icons">
              <a href="https://exemplo-whatsapp.com" className="icon-container2">
                <img src="icons/icon-whats-contact.png" />
                <span>(11) 9999-9999</span>
              </a>
              <a href="https://exemplo-instagram.com" className="icon-container2">
                <img src="icons/icon-instagram-contact.png" />
                <span>@ache.ai</span>
              </a>
              <a href="mailto:exemplo-email@example.com" className="icon-container2">
                <img src="icons/icon-email-contact.png" />
                <span>contato@acheai.app.br</span>
              </a>
            </div>
            <p style={{ marginTop: '20px', textAlign: 'justify' }}>
              Quer se tornar um parceiro e ser exposto na plataforma? 
              <a href="mailto:exemplo-email@example.com" className="icon-container2">
                <span>Cadastre-se aqui!</span>
              </a>
            </p>
          </div>

          <div className="form-section card-contato">
            <form id="contactForm" className="formulario-cadastro" onSubmit={handleSubmit}>
              <label htmlFor="nome">Nome</label>
              <input type="text" id="nome" name="nome" required value={nome} onChange={(e) => setNome(e.target.value)} />
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="sugestao">Sugestão</label>
              <textarea id="sugestao" name="sugestao" required value={sugestao} onChange={(e) => setSugestao(e.target.value)}></textarea>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5px' }}>
                <button type="submit" className="btn mt-3">Enviar</button>
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
