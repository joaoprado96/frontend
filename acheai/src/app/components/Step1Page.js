import { useProgress } from '../../app/contexts/ProgressContext';
import Head from 'next/head';
import React from 'react';
import Select from 'react-select';

const Step1Page = () => {
  const { currentStep, handleNextStep, handlePreviousStep } = useProgress();
  return (
    <>
    <Head>
      <title>Cadastro - AcheAi</title>
    </Head>
    <div className='formulario-cadastro'>
      <h1>Passo 1: Termos e Condiações</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5px' }}>
        <button className="btn mt-3" onClick={handlePreviousStep}>Anterior</button>
        <button className="btn mt-3" onClick={handleNextStep}>Próximo</button>
      </div>
    </div>
    </>
  );
};

export default Step1Page;
