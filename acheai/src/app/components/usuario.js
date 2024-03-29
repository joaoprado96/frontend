import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Modal from 'react-modal';

Modal.setAppElement('#__next');
export default function Usuario() {
    const [formData, setFormData] = useState({
        nome: '',
        tipoUsuario: '',
        cpf: '',
        cnpj: '',
        endereco: '',
        dataNascimento: '',
        email: '',
        username: '',
        termos: false
    });
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleCheckboxChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.checked });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Ativa o loader

        try {
            const response = await fetch('https://application-backend.onrender.com/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if(response.ok) {
                setIsLoading(false); // Desativa o loader
                setNotification({ message: 'Cadastro efetuado com sucesso, redirecionando...', type: 'success' });
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2500);
            } else {
                setNotification({ message: 'Falha no registro. Tente novamente.', type: 'error' });
            }
        } catch (error) {
            setNotification({ message: 'Erro no servidor. Tente novamente.', type: 'error' });
        }
    };
    const closeModal = () => {
        setModalIsOpen(false);
      };

    return (
        <>
            <Head>
                <title>Usuario - AcheAi</title>
            </Head>
            <div className="page">
                {notification.message && (
                    <div className={`notification-popup ${notification.type}`}>
                        <p>{notification.message}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="formLogin">
                    <p>Para seguir com o seu cadastro preencha as informações abaixo:</p>
                    {/* Campos do formulário */}
                    <input type="text" id="nome" placeholder="Nome" required onChange={handleChange} value={formData.nome} />

                    <select id="tipoUsuario" required onChange={handleChange} value={formData.tipoUsuario}>
                        <option value="">Selecione o Tipo de Usuário</option>
                        <option value="fisica">Pessoa Física</option>
                        <option value="juridica">Pessoa Jurídica</option>
                    </select>

                    {formData.tipoUsuario === 'fisica' && (
                        <input type="text" id="cpf" placeholder="CPF" onChange={handleChange} value={formData.cpf} />
                    )}
                    {formData.tipoUsuario === 'juridica' && (
                        <input type="text" id="cnpj" placeholder="CNPJ" onChange={handleChange} value={formData.cnpj} />
                    )}

                    <input type="text" id="endereco" placeholder="Endereço" onChange={handleChange} value={formData.endereco} />
                    <input type="date" id="dataNascimento" placeholder="Data de Nascimento" onChange={handleChange} value={formData.dataNascimento} />
                    <input type="email" id="email" placeholder="E-mail" required onChange={handleChange} value={formData.email} />
                    <input type="text" id="username" placeholder="Nome de Usuário" required onChange={handleChange} value={formData.username} />
                    
                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
                        <Link href="/login">Quero fazer login</Link>
                    </div>
                    
                    <label style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2px 2px' }}>
                        <input type="checkbox" id="termos" onChange={handleCheckboxChange} checked={formData.termos} />
                        <span style={{ marginLeft: '5px' }}>Eu concordo com os Termos</span>
                    </label>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5px' }}>
                        <input type="submit" value="Registrar" className="btn" />
                    </div>
                </form>
                {isLoading && (
                <div className="loader-overlay">
                <div className="loader"></div>
                </div>
            )}
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
        </>
    );
}
