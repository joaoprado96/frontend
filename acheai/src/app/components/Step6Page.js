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

const opcoesestacoesMetro = [
  { value: "Jabaquara", label: "Jabaquara" },
  { value: "Conceição", label: "Conceição" },
  { value: "São Judas", label: "São Judas" },
  { value: "Saúde", label: "Saúde" },
  { value: "Praça da Árvore", label: "Praça da Árvore" },
  { value: "Santa Cruz", label: "Santa Cruz" },
  { value: "Vila Mariana", label: "Vila Mariana" },
  { value: "Ana Rosa", label: "Ana Rosa" },
  { value: "Paraíso", label: "Paraíso" },
  { value: "Vergueiro", label: "Vergueiro" },
  { value: "São Joaquim", label: "São Joaquim" },
  { value: "Japão-Liberdade", label: "Japão-Liberdade" },
  { value: "Sé", label: "Sé" },
  { value: "São Bento", label: "São Bento" },
  { value: "Luz", label: "Luz" },
  { value: "Tiradentes", label: "Tiradentes" },
  { value: "Armênia", label: "Armênia" },
  { value: "Portuguesa-Tietê", label: "Portuguesa-Tietê" },
  { value: "Carandiru", label: "Carandiru" },
  { value: "Santana", label: "Santana" },
  { value: "Jardim São Paulo-Ayrton Senna", label: "Jardim São Paulo-Ayrton Senna" },
  { value: "Parada Inglesa", label: "Parada Inglesa" },
  { value: "Tucuruvi", label: "Tucuruvi" },
  { value: "Vila Prudente", label: "Vila Prudente" },
  { value: "Tamanduateí", label: "Tamanduateí" },
  { value: "Sacomã", label: "Sacomã" },
  { value: "Alto do Ipiranga", label: "Alto do Ipiranga" },
  { value: "Santos-Imigrantes", label: "Santos-Imigrantes" },
  { value: "Chácara Klabin", label: "Chácara Klabin" },
  { value: "Ana Rosa", label: "Ana Rosa" },
  { value: "Paraíso", label: "Paraíso" },
  { value: "Brigadeiro", label: "Brigadeiro" },
  { value: "Trianon-Masp", label: "Trianon-Masp" },
  { value: "Consolação", label: "Consolação" },
  { value: "Clínicas", label: "Clínicas" },
  { value: "S. N. Sra. de Fátima-Sumaré", label: "S. N. Sra. de Fátima-Sumaré" },
  { value: "Vila Madalena", label: "Vila Madalena" },
  { value: "Corinthians-Itaquera", label: "Corinthians-Itaquera" },
  { value: "Artur Alvim", label: "Artur Alvim" },
  { value: "Patriarca-Vila Ré", label: "Patriarca-Vila Ré" },
  { value: "Guilhermina-Esperança", label: "Guilhermina-Esperança" },
  { value: "Vila Matilde", label: "Vila Matilde" },
  { value: "Penha", label: "Penha" },
  { value: "Carrão-Assaí Atacadista", label: "Carrão-Assaí Atacadista" },
  { value: "Tatuapé", label: "Tatuapé" },
  { value: "Belém", label: "Belém" },
  { value: "Bresser-Mooca", label: "Bresser-Mooca" },
  { value: "Brás", label: "Brás" },
  { value: "Pedro II", label: "Pedro II" },
  { value: "Sé", label: "Sé" },
  { value: "Anhangabaú", label: "Anhangabaú" },
  { value: "República", label: "República" },
  { value: "Santa Cecília", label: "Santa Cecília" },
  { value: "Marechal Deodoro", label: "Marechal Deodoro" },
  { value: "Palmeiras-Barra Funda", label: "Palmeiras-Barra Funda" },
  { value: "Luz", label: "Luz" },
  { value: "República", label: "República" },
  { value: "Higienópolis-Mackenzie", label: "Higienópolis-Mackenzie" },
  { value: "Paulista", label: "Paulista" },
  { value: "Oscar Freire", label: "Oscar Freire" },
  { value: "Fradique Coutinho", label: "Fradique Coutinho" },
  { value: "Faria Lima", label: "Faria Lima" },
  { value: "Pinheiros", label: "Pinheiros" },
  { value: "Butantã", label: "Butantã" },
  { value: "São Paulo-Morumbi", label: "São Paulo-Morumbi" },
  { value: "Vila Sônia", label: "Vila Sônia" },
  { value: "Capão Redondo", label: "Capão Redondo" },
  { value: "Campo Limpo", label: "Campo Limpo" },
  { value: "Vila das Belezas", label: "Vila das Belezas" },
  { value: "Giovanni Gronchi", label: "Giovanni Gronchi" },
  { value: "Santo Amaro", label: "Santo Amaro" },
  { value: "Largo Treze", label: "Largo Treze" },
  { value: "Adolfo Pinheiro", label: "Adolfo Pinheiro" },
  { value: "Alto da Boa Vista", label: "Alto da Boa Vista" },
  { value: "Borba Gato", label: "Borba Gato" },
  { value: "Brooklin", label: "Brooklin" },
  { value: "Campo Belo", label: "Campo Belo" },
  { value: "Eucaliptos", label: "Eucaliptos" },
  { value: "Moema", label: "Moema" },
  { value: "AACD-Servidor", label: "AACD-Servidor" },
  { value: "Hospital São Paulo", label: "Hospital São Paulo" },
  { value: "Santa Cruz", label: "Santa Cruz" },
  { value: "Chácara Klabin", label: "Chácara Klabin" },
  { value: "Brás", label: "Brás" },
  { value: "Luz", label: "Luz" },
  { value: "Palmeiras-Barra Funda", label: "Palmeiras-Barra Funda" },
  { value: "Água Branca", label: "Água Branca" },
  { value: "Lapa", label: "Lapa" },
  { value: "Piqueri", label: "Piqueri" },
  { value: "Pirituba", label: "Pirituba" },
  { value: "Vila Clarice", label: "Vila Clarice" },
  { value: "Vila Aurora", label: "Vila Aurora" },
  { value: "Perus", label: "Perus" },
  { value: "Caieiras", label: "Caieiras" },
  { value: "Franco da Rocha", label: "Franco da Rocha" },
  { value: "Baltazar Fidélis", label: "Baltazar Fidélis" },
  { value: "Júlio Prestes", label: "Júlio Prestes" },
  { value: "Palmeiras-Barra Funda", label: "Palmeiras-Barra Funda" },
  { value: "Lapa", label: "Lapa" },
  { value: "Domingos de Moraes", label: "Domingos de Moraes" },
  { value: "Imperatriz Leopoldina", label: "Imperatriz Leopoldina" },
  { value: "Presidente Altino", label: "Presidente Altino" },
  { value: "Osasco", label: "Osasco" },
  { value: "Comandante Sampaio", label: "Comandante Sampaio" },
  { value: "Quitaúna", label: "Quitaúna" },
  { value: "General Miguel Costa", label: "General Miguel Costa" },
  { value: "Carapicuíba", label: "Carapicuíba" },
  { value: "Santa Terezinha", label: "Santa Terezinha" },
  { value: "Antônio João", label: "Antônio João" },
  { value: "Barueri", label: "Barueri" },
  { value: "Jardim Belval", label: "Jardim Belval" },
  { value: "Jardim Silveira", label: "Jardim Silveira" },
  { value: "Jandira", label: "Jandira" },
  { value: "Sagrado Coração", label: "Sagrado Coração" },
  { value: "Engenheiro Cardoso", label: "Engenheiro Cardoso" },
  { value: "Itapevi", label: "Itapevi" },
  { value: "Amador Bueno", label: "Amador Bueno" },
  { value: "Osasco", label: "Osasco" },
  { value: "Presidente Altino", label: "Presidente Altino" },
  { value: "Ceasa", label: "Ceasa" },
  { value: "Villa-Lobos-Jaguaré", label: "Villa-Lobos-Jaguaré" },
  { value: "Cidade Universitária", label: "Cidade Universitária" },
  { value: "Pinheiros", label: "Pinheiros" },
  { value: "Hebraica-Rebouças", label: "Hebraica-Rebouças" },
  { value: "Cidade Jardim", label: "Cidade Jardim" },
  { value: "Vila Olímpia", label: "Vila Olímpia" },
  { value: "Berrini", label: "Berrini" },
  { value: "Morumbi", label: "Morumbi" },
  { value: "Granja Julieta", label: "Granja Julieta" },
  { value: "Santo Amaro", label: "Santo Amaro" },
  { value: "Socorro", label: "Socorro" },
  { value: "Jurubatuba", label: "Jurubatuba" },
  { value: "Autódromo", label: "Autódromo" },
  { value: "Interlagos", label: "Interlagos" },
  { value: "Grajaú", label: "Grajaú" },
  { value: "Brás", label: "Brás" },
  { value: "Juventus Mooca", label: "Juventus Mooca" },
  { value: "Ipiranga", label: "Ipiranga" },
  { value: "Tamanduateí", label: "Tamanduateí" },
  { value: "São Caetano do Sul", label: "São Caetano do Sul" },
  { value: "Utinga", label: "Utinga" },
  { value: "Pref Saladino", label: "Pref Saladino" },
  { value: "Capuava", label: "Capuava" },
  { value: "Mauá", label: "Mauá" },
  { value: "Guapituba", label: "Guapituba" },
  { value: "Ribeirão Pires", label: "Ribeirão Pires" },
  { value: "Rio Grande da Serra", label: "Rio Grande da Serra" },
  { value: "Brás", label: "Brás" },
  { value: "Juventus Mooca", label: "Juventus Mooca" },
  { value: "Ipiranga", label: "Ipiranga" },
  { value: "Tamanduateí", label: "Tamanduateí" },
  { value: "São Caetano do Sul", label: "São Caetano do Sul" },
  { value: "Utinga", label: "Utinga" },
  { value: "Pref Saladino", label: "Pref Saladino" },
  { value: "Capuava", label: "Capuava" },
  { value: "Mauá", label: "Mauá" },
  { value: "Guapituba", label: "Guapituba" },
  { value: "Ribeirão Pires", label: "Ribeirão Pires" },
  { value: "Rio Grande da Serra", label: "Rio Grande da Serra" },
  { value: "Brás", label: "Brás" },
  { value: "Tatuapé", label: "Tatuapé" },
  { value: "Engº Goulart", label: "Engº Goulart" },
  { value: "Usp Leste", label: "Usp Leste" },
  { value: "Comendador Ermelino", label: "Comendador Ermelino" },
  { value: "São Miguel Paulista", label: "São Miguel Paulista" },
  { value: "Jardim Helena Vila Mara", label: "Jardim Helena Vila Mara" },
  { value: "Itaim Paulista", label: "Itaim Paulista" },
  { value: "Jardim Romano", label: "Jardim Romano" },
  { value: "Eng Manoel Feio", label: "Eng Manoel Feio" },
  { value: "Itaquaquecetuba", label: "Itaquaquecetuba" },
  { value: "Aracaré", label: "Aracaré" },
  { value: "Calmon Viana", label: "Calmon Viana" },
  { value: "Aeroporto-Guarulhos", label: "Aeroporto-Guarulhos" },
  { value: "Guarulhos-Cecap", label: "Guarulhos-Cecap" },
  { value: "Eng. Goulart", label: "Eng. Goulart" },
  { value: "Vila Prudente", label: "Vila Prudente" },
  { value: "Oratório", label: "Oratório" },
  { value: "São Lucas", label: "São Lucas" },
  { value: "Camilo Haddad", label: "Camilo Haddad" },
  { value: "Vila Tolstói", label: "Vila Tolstói" },
  { value: "Vila União", label: "Vila União" },
  { value: "Jardim Planalto", label: "Jardim Planalto" },
  { value: "Sapopemba", label: "Sapopemba" },
  { value: "Fazenda da Juta", label: "Fazenda da Juta" },
  { value: "São Mateus", label: "São Mateus" },
  { value: "Jardim Colonial", label: "Jardim Colonial" },
  { value: "Sem informação", label: "Sem essa informação" }
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
              options={opcoesLinhasMetro} // Certifique-se de que este está definido corretamente
              value={opcoesLinhasMetro.filter(opcao => formData.linhasMetro.includes(opcao.value))}
              onChange={options => setFormData({ ...formData, linhasMetro: options.map(option => option.value) })}
              isMulti
              isLoading
              isInvalid={!!errors.linhasMetro}
            />
            {/* Feedback de validação customizado, como mostrado acima */}
            {errors.linhasMetro && <div className="text-danger">{errors.linhasMetro}</div>}
          </Form.Group>

          <Form.Group controlId="estacoesMetro">
          <Form.Label>Estacoes de Metro</Form.Label>
          <Select
            options={opcoesestacoesMetro} // Certifique-se de que este está definido corretamente
            value={opcoesestacoesMetro.filter(opcao => formData.estacoesMetro.includes(opcao.value))}
            onChange={options => setFormData({ ...formData, estacoesMetro: options.map(option => option.value) })}
            isMulti
            isLoading
            isInvalid={!!errors.estacoesMetro}
          />
          {/* Feedback de validação customizado, como mostrado acima */}
          {errors.estacoesMetro && <div className="text-danger">{errors.estacoesMetro}</div>}
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

export default Step6Page;
