import { useProgress } from '../contexts/ProgressContext';
import Head from 'next/head';
import React from 'react';
import Select from 'react-select';

const Step6Page = () => {
  const { currentStep, handleNextStep, handlePreviousStep } = useProgress();
  return (
    <>
    <Head>
      <title>Contato - AcheAi</title>
    </Head>
    <div className='formulario-cadastro'>
      <br/><br/><br/>
      <h1>Passo 6: Localização</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5px' }}>
        <button className="btn mt-3" onClick={handlePreviousStep}>Anterior</button>
        <button className="btn mt-3" onClick={handleNextStep}>Próximo</button>
      </div>
    </div>
    </>
  );
};

export default Step6Page;
