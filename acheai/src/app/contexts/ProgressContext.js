import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const ProgressContext = createContext();

export const useProgress = () => {
  return useContext(ProgressContext);
};

export const ProgressProvider = ({ children }) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0); // Estado inicial ajustado para 0 como padrão

  useEffect(() => {
    const handleRouteChange = (url) => {
      const stepFromUrl = new URLSearchParams(window.location.search).get('step');
      const parsedStep = parseInt(stepFromUrl);
      if (!isNaN(parsedStep)) {
        setCurrentStep(parsedStep);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    // Inicializar com o valor atual na montagem
    handleRouteChange();

    // Limpeza ao desmontar
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // Navega para o próximo passo
  const handleNextStep = () => {
    const nextStep = currentStep + 1;
    router.push(`/cadastro?step=${nextStep}`);
  };

  // Navega para o passo anterior
  const handlePreviousStep = () => {
    const prevStep = Math.max(currentStep - 1, 0); // Evita passos negativos
    router.push(`/cadastro?step=${prevStep}`);
  };

  return (
    <ProgressContext.Provider value={{ currentStep, handleNextStep, handlePreviousStep }}>
      {children}
    </ProgressContext.Provider>
  );
};
