import React, { useState } from 'react';
import Head from 'next/head';
import { useProgress } from '../../app/contexts/ProgressContext';
import Select from 'react-select';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';

const Step3Page = () => {
  const { handleNextStep, handlePreviousStep } = useProgress();
  const [descricao, setDescricao] = useState('');
  const [taxaEntrada, setTaxaEntrada] = useState('');
  const [avaliacaoClientes, setAvaliacaoClientes] = useState(2.5); // Inicia com 0
  const [preco, setPreco] = useState('');
  const [nivel, setNivel] = useState('1');
  const [tiposEvento, setTiposEvento] = useState([]);
  const [errors, setErrors] = useState({});
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const tiposEventoOptions = [
    { value: "Sem informação", label: "Tipo de Evento: Sem essa informação" },
    { value: "beber e dançar", label: "Beber e dançar" },
    { value: "rolê geek", label: "Rolê geek" },
    { value: "conversar", label: "Conversar" },
    { value: "lugar romântico", label: "Lugar romântico" },
    { value: "rolê de amigos", label: "Rolê de amigos" },
    { value: "encontro familiar", label: "Encontro familiar" },
    { value: "aniversário", label: "Aniversário" },
    { value: "happy hour", label: "Happy Hour" },
    { value: "Home office", label: "Home Office" },
    { value: "assistir jogos", label: "Assistir Jogos" },
    { value: "sair sozinho/a", label: "Sair Sozinho/a" },
    { value: "brunches", label: "Brunches" },
    { value: "cabaré/boates", label: "Cabaré/Boates" },
    { value: "música ao vivo", label: "Música ao vivo" },
    { value: "para crianças", label: "Para crianças" },
    { value: "temáticos", label: "Temáticos" },
    { value: "karaokês", label: "Karaokês" },
    { value: "casas noturnas", label: "Casas noturnas" },
    { value: "LGBTQIA+", label: "LGBTQIA+" },
    { value: "primeiro encontro", label: "Primeiro encontro" },
    { value: "experiência gastronômica", label: "Experiência gastronômica" },
  ];

  // Função para renderizar as estrelas com base na avaliação
  const renderStars = (avaliacao) => {
    const totalStars = 5;
    const fullStars = Math.floor(avaliacao);
    const emptyStars = totalStars - fullStars;
    const decimalValue = avaliacao.toFixed(1);
  
    return (
      <>
        {'★'.repeat(fullStars)}
        {'☆'.repeat(emptyStars)}
        {` ${decimalValue}`}
      </>
    );
  };
  
  
  
  const handleTipoEventoChange = (selectedOptions) => {
    setTiposEvento(selectedOptions);
  };

  const validateFields = () => {
    let newErrors = {};
    let messages = [];
  
    if (!descricao) {
      newErrors = { ...newErrors, descricao: 'Descrição é obrigatória.' };
      messages.push('Descrição é obrigatória.');
    }
    if (taxaEntrada === '') {
      newErrors = { ...newErrors, taxaEntrada: 'Taxa de entrada é obrigatória.' };
      messages.push('Taxa de entrada é obrigatória.');
    }
    // Adicionando validação para avaliacaoClientes
    if (avaliacaoClientes === '') {
      newErrors = { ...newErrors, avaliacaoClientes: 'Avaliação dos clientes é obrigatória.' };
      messages.push('Avaliação dos clientes é obrigatória.');
    }
    // Adicionando validação para preco
    if (preco === '') {
      newErrors = { ...newErrors, preco: 'Faixa de preço é obrigatória.' };
      messages.push('Faixa de preço é obrigatória.');
    }
    // Adicionando validação para nivel
    if (nivel === '') {
      newErrors = { ...newErrors, nivel: 'Categoria do cliente é obrigatória.' };
      messages.push('Categoria do cliente é obrigatória.');
    }
    // Adicionando validação para tiposEvento
    if (tiposEvento.length === 0) {
      newErrors = { ...newErrors, tiposEvento: 'Pelo menos um tipo de evento deve ser selecionado.' };
      messages.push('Pelo menos um tipo de evento deve ser selecionado.');
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setErrorMessages(messages);
      setShowErrorModal(true);
      return false;
    }
  
    setErrors({}); // Limpar erros se tudo estiver correto
    setShowErrorModal(false);
    return true;
  };
  

  const handleNext = () => {
    if (validateFields()) {
      handleNextStep();
    }
  };
  // Código para renderizar o formulário com os novos campos
  return (
<>
  <Head>
      <title>Cadastro - AcheAi</title>
  </Head>
  <div className='formulario-cadastro'>
    <h1>Passo 3: Informações Adicionais</h1>
    <Form>
      <Form.Group>
        <Form.Label>Descrição</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descreva seu estabelecimento"
          style={{ minHeight: "150px" }} // Defina a altura mínima desejada aqui
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Tipo de Evento</Form.Label>
        <Select
          id="multiselectTiposEvento"
          isMulti
          options={tiposEventoOptions}
          classNamePrefix="select"
          onChange={handleTipoEventoChange}
          value={tiposEvento}
          placeholder="Selecione os tipos de evento"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Taxa de Entrada</Form.Label>
        <Form.Control
          as="select"
          value={taxaEntrada}
          onChange={(e) => setTaxaEntrada(e.target.value)}
        >
          <option value="">Selecione o tipo de entrada</option>
          <option value="Sem informação">Sem essa informação</option>
          <option value="Gratuita">Gratuita</option>
          <option value="Paga">Paga</option>
        </Form.Control>
      </Form.Group>

      <Form.Group as={Row} className="align-items-center">
          <Form.Label column sm={3}>
            Avaliação no Google
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              type="range"
              custom
              min="0"
              max="5"
              step="0.1"
              value={avaliacaoClientes}
              onChange={(e) => setAvaliacaoClientes(parseFloat(e.target.value))}
            />
          </Col>
          <Col sm={2} className="text-center">
            {renderStars(avaliacaoClientes)}
          </Col>
        </Form.Group>

      <Form.Group>
        <Form.Label>Faixa de Preço</Form.Label>
        <Form.Control
          as="select"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        >
          <option value="">Selecione o preço</option>
          <option value="1">Até R$30,00</option>
          <option value="2">De R$30 a R$60</option>
          <option value="3">De R$60 a R$150</option>
          <option value="4">De R$150 a R$300</option>
          <option value="5">Acima de R$300</option>
        </Form.Control>
      </Form.Group>

    <Form.Group>
      <Form.Label>Categoria do Restaurante</Form.Label>
      <Form.Control
        as="select"
        value={nivel}
        onChange={(e) => setNivel(e.target.value)}
        disabled={true} // Desabilita a seleção para torná-la não editável
      >
        <option value="">Selecione a categoria</option>
        <option value="1">Não verificado</option>
        <option value="2">Verificado</option>
        <option value="3">Ouro</option>
      </Form.Control>
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

export default Step3Page;
