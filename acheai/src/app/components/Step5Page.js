import React, { useState } from 'react';
import Head from 'next/head';
import { useProgress } from '../../app/contexts/ProgressContext';
import Select from 'react-select';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import { FaRegTrashAlt, FaPlusCircle } from 'react-icons/fa'; // Importe os ícones diretamente

const opcoesAcessibilidade = [
  { value: "Sem informação", label: "Acessibilidade: Sem essa informação" },
  { value: "Banheiro acessível", label: "Banheiro acessível" },
  { value: "Cardápio em braile", label: "Cardápio em braile" },
  { value: "Entrada de cão-guia", label: "Entrada de cão-guia" },
  { value: "Vagas especiais", label: "Vagas especiais" },
  { value: "Rampas de acesso", label: "Rampas de acesso" },
  { value: "Espaço adequado para cadeira de rodas", label: "Espaço adequado para cadeira de rodas" },
  { value: "Interpretação em libras", label: "Interpretação em Libras" },
  { value: "Sinalização em braile", label: "Sinalização em Braile" },
  { value: "Equipamentos de audiodescrição", label: "Equipamentos de audiodescrição" },
  { value: "Assentos reservados", label: "Assentos reservados" },
  { value: "Corrimãos e suportes", label: "Corrimãos e suportes" },
  { value: "Pisos táteis", label: "Pisos táteis" },
  { value: "Luzes de alerta para surdos", label: "Luzes de alerta para surdos" },
  { value: "Software de leitura de tela", label: "Software de leitura de tela" },
  { value: "Material informativo em formatos acessíveis", label: "Material informativo em formatos acessíveis" },
  { value: "Assistência pessoal", label: "Assistência pessoal" },
  { value: "Estacionamento acessível ampliado", label: "Estacionamento acessível ampliado" },
  { value: "Altura acessível", label: "Altura acessível" },
  { value: "Sistemas de loop indutivo", label: "Sistemas de loop indutivo" },
  { value: "Sinalização visual clara", label: "Sinalização visual clara" },
  { value: "Áreas de descanso", label: "Áreas de descanso" },
];

const opcoesMusica = [
  { value: 'Sim', label: 'Sim' },
  { value: 'Não', label: 'Não' },
  { value: 'Sem informação', label: 'Sem essa informação' }
];

const opcoesEstacionamento = [
  { value: 'Sim', label: 'Sim' },
  { value: 'Não', label: 'Não' },
  { value: 'Sem informação', label: 'Sem essa informação' }
];

const opcoesGenericas = [
  { value: 'Sim', label: 'Sim' },
  { value: 'Não', label: 'Não' },
  { value: 'Sem informação', label: 'Sem essa informação' }
];

const Step5Page = () => {
  const { handleNextStep, handlePreviousStep } = useProgress();
  const [formData, setFormData] = useState({
    musica: '',
    estacionamento: '',
    kids: '',
    pet: '',
    glutenfree: '',
    lactosefree: '',
    link_pagina: '',
    website: '',
    acessibilidade: [],
  });
  const [errors, setErrors] = useState({});
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const handleChange = (e) => {
    const { id, value, selectedOptions } = e.target;
    if (id === 'multiselectAcessibilidade') {
      const values = Array.from(selectedOptions).map(opt => opt.value);
      setFormData(prevState => ({ ...prevState, acessibilidade: values }));
    } else {
      setFormData(prevState => ({ ...prevState, [id]: value }));
    }
  };

  const validateFields = () => {
    let newErrors = {};
    let messages = [];
  
    // Validação para Música ao Vivo
    if (!formData.musica || formData.musica === "Sem informação") {
      newErrors.musica = 'Campo obrigatório.';
      messages.push('Música ao vivo: Campo obrigatório.');
    }
  
    // Validação para Estacionamento
    if (!formData.estacionamento || formData.estacionamento === "Sem informação") {
      newErrors.estacionamento = 'Campo obrigatório.';
      messages.push('Estacionamento: Campo obrigatório.');
    }
  
    // Validação para Espaço Kids
    if (!formData.kids || formData.kids === "Sem informação") {
      newErrors.kids = 'Campo obrigatório.';
      messages.push('Espaço Kids: Campo obrigatório.');
    }
  
    // Validação para Pet Friendly
    if (!formData.pet || formData.pet === "Sem informação") {
      newErrors.pet = 'Campo obrigatório.';
      messages.push('Pet Friendly: Campo obrigatório.');
    }
  
    // Validação para Gluten Free
    if (!formData.glutenfree || formData.glutenfree === "Sem informação") {
      newErrors.glutenfree = 'Campo obrigatório.';
      messages.push('Gluten Free: Campo obrigatório.');
    }
  
    // Validação para Lactose Free
    if (!formData.lactosefree || formData.lactosefree === "Sem informação") {
      newErrors.lactosefree = 'Campo obrigatório.';
      messages.push('Lactose Free: Campo obrigatório.');
    }
  
    // Validação para Link da Página
    if (!formData.link_pagina.trim()) {
      newErrors.link_pagina = 'Campo obrigatório.';
      messages.push('Link da Página: Campo obrigatório.');
    }
  
    // Validação para Website
    if (!formData.website.trim()) {
      newErrors.website = 'Campo obrigatório.';
      messages.push('Website: Campo obrigatório.');
    }
  
    // Validação para Acessibilidade
    if (formData.acessibilidade.length === 0 || formData.acessibilidade.includes("Sem informação")) {
      newErrors.acessibilidade = 'Selecione pelo menos uma opção de acessibilidade.';
      messages.push('Acessibilidade: Selecione pelo menos uma opção válida.');
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

  const handleChangeSelect = (selectedOption, { name }) => {
    setFormData({
      ...formData,
      [name]: selectedOption.value
    });
  };

  return (
    <>
      <Head>
          <title>Cadastro - AcheAi</title>
      </Head>
      <div className='formulario-cadastro'>
        <h1>Passo 5: Informações úteis</h1>
        <Form>
        <Form.Group controlId="musica">
          <Form.Label>Música ao Vivo</Form.Label>
          <Select
            name="musica"
            options={opcoesMusica}
            value={opcoesMusica.find(option => option.value === formData.musica)}
            onChange={handleChangeSelect}
            className={errors.musica ? 'is-invalid' : ''}
          />
          {errors.musica && (
            <div className="text-danger">{errors.musica}</div>
          )}
        </Form.Group>

        <Form.Group controlId="estacionamento">
          <Form.Label>Estacionamento</Form.Label>
          <Select
            name="estacionamento"
            options={opcoesEstacionamento}
            value={opcoesEstacionamento.find(option => option.value === formData.estacionamento)}
            onChange={handleChangeSelect}
            className={errors.estacionamento ? 'is-invalid' : ''}
          />
          {errors.estacionamento && (
            <div className="text-danger">{errors.estacionamento}</div>
          )}
        </Form.Group>
  
        <Form.Group controlId="kids">
          <Form.Label>Espaço Kids</Form.Label>
          <Select
            name="kids"
            options={opcoesGenericas}
            value={opcoesGenericas.find(option => option.value === formData.kids)}
            onChange={handleChangeSelect}
            classNamePrefix={errors.kids ? 'is-invalid' : ''}
          />
          {errors.kids && <div className="text-danger">{errors.kids}</div>}
        </Form.Group>

        <Form.Group controlId="pet">
          <Form.Label>Pet Friendly</Form.Label>
          <Select
            name="pet"
            options={opcoesGenericas}
            value={opcoesGenericas.find(option => option.value === formData.pet)}
            onChange={handleChangeSelect}
            classNamePrefix={errors.pet ? 'is-invalid' : ''}
          />
          {errors.pet && <div className="text-danger">{errors.pet}</div>}
        </Form.Group>

        <Form.Group controlId="glutenfree">
          <Form.Label>Gluten Free</Form.Label>
          <Select
            name="glutenfree"
            options={opcoesGenericas}
            value={opcoesGenericas.find(option => option.value === formData.glutenfree)}
            onChange={handleChangeSelect}
            classNamePrefix={errors.glutenfree ? 'is-invalid' : ''}
          />
          {errors.glutenfree && <div className="text-danger">{errors.glutenfree}</div>}
        </Form.Group>  

          {/* Lactose Free */}
        <Form.Group controlId="lactosefree">
          <Form.Label>Lactose Free</Form.Label>
          <Select
            name="lactosefree"
            options={opcoesGenericas}
            value={opcoesGenericas.find(option => option.value === formData.lactosefree)}
            onChange={(selectedOption) => setFormData({ ...formData, lactosefree: selectedOption ? selectedOption.value : '' })}
            classNamePrefix={errors.lactosefree ? 'is-invalid' : ''}
          />
          {errors.lactosefree && <div className="text-danger">{errors.lactosefree}</div>}
        </Form.Group>
  
        {/* Link da Página */}
        <Form.Group controlId="link_pagina">
          <Form.Label>Link da Página</Form.Label>
          <Form.Control type="text" placeholder="Link da Página" value={formData.link_pagina} onChange={handleChange} isInvalid={!!errors.link_pagina} />
          <Form.Control.Feedback type="invalid">{errors.link_pagina}</Form.Control.Feedback>
        </Form.Group>
  
        {/* Website */}
        <Form.Group controlId="website">
          <Form.Label>Website</Form.Label>
          <Form.Control type="text" placeholder="Website" value={formData.website} onChange={handleChange} isInvalid={!!errors.website} />
          <Form.Control.Feedback type="invalid">{errors.website}</Form.Control.Feedback>
        </Form.Group>
  
        {/* Acessibilidade */}
        <Form.Group controlId="multiselectAcessibilidade">
          <Form.Label>Acessibilidade</Form.Label>
          <Select
            options={opcoesAcessibilidade} // Certifique-se de que este está definido corretamente
            value={opcoesAcessibilidade.filter(opcao => formData.acessibilidade.includes(opcao.value))}
            onChange={options => setFormData({ ...formData, acessibilidade: options.map(option => option.value) })}
            isMulti
            isInvalid={!!errors.acessibilidade}
          />
          {/* Feedback de validação customizado, como mostrado acima */}
          {errors.acessibilidade && <div className="text-danger">{errors.acessibilidade}</div>}
        </Form.Group>
  
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
          <Button variant="secondary" onClick={handlePreviousStep}>Anterior</Button>
          <Button variant="primary" onClick={handleNext}>Próximo</Button>
        </div>
      </Form>
    </div>
  
      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Erros de Validação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessages.map((message, index) => <p key={index}>{message}</p>)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErrorModal(false)}>Fechar</Button>
        </Modal.Footer>
      </Modal>
  </>
  );  
};

export default Step5Page;
