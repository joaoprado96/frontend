import React from 'react';
import { ProgressProvider, useProgress } from '../../app/contexts/ProgressContext';
import ProgressBar from '../../app/components/ProgressBar'; // Verifique o caminho para o seu ambiente
import Step1Page from '../../app/components/Step1Page';
import Step2Page from '../../app/components/Step2Page';
import Step3Page from '../../app/components/Step3Page';
import Step4Page from '../../app/components/Step4Page';
import Step5Page from '../../app/components/Step5Page';
import Step6Page from '../../app/components/Step6Page';
import Step7Page from '../../app/components/Step7Page';
import Step8Page from '../../app/components/Step8Page';
import Step9Page from '../../app/components/Step9Page';

import { useRouter } from 'next/router';

const Cadastro = () => {
  const router = useRouter();
  const { step } = router.query; // Obtém o valor do parâmetro 'step' da URL

  // Ajusta o valor de 'step' para 1 se for 'undefined' ou não puder ser convertido em um número
  const currentStep = parseInt(step) || 1;

  let content;

  switch (currentStep) {
    case 1:
        content = <Step1Page />;
        break;
    case 2:
        content = <Step2Page />;
        break;
    case 3:
        content = <Step3Page />;
        break;
    case 4:
        content = <Step4Page />;
        break;
    case 5:
        content = <Step5Page />;
        break;
    case 6:
        content = <Step6Page />;
        break;
    case 7:
        content = <Step7Page />;
        break;
    case 8:
        content = <Step8Page />;
        break;
    case 9:
        content = <Step9Page />;
        break;
    default:
        content = <div><br/><br/><br/><br/><br/>Página não encontrada</div>;
  }

  return (
    <ProgressProvider>
      <ProgressBar totalSteps={9} />
      {content}
    </ProgressProvider>
  );
}

export default Cadastro;
