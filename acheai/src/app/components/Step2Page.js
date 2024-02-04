import React, { useState } from 'react';
import Head from 'next/head';
import { useProgress } from '../../app/contexts/ProgressContext';
import ReactSelect from 'react-select';
import { Modal, Button, Form } from 'react-bootstrap';

const Step2Page = () => {
  const { handleNextStep, handlePreviousStep } = useProgress();
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [rua, setRua] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [zona, setZona] = useState('');
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [cepError, setCepError] = useState(false);
  const [cepSuccess, setCepSuccess] = useState(false);

  const zonaOptions = [
    { value: 'Norte', label: 'Norte' },
    { value: 'Sul', label: 'Sul' },
    { value: 'Leste', label: 'Leste' },
    { value: 'Oeste', label: 'Oeste' },
    { value: 'Centro', label: 'Centro' },
  ];

  // Função para manipular a mudança no campo Telefone e validar imediatamente
  const handleTelefoneChange = (e) => {
    const novoTelefone = e.target.value;
    setTelefone(novoTelefone);

    // Limpa erro de Telefone ao começar a digitar novamente
    if (!novoTelefone) {
      setErrors(prevErrors => ({ ...prevErrors, telefone: '' }));
      return;
    }

    // Valida Telefone e atualiza o estado de erros conforme necessário
    if (!validarTelefone(novoTelefone)) {
      setErrors(prevErrors => ({ ...prevErrors, telefone: 'Número de telefone inválido.' }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, telefone: '' })); // Limpa o erro se o Telefone for válido
    }
  };

  // Função para manipular a mudança no campo CNPJ e validar imediatamente
  const handleCnpjChange = (e) => {
    const novoCnpj = e.target.value;
    setCnpj(novoCnpj);

    // Limpa erro de CNPJ ao começar a digitar novamente
    if (!novoCnpj) {
      setErrors(prevErrors => ({ ...prevErrors, cnpj: '' }));
      return;
    }

    // Valida CNPJ e atualiza o estado de erros conforme necessário
    if (!validarCNPJ(novoCnpj)) {
      setErrors(prevErrors => ({ ...prevErrors, cnpj: 'CNPJ inválido.' }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, cnpj: '' })); // Limpa o erro se o CNPJ for válido
    }
  };

  const handleCepBlur = async () => {
    if (cep.trim().length !== 8) {
      setCepError(true);
      setCepSuccess(false);
      setErrors(prev => ({ ...prev, cep: 'CEP inválido.' }));
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) throw new Error('Falha na busca do CEP');

      const data = await response.json();
      if (data.erro) throw new Error('CEP não encontrado');

      setCidade(data.localidade);
      setBairro(data.bairro);
      setRua(data.logradouro);
      setCepError(false);
      setCepSuccess(true);
      setErrors(prev => ({ ...prev, cep: '' }));
    } catch (error) {
      console.error(error);
      setCepError(true);
      setCepSuccess(false);
      setErrors(prev => ({ ...prev, cep: 'CEP não encontrado.' }));
    }
  };

  const validateFields = () => {
    const newErrors = {};
    const errorMessages = []; // Usar array para acumular mensagens de erro
  
    if (!nome) {
      newErrors.nome = 'Nome do estabelecimento é obrigatório.';
      errorMessages.push('Nome do estabelecimento é obrigatório.');
    }
    if (!cnpj) {
      newErrors.cnpj = 'CNPJ é obrigatório.';
      errorMessages.push('CNPJ é obrigatório.');
    }
    if (!validarCNPJ(cnpj)) { // Supondo que você já tenha a função validarCNPJ implementada
      newErrors.cnpj = 'CNPJ inválido.';
      errorMessages.push('CNPJ inválido.');
    }
    if (!email) {
      newErrors.email = 'E-mail é obrigatório.';
      errorMessages.push('E-mail é obrigatório.');
    }
    if (!telefone) {
      newErrors.telefone = 'Telefone é obrigatório.';
      errorMessages.push('Telefone é obrigatório.');
    }
    if (!validarTelefone(telefone)) { // Supondo que você já tenha a função validarTelefone implementada
      newErrors.telefone = 'Número de telefone inválido.';
      errorMessages.push('Número de telefone inválido.');
    }
    if (!rua) {
      newErrors.rua = 'Rua é obrigatória.';
      errorMessages.push('Rua é obrigatória.');
    }
    if (!cep) {
      newErrors.cep = 'CEP é obrigatório.';
      errorMessages.push('CEP é obrigatório.');
    }
    if (!cidade) {
      newErrors.cidade = 'Cidade é obrigatória.';
      errorMessages.push('Cidade é obrigatória.');
    }
    if (!bairro) {
      newErrors.bairro = 'Bairro é obrigatório.';
      errorMessages.push('Bairro é obrigatório.');
    }
    if (!zona) {
      newErrors.zona = 'Zona é obrigatória.';
      errorMessages.push('Zona é obrigatória.');
    }
  
    setErrors(newErrors);
    if (errorMessages.length > 0) {
      setModalMessage(errorMessages.join('<br/>')); // Junta as mensagens com <br/> para exibição no modal
      setShowModal(true);
      return false;
    }
    return true;
  };
  
  const handleNextStepClick = () => {
    if (!validateFields()) {
      return;
    }
    handleNextStep();
  };

  const getFieldErrorStyle = fieldName => errors[fieldName] ? { borderColor: 'red' } : {};

  return (
<>
  <Head>
    <title>Passo 2: Informações Gerais - AcheAi</title>
  </Head>
  <div className="formulario-cadastro">
    <h1>Passo 2: Informações Gerais</h1>
    <Form.Group>
      <Form.Label>Nome do Estabelecimento</Form.Label>
      <Form.Control
        type="text"
        placeholder="Nome do Estabelecimento"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        isInvalid={!!errors.nome}
      />
      <Form.Control.Feedback type="invalid">
        {errors.nome}
      </Form.Control.Feedback>
    </Form.Group>

    <Form.Group>
      <Form.Label>CNPJ</Form.Label>
      <Form.Control
        type="text"
        placeholder="CNPJ"
        value={cnpj}
        onChange={handleCnpjChange}
        isInvalid={!!errors.cnpj}
      />
      <Form.Control.Feedback type="invalid">
        {errors.cnpj}
      </Form.Control.Feedback>
    </Form.Group>

    <Form.Group>
      <Form.Label>E-mail</Form.Label>
      <Form.Control
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        isInvalid={!!errors.email}
      />
      <Form.Control.Feedback type="invalid">
        {errors.email}
      </Form.Control.Feedback>
    </Form.Group>

    <Form.Group>
      <Form.Label>Telefone</Form.Label>
      <Form.Control
        type="text" // Alterado de "email" para "text"
        placeholder="Telefone"
        value={telefone}
        onChange={handleTelefoneChange}
        isInvalid={!!errors.telefone}
      />
      <Form.Control.Feedback type="invalid">
        {errors.telefone}
      </Form.Control.Feedback>
    </Form.Group>

    <Form.Group>
      <Form.Label>CEP</Form.Label>
      <Form.Control
        type="text"
        placeholder="CEP"
        value={cep}
        onBlur={handleCepBlur}
        onChange={(e) => setCep(e.target.value)}
        isInvalid={!!errors.cep}
      />
      <Form.Control.Feedback type="invalid">
        {errors.cep}
      </Form.Control.Feedback>
    </Form.Group>

    <Form.Group>
      <Form.Label>Rua</Form.Label>
      <Form.Control
        type="text"
        placeholder="Rua"
        value={rua}
        onChange={(e) => setRua(e.target.value)}
        isInvalid={!!errors.rua}
      />
      <Form.Control.Feedback type="invalid">
        {errors.rua}
      </Form.Control.Feedback>
    </Form.Group>

    <Form.Group>
      <Form.Label>Cidade</Form.Label>
      <Form.Control
        type="text"
        placeholder="Cidade"
        value={cidade}
        readOnly={cepSuccess}
        isInvalid={!!errors.cidade}
      />
      <Form.Control.Feedback type="invalid">
        {errors.cidade}
      </Form.Control.Feedback>
    </Form.Group>

    <Form.Group>
      <Form.Label>Bairro</Form.Label>
      <Form.Control
        type="text"
        placeholder="Bairro"
        value={bairro}
        readOnly={cepSuccess}
        isInvalid={!!errors.bairro}
      />
      <Form.Control.Feedback type="invalid">
        {errors.bairro}
      </Form.Control.Feedback>
    </Form.Group>

    <Form.Group>
      <Form.Label>Zona</Form.Label>
      <ReactSelect
        classNamePrefix="react-select"
        options={zonaOptions}
        value={zonaOptions.find(option => option.value === zona)}
        onChange={(selectedOption) => setZona(selectedOption ? selectedOption.value : '')}
        placeholder="Selecione a Zona"
        styles={errors.zona ? { control: styles => ({ ...styles, borderColor: 'red', boxShadow: 'none' }) } : {}}
      />
      {errors.zona && <div style={{ color: 'red', marginTop: '0.5rem' }}>{errors.zona}</div>}
    </Form.Group>

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
      <Button variant="secondary" onClick={handlePreviousStep} style={{ marginRight: '10px' }}>Anterior</Button>
      <Button variant="primary" onClick={handleNextStepClick}>Próximo</Button>
    </div>
  </div>

  {/* Modal para mensagens de erro */}
  <Modal show={showModal} onHide={() => setShowModal(false)}>
    <Modal.Header>
      <Modal.Title>Preenchimento obrigatório</Modal.Title>
    </Modal.Header>
    <Modal.Body dangerouslySetInnerHTML={{ __html: modalMessage }} />
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowModal(false)}>
        Fechar
      </Button>
    </Modal.Footer>
  </Modal>
</>

  );
};

function validarTelefone(telefone) {
  const numeros = telefone.replace(/\D/g, ''); // Remove tudo que não é dígito
  return numeros.length === 10 || numeros.length === 11;
}

function validarCNPJ(cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj === '') return false;
  if (cnpj.length !== 14) return false;

  // Elimina CNPJs invalidos conhecidos
  if (/^(\d)\1{13}$/.test(cnpj)) return false;

  // Valida DVs
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  const digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado !== parseInt(digitos.charAt(0))) return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado !== parseInt(digitos.charAt(1))) return false;

  return true;
}

export default Step2Page;
