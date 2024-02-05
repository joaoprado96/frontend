import React, { useState } from 'react';
import Head from 'next/head';
import { useProgress } from '../../app/contexts/ProgressContext';
import Select from 'react-select';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import { FaRegTrashAlt, FaPlusCircle } from 'react-icons/fa'; // Importe os ícones diretamente

const opcoesLinhasMetro = [
  { value: 'Linha 1 (Azul)', label: 'Linha 1 (Azul)' },
  { value: 'Linha 2 (Verde)', label: 'Linha 2 (Verde)' },
  { value: 'Linha 3 (Vermelha)', label: 'Linha 3 (Vermelha)' },
  { value: 'Linha 4 (Amarela)', label: 'Linha 4 (Amarela)' },
  { value: 'Linha 5 (Lilás)', label: 'Linha 5 (Lilás)' },
  { value: 'Linha 7 (Rubi)', label: 'Linha 7 (Rubi)' },
  { value: 'Linha 8 (Diamante)', label: 'Linha 8 (Diamante)' },
  { value: 'Linha 9 (Esmeralda)', label: 'Linha 9 (Esmeralda)' },
  { value: 'Linha 10 (Turquesa)', label: 'Linha 10 (Turquesa)' },
  { value: 'Linha 11 (Coral)', label: 'Linha 11 (Coral)' },
  { value: 'Linha 12 (Safira)', label: 'Linha 12 (Safira)' },
  { value: 'Linha 13 (Jade)', label: 'Linha 13 (Jade)' },
  { value: 'Linha 15 (Prata)', label: 'Linha 15 (Prata)' },
];

const opcoesEstacoesMetro = [
  {
    value: 'Sem informação',
    label: 'Estação: Sem essa informação',
  },
  {
    value: 'Linha 1 (Azul)',
    label: 'Linha 1 (Azul)',
    stations: [
      'Jabaquara',
      'Conceição',
      'São Judas',
      'Saúde',
      'Praça da Árvore',
      'Santa Cruz',
      'Vila Mariana',
      'Ana Rosa',
      'Paraíso',
      'Vergueiro',
      'São Joaquim',
      'Japão-Liberdade',
      'Sé',
      'São Bento',
      'Luz',
      'Tiradentes',
      'Armênia',
      'Portuguesa-Tietê',
      'Carandiru',
      'Santana',
      'Jardim São Paulo-Ayrton Senna',
      'Parada Inglesa',
      'Tucuruvi',
    ],
  },
  {
    value: 'Linha 2 (Verde)',
    label: 'Linha 2 (Verde)',
    stations: [
      'Vila Prudente',
      'Tamanduateí',
      'Sacomã',
      'Alto do Ipiranga',
      'Santos-Imigrantes',
      'Chácara Klabin',
      'Ana Rosa',
      'Paraíso',
      'Brigadeiro',
      'Trianon-Masp',
      'Consolação',
      'Clínicas',
      'S. N. Sra. de Fátima-Sumaré',
      'Vila Madalena',
    ],
  },
  {
    value: 'Linha 3 (Vermelha)',
    label: 'Linha 3 (Vermelha)',
    stations: [
      'Corinthians-Itaquera',
      'Artur Alvim',
      'Patriarca-Vila Ré',
      'Guilhermina-Esperança',
      'Vila Matilde',
      'Penha',
      'Carrão-Assaí Atacadista',
      'Tatuapé',
      'Belém',
      'Bresser-Mooca',
      'Brás',
      'Pedro II',
      'Sé',
      'Anhangabaú',
      'República',
      'Santa Cecília',
      'Marechal Deodoro',
      'Palmeiras-Barra Funda',
    ],
  },
  {
    value: 'Linha 4 (Amarela)',
    label: 'Linha 4 (Amarela)',
    stations: [
      'Luz',
      'República',
      'Higienópolis-Mackenzie',
      'Paulista',
      'Oscar Freire',
      'Fradique Coutinho',
      'Faria Lima',
      'Pinheiros',
      'Butantã',
      'São Paulo-Morumbi',
      'Vila Sônia',
    ],
  },
  {
    value: 'Linha 5 (Lilás)',
    label: 'Linha 5 (Lilás)',
    stations: [
      'Capão Redondo',
      'Campo Limpo',
      'Vila das Belezas',
      'Giovanni Gronchi',
      'Santo Amaro',
      'Largo Treze',
      'Adolfo Pinheiro',
      'Alto da Boa Vista',
      'Borba Gato',
      'Brooklin',
      'Campo Belo',
      'Eucaliptos',
      'Moema',
      'AACD-Servidor',
      'Hospital São Paulo',
      'Santa Cruz',
      'Chácara Klabin',
    ],
  },
  {
    value: 'Linha 7 (Rubi)',
    label: 'Linha 7 (Rubi)',
    stations: [
      'Brás',
      'Luz',
      'Palmeiras-Barra Funda',
      'Água Branca',
      'Lapa',
      'Piqueri',
      'Pirituba',
      'Vila Clarice',
      'Vila Aurora',
      'Perus',
      'Caieiras',
      'Franco da Rocha',
      'Baltazar Fidélis',
    ],
  },
  {
    value: 'Linha 8 (Diamante)',
    label: 'Linha 8 (Diamante)',
    stations: [
      'Júlio Prestes',
      'Palmeiras-Barra Funda',
      'Lapa',
      'Domingos de Moraes',
      'Imperatriz Leopoldina',
      'Presidente Altino',
      'Osasco',
      'Comandante Sampaio',
      'Quitaúna',
      'General Miguel Costa',
      'Carapicuíba',
      'Santa Terezinha',
      'Antônio João',
      'Barueri',
      'Jardim Belval',
      'Jardim Silveira',
      'Jandira',
      'Sagrado Coração',
      'Engenheiro Cardoso',
      'Itapevi',
      'Amador Bueno',
    ],
  },
  {
    value: 'Linha 9 (Esmeralda)',
    label: 'Linha 9 (Esmeralda)',
    stations: [
      'Osasco',
      'Presidente Altino',
      'Ceasa',
      'Villa-Lobos-Jaguaré',
      'Cidade Universitária',
      'Pinheiros',
      'Hebraica-Rebouças',
      'Cidade Jardim',
      'Vila Olímpia',
      'Berrini',
      'Morumbi',
      'Granja Julieta',
      'Santo Amaro',
      'Socorro',
      'Jurubatuba',
      'Autódromo',
      'Interlagos',
      'Grajaú',
    ],
  },
  {
    value: 'Linha 10 (Turquesa)',
    label: 'Linha 10 (Turquesa)',
    stations: [
      'Brás',
      'Juventus Mooca',
      'Ipiranga',
      'Tamanduateí',
      'São Caetano do Sul',
      'Utinga',
      'Pref Saladino',
      'Capuava',
      'Mauá',
      'Guapituba',
      'Ribeirão Pires',
      'Rio Grande da Serra',
    ],
  },
  {
    value: 'Linha 11 (Coral)',
    label: 'Linha 11 (Coral)',
    stations: [
      'Brás',
      'Juventus Mooca',
      'Ipiranga',
      'Tamanduateí',
      'São Caetano do Sul',
      'Utinga',
      'Pref Saladino',
      'Capuava',
      'Mauá',
      'Guapituba',
      'Ribeirão Pires',
      'Rio Grande da Serra',
    ],
  },
  {
    value: 'Linha 12 (Safira)',
    label: 'Linha 12 (Safira)',
    stations: [
      'Brás',
      'Tatuapé',
      'Engº Goulart',
      'Usp Leste',
      'Comendador Ermelino',
      'São Miguel Paulista',
      'Jardim Helena Vila Mara',
      'Itaim Paulista',
      'Jardim Romano',
      'Eng Manoel Feio',
      'Itaquaquecetuba',
      'Aracaré',
      'Calmon Viana',
    ],
  },
  {
    value: 'Linha 13 (Jade)',
    label: 'Linha 13 (Jade)',
    stations: [
      'Aeroporto-Guarulhos',
      'Guarulhos-Cecap',
      'Eng. Goulart',
    ],
  },
  {
    value: 'Linha 15 (Prata)',
    label: 'Linha 15 (Prata)',
    stations: [
      'Vila Prudente',
      'Oratório',
      'São Lucas',
      'Camilo Haddad',
      'Vila Tolstói',
      'Vila União',
      'Jardim Planalto',
      'Sapopemba',
      'Fazenda da Juta',
      'São Mateus',
      'Jardim Colonial',
    ],
  },
];


const Step6Page = () => {
  const { handleNextStep, handlePreviousStep } = useProgress();
  const [formData, setFormData] = useState({
    linhasMetro: '',
    estacoesMetro: '',
  });
  const [errors, setErrors] = useState({});
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  function organizarEstacoesPorLinha(opcoesEstacoesMetro) {
    const estacoesPorLinha = {};
  
    opcoesEstacoesMetro.forEach(estacao => {
      const linha = estacao.label.split(' - ')[0]; // Obtém o nome da linha a partir do label da estação
      if (!estacoesPorLinha[linha]) {
        estacoesPorLinha[linha] = [];
      }
      estacoesPorLinha[linha].push(estacao.value);
    });
  
    return estacoesPorLinha;
  }
  
  const estacoesOrganizadas = organizarEstacoesPorLinha(opcoesEstacoesMetro);

  const validateFields = () => {
    let newErrors = {};
    let messages = [];
  
    // Validação para Música ao Vivo
    if (!formData.linhasMetro || formData.linhasMetro === "Sem informação") {
      newErrors.linhasMetro = 'Campo obrigatório.';
      messages.push('Linhas de Metro: Campo obrigatório.');
    }
  
    // Validação para Estacionamento
    if (!formData.estacoesMetro || formData.estacoesMetro === "Sem informação") {
      newErrors.estacoesMetro = 'Campo obrigatório.';
      messages.push('Estações de Metro: Campo obrigatório.');
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
        <h1>Passo 6: Informações de Localização</h1>
        <Form>
          <Form.Group controlId="linhasMetro">
            <Form.Label>Linhas de Metro</Form.Label>
            <Select
              name="linhasMetro"
              options={opcoesLinhasMetro}
              value={opcoesLinhasMetro.find(option => option.value === formData.linhasMetro)}
              onChange={handleChangeSelect}
              className={errors.linhasMetro ? 'is-invalid' : ''}
            />
            {errors.linhasMetro && (
              <div className="text-danger">{errors.linhasMetro}</div>
            )}
          </Form.Group>

          <Form.Group controlId="estacoesMetro">
            <Form.Label>Estações de Metro</Form.Label>
            <Select
              name="estacoesMetro"
              options={estacoesOrganizadas}
              value={opcoesEstacoesMetro.find(option => option.station === formData.estacoesMetro)}
              onChange={(selectedOption) => {
                // Você pode acessar a opção selecionada usando selectedOption
                // Por exemplo, selectedOption.value ou selectedOption.label
                handleChangeSelect(selectedOption.value); // Certifique-se de que esta função trata o valor corretamente
              }}
              className={errors.estacoesMetro ? 'is-invalid' : ''}
            />
            {errors.estacoesMetro && (
              <div className="text-danger">{errors.estacoesMetro}</div>
            )}
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

export default Step6Page;
