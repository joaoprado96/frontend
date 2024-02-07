import React, { useState } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import Head from 'next/head';
import Select from 'react-select';

const Step1Page = () => {
  const { currentStep, handleNextStep, handlePreviousStep } = useProgress();
  const [termosDeUsoAceitos, setTermosDeUsoAceitos] = useState(false);

  const handleAceitarTermos = () => {
    setTermosDeUsoAceitos(!termosDeUsoAceitos);
  };

  const handleProximoClick = () => {
    if (termosDeUsoAceitos) {
      handleNextStep();
    } else {
      alert('Aceite os termos de uso primeiro.');
    }
  };

  const textoTermosDeUso = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis tortor non dolor pulvinar vulputate. Maecenas sit amet elit arcu. Sed at nulla nec velit vulputate finibus. Aliquam erat volutpat. Sed quis neque nec orci semper dignissim. Vestibulum posuere, massa quis malesuada ultricies, sapien elit ullamcorper velit, vitae feugiat metus est ut nunc. Fusce ac congue mauris. Nulla facilisi. Duis nec arcu libero. Nulla facilisi. Duis bibendum urna ut tempus tristique. Praesent id sem ut sapien ultrices efficitur. Quisque maximus ipsum magna, at gravida justo ultricies sed. Nulla facilisi. Nulla feugiat ultricies ex, ac ultrices neque facilisis non. Nulla facilisi. Fusce posuere feugiat diam in volutpat.

Donec auctor non enim vel pellentesque. Integer malesuada mauris et lorem fermentum, vel vestibulum lorem bibendum. In efficitur ligula vitae purus condimentum consectetur. Aliquam erat volutpat. Vestibulum tempor sem sed quam ultricies dignissim. Mauris id lobortis velit. Sed tincidunt metus non tortor placerat vestibulum. Vivamus dictum justo nec fringilla euismod. Sed quis turpis lectus. Mauris vel nunc nec leo lobortis rutrum. Aliquam erat volutpat. Fusce aliquam orci mi, id tempor mi ullamcorper vel. Nulla facilisi. Quisque posuere augue quis nisl feugiat, non pellentesque purus posuere. Sed commodo dolor ac odio feugiat tristique. Suspendisse potenti. Proin interdum nisi ac sem auctor, in fermentum lacus pharetra. Integer nec tellus quis purus euismod lacinia ut vitae ex.`;

  return (
    <>
      <Head>
        <title>Cadastro - AcheAi</title>
      </Head>
      <div className='formulario-cadastro'>
        <h1>Bem vindo ao AcheAi!</h1>
        <p style={{ color: '#333', fontSize: '0.9rem', textAlign: 'center', lineHeight: '1.0' }}>
          Aqui você terá a oportunidade de cadastrar o seu negócio em uma plataforma que oferece uma experiência completa para o usuário!
        </p>
        <p style={{ color: '#E5671D', fontSize: '0.9rem', textAlign: 'center', lineHeight: '1.0' }}>
          Por estarmos em piloto, a plataforma é 100% gratuita. Então aproveite :)
        </p>
        <p style={{ color: '#333', fontSize: '0.9rem', textAlign: 'center', lineHeight: '1.0' }}>
          É muito importante garantir a veracidade dos itens preenchidos, então se atente a esses pontos e vamos lá!
        </p>
        <p style={{ color: '#333', fontSize: '0.9rem', textAlign: 'center', lineHeight: '1.0' }}>
          Ah... Leia e aceite os Termos de Uso antes!
        </p>
        <textarea
          className="termos-de-uso"
          placeholder="Insira os termos de uso aqui..."
          value={textoTermosDeUso} // Aqui alterei para o texto longo
          onChange={(e) => setTermosDeUsoAceitos(e.target.value)}
          rows={5} // Definindo o número mínimo de linhas visíveis
          style={{ resize: 'vertical', overflowY: 'auto', height: '150px' }} // Definindo o comportamento do botão de rolagem
        />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5px', fontSize: '14px' }}>
          <label htmlFor="aceitarTermos" style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              id="aceitarTermos"
              checked={termosDeUsoAceitos}
              onChange={handleAceitarTermos}
              style={{ marginRight: '5px', width: '16px', height: '16px' }} // Tamanho do checkbox
            />
            Aceitar Termos de Uso
          </label>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5px' }}>
          <button className="btn mt-3" onClick={handlePreviousStep}>Anterior</button>
          <button className="btn mt-3" onClick={handleProximoClick}>Próximo</button>
        </div>
      </div>
    </>
  );
};

export default Step1Page;
