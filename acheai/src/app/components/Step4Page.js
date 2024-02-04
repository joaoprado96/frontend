import React, { useState } from 'react';
import Head from 'next/head';
import { useProgress } from '../../app/contexts/ProgressContext';
import Select from 'react-select';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import { FaRegTrashAlt, FaPlusCircle } from 'react-icons/fa'; // Importe os ícones diretamente


const Step4Page = () => {
  const { handleNextStep, handlePreviousStep } = useProgress();
  const [cardapio, setCardapio] = useState('');
  const [culinariaSelecionada, setCulinariaSelecionada] = useState(null);
  const [estiloServicoSelecionado, setEstiloServicoSelecionado] = useState(null);
  const [errors, setErrors] = useState({});
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [premiacoes, setPremiacoes] = useState([]);
  const [novaPremiacao, setNovaPremiacao] = useState('');

  const adicionarPremiacao = () => {
    if (novaPremiacao.trim() !== '') {
      setPremiacoes([...premiacoes, novaPremiacao.trim()]);
      setNovaPremiacao('');
    }
  };

  const removerPremiacao = (index) => {
    const novaListaPremiacoes = [...premiacoes];
    novaListaPremiacoes.splice(index, 1);
    setPremiacoes(novaListaPremiacoes);
  };

  const opcoesCulinaria = [
    { value: "Sem informação", label: "Cozinha: Sem essa informação" },
    { value: "Africana", label: "Africana" },
    { value: "Alemã", label: "Alemã" },
    { value: "Americana", label: "Americana" },
    { value: "Árabe", label: "Árabe" },
    { value: "Brasileira", label: "Brasileira" },
    { value: "Baiana", label: "Baiana" },
    { value: "Nordestina", label: "Nordestina" },
    { value: "Gaúcha", label: "Gaúcha" },
    { value: "Amazônica", label: "Amazônica" },
    { value: "Mineira", label: "Mineira" },
    { value: "Paraense", label: "Paraense" },
    { value: "Chinesa", label: "Chinesa" },
    { value: "Contemporânea", label: "Contemporânea" },
    { value: "Coreana", label: "Coreana" },
    { value: "Espanhola", label: "Espanhola" },
    { value: "Francesa", label: "Francesa" },
    { value: "Grega", label: "Grega" },
    { value: "Indiana", label: "Indiana" },
    { value: "Italiana", label: "Italiana" },
    { value: "Japonesa", label: "Japonesa" },
    { value: "Mediterrânea", label: "Mediterrânea" },
    { value: "Mexicana", label: "Mexicana" },
    { value: "Portuguesa", label: "Portuguesa" },
    { value: "Tailandesa", label: "Tailandesa" },
    { value: "Turca", label: "Turca" },
    { value: "Vegetariana", label: "Vegetariana" },
    { value: "Vegana", label: "Vegana" },
    { value: "Mongol", label: "Mongol" },
    { value: "Filipina", label: "Filipina" },
    { value: "Irlandesa", label: "Irlandesa" },
    { value: "Marroquina", label: "Marroquina" },
    { value: "Peruana", label: "Peruana" },
    { value: "Russa", label: "Russa" },
    { value: "Sul-africana", label: "Sul-africana" },
    { value: "Vietnamita", label: "Vietnamita" },
    { value: "Cubana", label: "Cubana" },
    { value: "Havaiana", label: "Havaiana" },
    { value: "Polonesa", label: "Polonesa" },
    { value: "Tibetana", label: "Tibetana" },
  ];
  
  const opcoesEstiloServicos = [
    { value: "Sem informação", label: "Estilos de Serviço: Sem essa informação" },
    { value: "buffet", label: "Buffet" },
    { value: "à la carte", label: "À la Carte" },
    { value: "rodízio", label: "Rodízio" },
    { value: "serviço de entrega", label: "Serviço de Entrega" },
    { value: "self-service", label: "Self-Service" },
    { value: "drive-thru", label: "Drive-Thru" },
  ];
  
  const validateFields = () => {
    let newErrors = {};
    let messages = [];
  
    if (!cardapio) {
      newErrors = { ...newErrors, descricao: 'Cadápio é obrigatório.' };
      messages.push('Cadápio é obrigatório.');
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
    <h1>Passo 4: Gastronomia</h1>
    <Form>
      <Form.Group>
        <Form.Label>Cardápio</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          value={cardapio}
          onChange={(e) => setCardapio(e.target.value)}
          placeholder="Insira aqui o link do seu cardápio"
          style={{ minHeight: "100px" }} // Defina a altura mínima desejada aqui
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Culinária</Form.Label>
        <Select
          options={opcoesCulinaria}
          value={culinariaSelecionada}
          onChange={(selectedOption) => setCulinariaSelecionada(selectedOption)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Estilo de Serviços</Form.Label>
        <Select
          options={opcoesEstiloServicos}
          value={estiloServicoSelecionado}
          onChange={(selectedOption) => setEstiloServicoSelecionado(selectedOption)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Premiações</Form.Label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            value={novaPremiacao}
            onChange={(e) => setNovaPremiacao(e.target.value)}
            placeholder="Insira uma premiação"
            style={{
              flex: 1,
              marginRight: '10px',
              padding: '5px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
          <Button
            type="button" // Defina o tipo de botão como "button"
            onClick={adicionarPremiacao}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <FaPlusCircle
              style={{
                fontSize: '24px',
                color: 'green',
                cursor: 'pointer',
              }}
            />
            <span
              style={{
                marginLeft: '5px',
                color: 'green',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Adicionar
            </span>
          </Button>
        </div>
      </Form.Group>

      <div>
        {premiacoes.map((premiacao, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '5px',
            }}
          >
            {premiacao}
            <button
              type="button" // Defina o tipo de botão como "button"
              onClick={() => adicionarPremiacao(index)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                marginLeft: '10px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <FaRegTrashAlt
                style={{
                  fontSize: '20px',
                  color: 'red',
                  cursor: 'pointer',
                }}
              />
              <span
                style={{
                  marginLeft: '5px',
                  color: 'red',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                Remover
              </span>
            </button>

          </div>
        ))}
      </div>

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

export default Step4Page;
