import { useProgress } from '../contexts/ProgressContext';
import Head from 'next/head';
import React from 'react';
import Select from 'react-select';

const opcoesEstilosMusicais = [
  { value: 'Sem informação', label: 'Estilos musicais: Sem essa informação' },
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
  { value: 'Sem informação', label: 'Tipo de local: Sem essa informação' },
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
  { value: 'Sem informação', label: 'Hobbies: Sem essa informação' },
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
  { value: 'Sem informação', label: 'Ambientes: Sem essa informação' },
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

const opcoesTiposCartao = [
  { value: 'Sem informação', label: 'Formas de pagamento: Sem essa informação' },
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


const Step7Page = () => {
  const { currentStep, handleNextStep, handlePreviousStep } = useProgress();
  return (
    <>
    <Head>
      <title>Contato - AcheAi</title>
    </Head>
    <div className='formulario-cadastro'>
      <br/><br/><br/>
      <h1>Passo 7: Links</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5px' }}>
        <button className="btn mt-3" onClick={handlePreviousStep}>Anterior</button>
        <button className="btn mt-3" onClick={handleNextStep}>Próximo</button>
      </div>
    </div>
    </>
  );
};

export default Step7Page;
