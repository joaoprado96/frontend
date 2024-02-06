import React, { useState } from 'react';
import Head from 'next/head';
import { useProgress } from '../../app/contexts/ProgressContext';
import Select from 'react-select';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import { FaRegTrashAlt, FaPlusCircle } from 'react-icons/fa'; // Importe os ícones diretamente

const opcoesEstilosMusicais = [
  { value: 'Sem informação', label: 'Sem essa informação' },
  { value: 'Axé', label: 'Axé' },
  { value: 'Black Music', label: 'Black Music' },
  { value: 'Blues', label: 'Blues' },
  { value: 'Bossa Nova', label: 'Bossa Nova' },
  { value: 'Clássica', label: 'Clássica' },
  { value: 'Dance', label: 'Dance' },
  { value: 'Disco', label: 'Disco' },
  { value: 'Eletrônica', label: 'Eletrônica' },
  { value: 'Emocore', label: 'Emocore' },
  { value: 'Funk', label: 'Funk' },
  { value: 'Funk Carioca', label: 'Funk Carioca' },
  { value: 'Folk', label: 'Folk' },
  { value: 'Forró', label: 'Forró' },
  { value: 'Gospel/Religioso', label: 'Gospel/Religioso' },
  { value: 'Gótico', label: 'Gótico' },
  { value: 'Hard Rock', label: 'Hard Rock' },
  { value: 'Hip-Hop', label: 'Hip-Hop' },
  { value: 'Heavy Metal', label: 'Heavy Metal' },
  { value: 'House', label: 'House' },
  { value: 'Infantil', label: 'Infantil' },
  { value: 'Indie', label: 'Indie' },
  { value: 'Instrumental', label: 'Instrumental' },
  { value: 'J-Pop/J-Rock', label: 'J-Pop/J-Rock' },
  { value: 'Jazz', label: 'Jazz' },
  { value: 'K-pop/K-rock', label: 'K-pop/K-rock' },
  { value: 'Latina', label: 'Latina' },
  { value: 'Lo-Fi', label: 'Lo-Fi' },
  { value: 'MPB', label: 'MPB' },
  { value: 'Metal', label: 'Metal' },
  { value: 'Pop', label: 'Pop' },
  { value: 'Pagode', label: 'Pagode' },
  { value: 'Psicodelia', label: 'Psicodelia' },
  { value: 'Pop/Rock', label: 'Pop/Rock' },
  { value: 'Punk Rock', label: 'Punk Rock' },
  { value: 'Rock', label: 'Rock' },
  { value: 'Rock Alternativo', label: 'Rock Alternativo' },
  { value: 'Reggae', label: 'Reggae' },
  { value: 'Rap', label: 'Rap' },
  { value: 'Reggaeton', label: 'Reggaeton' },
  { value: 'Sertanejo', label: 'Sertanejo' },
  { value: 'Samba', label: 'Samba' },
  { value: 'Samba Enredo', label: 'Samba Enredo' },
  { value: 'Soul', label: 'Soul' },
  { value: 'Trap', label: 'Trap' },
];

const opcoesLocais = [
  { value: 'Sem informação', label: 'Sem essa informação' },
  { value: 'Padaria', label: 'Padaria' },
  { value: 'Restaurante', label: 'Restaurante' },
  { value: 'Lanchonete', label: 'Lanchonete' },
  { value: 'Baladas', label: 'Baladas' },
  { value: 'Hamburgueria', label: 'Hamburgueria' },
  { value: 'Bar', label: 'Bar' },
  { value: 'Pub', label: 'Pub' },
  { value: 'Comida étnica', label: 'Comida étnica' },
  { value: 'Cafeteria', label: 'Cafeteria' },
  { value: 'Cervejaria', label: 'Cervejaria' },
  { value: 'Doceria', label: 'Doceria' },
  { value: 'Bolaria e confeitaria', label: 'Bolaria e confeitaria' },
  { value: 'Sorveteria', label: 'Sorveteria' },
  { value: 'Pizzaria', label: 'Pizzaria' },
  { value: 'Churrascaria', label: 'Churrascaria' },
  { value: 'Bistrô', label: 'Bistrô' },
];

const opcoesHobbies = [
  { value: 'Sem informação', label: 'Sem essa informação' },
  { value: 'jogos de tabuleiro', label: 'Jogos de Tabuleiro' },
  { value: 'jogos de video game', label: 'Jogos de Video Game' },
  { value: 'leitura', label: 'Leitura' },
  { value: 'praticar esportes', label: 'Praticar Esportes' },
  { value: 'cantar', label: 'Cantar' },
  { value: 'dançar', label: 'Dançar' },
  { value: 'pintura', label: 'Pintura' },
  { value: 'fotografia', label: 'Fotografia' },
];

const opcoesAmbientes = [
  { value: 'Sem informação', label: 'Sem essa informação' },
  { value: 'rooftop', label: 'Rooftop' },
  { value: 'ar livre', label: 'Ar livre' },
  { value: 'fumódromo', label: 'Fumódromo' },
  { value: 'terraço', label: 'Terraço' },
  { value: 'melhores vistas', label: 'Melhores Vistas' },
  { value: 'intimista', label: 'Intimista' },
  { value: 'instagramável', label: 'Instagramável' },
  { value: 'temático', label: 'Temático' },
  { value: 'casual', label: 'Casual' },
  { value: 'praiano', label: 'Praiano' },
  { value: 'luxuoso', label: 'Luxuoso' },
  { value: 'speakeasy', label: 'Speakeasy' },
  { value: 'retro', label: 'Retro' },
];

const Step7Page = () => {
  const { handleNextStep, handlePreviousStep } = useProgress();
  const [formData, setFormData] = useState({
    hobbies: '',
    ambientes: '',
    local: '',
    estilosMusicais: ''
  });
  const [errors, setErrors] = useState({});
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);


  const validateFields = () => {
    let newErrors = {};
    let messages = [];
  
    if (!formData.hobbies || formData.hobbies === "Sem informação") {
      newErrors.hobbies = 'Campo obrigatório.';
      messages.push('Hobbies: Campo obrigatório.');
    }

    if (!formData.ambientes || formData.ambientes === "Sem informação") {
      newErrors.ambientes = 'Campo obrigatório.';
      messages.push('Tipo de Ambiente: Campo obrigatório.');
    }

    if (!formData.local || formData.local === "Sem informação") {
      newErrors.local = 'Campo obrigatório.';
      messages.push('Tipo de Local: Campo obrigatório.');
    }

    if (!formData.estilosMusicais || formData.estilosMusicais === "Sem informação") {
      newErrors.estilosMusicais = 'Campo obrigatório.';
      messages.push('Estilos Musicais: Campo obrigatório.');
    }
  
    // Verifica se existem erros
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setErrorMessages(messages);
      setShowErrorModal(true);
      return false;
    }
  
    // Se passou por todas as validações
    setShowErrorModal(false);
    setErrors({});
    return true;
  };
  
  const handleNext = () => {
    if (validateFields()) {
      handleNextStep();
    }
  };
  return (
    <>
    <Head>
      <title>Contato - AcheAi</title>
    </Head>
    <div className='formulario-cadastro'>
      <h1>Passo 7: Ambiente</h1>
      <Form>
          <Form.Group controlId="hobbies">
            <Form.Label>Hobbies</Form.Label>
            <Select
              options={opcoesHobbies} // Certifique-se de que este está definido corretamente
              value={opcoesHobbies.filter(opcao => formData.hobbies.includes(opcao.value))}
              onChange={options => setFormData({ ...formData, hobbies: options.map(option => option.value) })}
              isMulti
              isLoading
              isInvalid={!!errors.hobbies}
            />
            {/* Feedback de validação customizado, como mostrado acima */}
            {errors.hobbies && <div className="text-danger">{errors.hobbies}</div>}
          </Form.Group>

          <Form.Group controlId="ambientes">
            <Form.Label>Tipos de Ambiente</Form.Label>
            <Select
              options={opcoesAmbientes} // Certifique-se de que este está definido corretamente
              value={opcoesAmbientes.filter(opcao => formData.ambientes.includes(opcao.value))}
              onChange={options => setFormData({ ...formData, ambientes: options.map(option => option.value) })}
              isMulti
              isLoading
              isInvalid={!!errors.ambientes}
            />
            {/* Feedback de validação customizado, como mostrado acima */}
            {errors.ambientes && <div className="text-danger">{errors.ambientes}</div>}
          </Form.Group>

          <Form.Group controlId="locais">
            <Form.Label>Tipos de Locais</Form.Label>
            <Select
              options={opcoesLocais} // Certifique-se de que este está definido corretamente
              value={opcoesLocais.filter(opcao => formData.local.includes(opcao.value))}
              onChange={options => setFormData({ ...formData, local: options.map(option => option.value) })}
              isMulti
              isLoading
              isInvalid={!!errors.local}
            />
            {/* Feedback de validação customizado, como mostrado acima */}
            {errors.local && <div className="text-danger">{errors.local}</div>}
          </Form.Group>

          <Form.Group controlId="estilos">
            <Form.Label>Estilos Músicais</Form.Label>
            <Select
              options={opcoesEstilosMusicais} // Certifique-se de que este está definido corretamente
              value={opcoesEstilosMusicais.filter(opcao => formData.estilosMusicais.includes(opcao.value))}
              onChange={options => setFormData({ ...formData, estilosMusicais: options.map(option => option.value) })}
              isMulti
              isLoading
              isInvalid={!!errors.estilosMusicais}
            />
            {/* Feedback de validação customizado, como mostrado acima */}
            {errors.estilosMusicais && <div className="text-danger">{errors.estilosMusicais}</div>}
          </Form.Group>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
          <Button variant="secondary" onClick={handlePreviousStep}>Anterior</Button>
          <Button variant="primary" onClick={handleNext}>Próximo</Button>
        </div>
      </Form>
    </div>
    <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
        <Modal.Header>
          <Modal.Title>Preenchimento obrigatório</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Step7Page;
