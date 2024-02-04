import React, { useState } from 'react';
import Head from 'next/head';
import { useProgress } from '../../app/contexts/ProgressContext';
import Select, { components } from 'react-select';
import { Form, Button } from 'react-bootstrap';

const Step3Page = () => {
  const { currentStep, handleNextStep, handlePreviousStep } = useProgress();
  const [descricao, setDescricao] = useState('');
  const [taxaEntrada, setTaxaEntrada] = useState('');
  const [avaliacaoClientes, setAvaliacaoClientes] = useState('');
  const [preco, setPreco] = useState('');
  const [nivel, setNivel] = useState('');
  const [tiposEvento, setTiposEvento] = useState([]);

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

  const handleTipoEventoChange = (selectedOptions) => {
    setTiposEvento(selectedOptions);
  };

  // Código para renderizar o formulário com os novos campos
  return (
<>
  <Head>
    <title>Passo 3: Informações Adicionais - AcheAi</title>
  </Head>
  <div className='formulario-cadastro'>
    <h1>Passo 3: Informações Adicionais</h1>
    <Form>
      <Form.Group>
        <Form.Label>Descrição</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descreva seu estabelecimento"
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

      <Form.Group>
        <Form.Label>Estrelas do Google</Form.Label>
        <Form.Control
          as="select"
          value={avaliacaoClientes}
          onChange={(e) => setAvaliacaoClientes(e.target.value)}
        >
          <option value="">Avaliação dos Clientes</option>
          {/* Gerar opções de 0 a 5 em incrementos de 0.1 */}
          {[...Array(51).keys()].map(i => (
            <option key={i} value={(i / 10).toFixed(1)}>{(i / 10).toFixed(1)}</option>
          ))}
        </Form.Control>
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
        <Form.Label>Categoria do Cliente</Form.Label>
        <Form.Control
          as="select"
          value={nivel}
          onChange={(e) => setNivel(e.target.value)}
        >
          <option value="">Selecione a categoria</option>
          <option value="1">Não verificado</option>
          <option value="2">Verificado</option>
          <option value="3">Ouro</option>
        </Form.Control>
      </Form.Group>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
        <Button variant="secondary" onClick={handlePreviousStep}>Anterior</Button>
        <Button variant="primary" onClick={handleNextStep}>Próximo</Button>
      </div>
    </Form>
  </div>
</>

  );
};

export default Step3Page;
