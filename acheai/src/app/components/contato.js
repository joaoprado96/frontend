import React, { useState } from 'react';

export default function Contato() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [sugestao, setSugestao] = useState('');
  const [apiResponse, setApiResponse] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    var data = {
      nome: nome,
      email: email,
      sugestao: sugestao
    };

    // Exemplo de função para enviar dados para o servidor
    fetch('https://application-backend.onrender.com/api/incluir-sugestao', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        // Defina a resposta da API no estado para exibição
        setApiResponse(data);
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="page">
      <div className="container-side">
        <div className="container2">
          <h2 style={{ fontSize: '24px', textAlign: 'center' }}>📢 Oi, Vamos Conversar! 📢</h2>

          <br />
          <p>Tá com uma ideia genial ou quer nos dar um toque sobre algo? Conta tudo! Adoramos ouvir o que você tem a dizer. 😊</p>

          <div className="contact-icons">
            <a href="link-do-whatsapp" className="icon-container2">
              <img src="icons/icon-whatsapp.png" alt="WhatsApp" />
              <span>Chama no Zap! 📱 (11) 9999-9999</span>
            </a>
            <a href="link-do-instagram" className="icon-container2">
              <img src="icons/icon-instagram.png" alt="Instagram" />
              <span>Segue a gente! 📸 @ache.ai</span>
            </a>
            <a href="mailto:seuemail@example.com" className="icon-container2">
              <img src="icons/icon-email.PNG" alt="Email" />
              <span>Manda um e-mail! 📧 contato@acheai.app.br</span>
            </a>
          </div>
          <p style={{ marginTop: '20px', textAlign: 'justify' }}>
            🕒 Respondemos rapidinho! Todas as suas mensagens serão atendidas em até 6 horas. E ei, você aí que tá cheio de ideias e energia, sabia que estamos de braços abertos para novos parceiros? Se você acha que pode contribuir com o nosso projeto de alguma forma incrível, não deixe de entrar em contato. Vamos juntos fazer algo sensacional! 🚀
          </p>
        </div>

        <div className="container2">
          {/* Formulário */}
          <form id="contactForm" className="formulario-cadastro" onSubmit={handleSubmit}>
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="sugestao">Sugestão</label>
            <textarea
              id="sugestao"
              name="sugestao"
              required
              value={sugestao}
              onChange={(e) => setSugestao(e.target.value)}
            ></textarea>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5px' }}>
              <button type="submit" className="btn">Enviar</button>
            </div>
          </form>
        </div>
      </div>

      {/* Renderize a resposta da API, se houver */}
      {apiResponse && (
        <div>
          <p>Resposta da API:</p>
          <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
