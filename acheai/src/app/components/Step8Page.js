import { useProgress } from '../../app/contexts/ProgressContext';
import React, { useState } from 'react';
import Head from 'next/head';
import { Form, Button, Modal, Row, Col, Accordion, Card } from 'react-bootstrap';
import Select from 'react-select';
import { Tabs, Tab } from 'react-bootstrap';

// Componentes necessários para ícones, contexto e opções de cartão
import { FaRegTrashAlt, FaPlusCircle, FaChevronDown, FaChevronRight } from 'react-icons/fa';

const opcoesTiposCartao = [
  { value: 'Sem informação', label: 'Sem essa informação' },
  { value: 'dinheiro', label: 'Dinheiro' },
  { value: 'american express', label: 'American Express' },
  { value: 'banricompras', label: 'Banricompras' },
  { value: 'ben refeição', label: 'Ben Refeição' },
  { value: 'cooper card', label: 'Cooper Card' },
  { value: 'cheque', label: 'Cheque' },
  { value: 'diners', label: 'Diners' },
  { value: 'elo', label: 'Elo' },
  { value: 'hipercard', label: 'Hipercard' },
  { value: 'goodcard', label: 'Goodcard' },
  { value: 'mastercard', label: 'Mastercard' },
  { value: 'refeisul', label: 'Refeisul' },
  { value: 'ticket', label: 'Ticket' },
  { value: 'card', label: 'Card' },
  { value: 'vale alelo refeição', label: 'Vale Alelo Refeição' },
  { value: 'verocard', label: 'Verocard' },
  { value: 'visa', label: 'Visa' },
  { value: 'vr refeição', label: 'VR Refeição' },
  { value: 'sodexo', label: 'Sodexo' },
  { value: 'green card', label: 'Green Card' },
  { value: 'senff', label: 'Senff' },
  { value: 'cabal', label: 'Cabal' },
  { value: 'sorocred', label: 'Sorocred' },
  { value: 'sicredi', label: 'Sicredi' },
  { value: 'aura', label: 'Aura' },
  { value: 'discover', label: 'Discover' },
  { value: 'jcb', label: 'JCB' },
  { value: 'unionpay', label: 'UnionPay' },
  { value: 'maestro', label: 'Maestro' },
  { value: 'alelo cultura', label: 'Alelo Cultura' },
  { value: 'vr benefícios', label: 'VR Benefícios' },
  { value: 'vale cultura', label: 'Vale Cultura' },
  { value: 'paypal', label: 'PayPal' },
  { value: 'bitcoin', label: 'Bitcoin' },
  { value: 'pix', label: 'Pix' },
];


const diasDaSemana = [
  "segunda", "terca", "quarta",
  "quinta", "sexta", "sabado", "domingo", "feriados"
];

const Step8Page = () => {
  const { handleNextStep, handlePreviousStep } = useProgress();
  const [formData, setFormData] = useState({
    cartao: [],
    horarios_funcionamento: diasDaSemana.reduce((acc, dia) => ({
      ...acc,
      [dia]: { abertura: '', fechamento: '', pausa1: 'Não', inicio1: '', fim1: '', pausa2: 'Não', inicio2: '', fim2: '' }
    }), {})
  });

  const [horarioPadrao, setHorarioPadrao] = useState({
    abertura: '',
    fechamento: '',
    pausa1: 'Não',
    inicio1: '',
    fim1: '',
    pausa2: 'Não',
    inicio2: '',
    fim2: ''
  });

  const aplicarHorarioPadrao = () => {
    const novosHorarios = {};
    diasDaSemana.forEach(dia => {
      novosHorarios[dia] = { ...horarioPadrao };
    });
    setFormData({
      ...formData,
      horarios_funcionamento: novosHorarios
    });
  };

  const [errors, setErrors] = useState({});
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const handleHorarioChange = (dia, campo, valor) => {
    setFormData({
      ...formData,
      horarios_funcionamento: {
        ...formData.horarios_funcionamento,
        [dia]: {
          ...formData.horarios_funcionamento[dia],
          [campo]: valor
        }
      }
    });
  };

  const handleCartaoChange = selectedOption => {
    setFormData({
      ...formData,
      cartao: selectedOption ? selectedOption.map(option => option.value) : []
    });
  };

  const validateFields = () => {
    // Implemente sua lógica de validação aqui
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
        <h1>Passo 8: Horários de Funcionamento e Pagamento</h1>
        <Form>
          <div className="mb-3">
            <h4>Definir Horário e Pausas Padrão</h4>
            <Row>
              <Col md={6}>
                <Form.Group controlId="horarioPadraoAbertura">
                  <Form.Label>Abertura</Form.Label>
                  <Form.Control
                    type="time"
                    value={horarioPadrao.abertura}
                    onChange={(e) => setHorarioPadrao({ ...horarioPadrao, abertura: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="horarioPadraoFechamento">
                  <Form.Label>Fechamento</Form.Label>
                  <Form.Control
                    type="time"
                    value={horarioPadrao.fechamento}
                    onChange={(e) => setHorarioPadrao({ ...horarioPadrao, fechamento: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="inicioPausa1">
                  <Form.Label>Início Pausa 1</Form.Label>
                  <Form.Control
                    type="time"
                    value={horarioPadrao.inicio1}
                    onChange={(e) => setHorarioPadrao({ ...horarioPadrao, inicio1: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="fimPausa1">
                  <Form.Label>Fim Pausa 1</Form.Label>
                  <Form.Control
                    type="time"
                    value={horarioPadrao.fim1}
                    onChange={(e) => setHorarioPadrao({ ...horarioPadrao, fim1: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                <Button variant="info" onClick={aplicarHorarioPadrao} className="mb-3">Aplicar Horário Padrão a Todos os Dias</Button>
            </div>
          </div>
  
          <Tabs defaultActiveKey="segunda" className="mb-3">
          {diasDaSemana.map((dia) => (
            <Tab eventKey={dia} title={dia.charAt(0).toUpperCase() + dia.slice(1)} key={dia}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId={`abertura-${dia}`}>
                    <Form.Label>Abertura</Form.Label>
                    <Form.Control
                      type="time"
                      value={formData.horarios_funcionamento[dia].abertura}
                      onChange={(e) => handleHorarioChange(dia, 'abertura', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId={`fechamento-${dia}`}>
                    <Form.Label>Fechamento</Form.Label>
                    <Form.Control
                      type="time"
                      value={formData.horarios_funcionamento[dia].fechamento}
                      onChange={(e) => handleHorarioChange(dia, 'fechamento', e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId={`inicio1-${dia}`}>
                    <Form.Label>Início da Pausa</Form.Label>
                    <Form.Control
                      type="time"
                      value={formData.horarios_funcionamento[dia].inicio1}
                      onChange={(e) => handleHorarioChange(dia, 'inicio1', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId={`fim1-${dia}`}>
                    <Form.Label>Fim da Pausa</Form.Label>
                    <Form.Control
                      type="time"
                      value={formData.horarios_funcionamento[dia].fim1}
                      onChange={(e) => handleHorarioChange(dia, 'fim1', e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Tab>
          ))}
        </Tabs>
  
          <Form.Group controlId="cartao" className="mt-4">
            <Form.Label>Tipos de Cartão Aceitos</Form.Label>
            <Select
              isMulti
              name="cartoes"
              options={opcoesTiposCartao}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleCartaoChange}
              value={opcoesTiposCartao.filter(option => formData.cartao.includes(option.value))}
            />
          </Form.Group>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
            <Button variant="secondary" onClick={handlePreviousStep}>Anterior</Button>
            <Button variant="primary" onClick={handleNext}>Próximo</Button>
          </div>
        </Form>
      </div>
      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Preenchimento obrigatório</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErrorModal(false)}>Fechar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  
  
};

export default Step8Page;
