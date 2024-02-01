import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Select from 'react-select'; // Assumindo que você está usando uma biblioteca como react-select para os campos de seleção múltipla


export default function cadastro() {
    const [formData, setFormData] = useState({
        nome: '',
        cnpj: '',
        descricao: '',
        telefone: '',
        email: '',
        rua: '',
        cep: ''

    });

    const tiposEvento = [
        { value: 'beber e dançar', label: 'Beber e dançar' },
        { value: 'rolê geek', label: 'Rolê geek' },
        { value: 'conversar', label: 'Conversar' },
        { value: 'lugar romântico', label: 'Lugar romântico' },
        { value: 'rolê de amigos', label: 'Rolê de amigos' },
        { value: 'encontro familiar', label: 'Encontro familiar' },
        { value: 'aniversário', label: 'Aniversário' },
        { value: 'happy hour', label: 'Happy Hour' },
        { value: 'home office', label: 'Home Office' },
        { value: 'assistir jogos', label: 'Assistir Jogos' },
        { value: 'sair sozinho/a', label: 'Sair Sozinho/a' },
        { value: 'brunches', label: 'Brunches' },
        { value: 'cabaré/boates', label: 'Cabaré/Boates' },
        { value: 'música ao vivo', label: 'Música ao vivo' },
        { value: 'para crianças', label: 'Para crianças' },
        { value: 'temáticos', label: 'Temáticos' },
        { value: 'karaokês', label: 'Karaokês' },
        { value: 'casas noturnas', label: 'Casas noturnas' },
        { value: 'LGBTQIA+', label: 'LGBTQIA+' },
        { value: 'primeiro encontro', label: 'Primeiro encontro' },
        { value: 'experiência gastronômica', label: 'Experiência gastronômica' }
        // Adicione mais opções conforme necessário
    ];

    // Manipular mudanças nos campos do formulário
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    

    // Manipular mudanças nos selects
    const handleSelectChange = (selectedOption, { name }) => {
        setFormData({ ...formData, [name]: selectedOption });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Implementar lógica de envio
    };

    return (
        <>
            <Head>
                <title>Cadastro - AcheAi</title>
            </Head>
            <div className="page">
                <form onSubmit={handleSubmit} className="formulario-cadastro">
                <br/>
                <br/>
                <br/>
                <h1>🌟 Bem-vindos ao Achei Aí! 🌟</h1>
                <p>Hey, que tal fazer seu estabelecimento brilhar no mundo digital? Aqui no <strong>Ache Aí</strong>, nós somos mais do que uma plataforma: somos um ponto de encontro entre os melhores estabelecimentos e clientes que buscam por experiências incríveis. E o melhor? Tudo isso de graça! Sim, você leu certo - é 100% gratuito!</p>
                
                <h4>🚀 Processo Fácil de Cadastro 🚀</h4>
                <p>Sabemos que seu tempo é precioso. Por isso, nosso processo de cadastro é ágil e intuitivo. Em poucos passos, seu espaço estará pronto para ser descoberto por novos olhares e paladares.</p>

                <h4>✨ Qualidade em Primeiro Lugar ✨</h4>
                <p>Acreditamos que a qualidade é a alma do negócio. Uma vez que seu estabelecimento estiver cadastrado, vamos fazer uma checagem rápida para garantir que tudo esteja nos trinques. Informações precisas e detalhadas são a chave para atrair a clientela certa!</p>

                <h4>🔍 Compromisso com a Excelência 🔍</h4>
                <p>Caso algo precise de um ajuste ou uma informação adicional, não se preocupe! Nossa equipe entrará em contato para que juntos possamos aprimorar seu perfil. Queremos que seu estabelecimento brilhe tanto quanto você!</p>
                
                <p>Então, está esperando o quê? Vamos juntos nessa jornada para destacar o melhor que seu estabelecimento tem a oferecer. Achei Aí é o seu parceiro para sucesso e visibilidade no mundo digital!</p>
                
                <h4>Nome do Estabelecimento</h4>
                <p>Dê-nos o prazer de conhecer o nome do seu espaço. Uma boa nomenclatura é o convite inicial para atrair clientes. Capriche!</p>
                    <input type="text" id="nome" placeholder="Nome"
                        value={formData.nome}
                        onChange={handleChange} />
                <h4>CNPJ</h4>
                <p>Por gentileza, informe o CNPJ do seu estabelecimento. Isso assegura a exclusividade e autenticidade do seu perfil na plataforma.</p>
                    <input type="text" id="cnpj" placeholder="CNPJ"
                        value={formData.cnpj}
                        onChange={handleChange} />
                <h4>Descrição</h4>
                <p>Chegou a hora de brilhar! Descreva seu estabelecimento de forma envolvente e única. Inspire-se e compartilhe o que torna seu lugar especial.</p>
                    <textarea id="descricao" placeholder="Descrição"
                        value={formData.descricao}
                        onChange={handleChange} />
                <h4>Tipos de Eventos</h4>
                <p>Informe os tipos de eventos que seu estabelecimento costuma sediar, como apresentações musicais ao vivo, eventos temáticos ou encontros corporativos.</p>
                    <Select
                        id="multiselectTiposEvento"
                        isMulti
                        options={tiposEvento}
                        name="tiposEvento"
                        onChange={handleSelectChange}
                    />
                    {/* Outros campos... */}

                    <h4>Informações de Contato</h4>
                    <p>Informe o endereço do seu estabelecimento.</p> 
                    <div className="formulario-grupo">
                        <input
                            type="text"
                            id="telefone"
                            placeholder="Telefone"
                            value={formData.telefone}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            id="email"
                            placeholder="E-mail"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <h4>Endereço</h4>
                    <p>Informe o endereço do seu estabelecimento. A localização exata ajuda seus futuros clientes a encontrá-lo com facilidade. Não esqueça de detalhar bairro, CEP e outros pontos de referência.</p>
                    <div className="formulario-grupo">
                        <input
                            type="text"
                            id="rua"
                            placeholder="Rua"
                            value={formData.rua}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            id="cep"
                            placeholder="CEP"
                            value={formData.cep}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn">Cadastrar</button>
                </form>
            </div>
        </>
    );
}