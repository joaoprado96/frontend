import { useProgress } from '../../app/contexts/ProgressContext';

const Step1Page = () => {
  const { currentStep, goToNextStep } = useProgress();

  return (
    <div>
      <h1>Passo 1: Informações Pessoais</h1>
      {/* Adicione os campos de formulário aqui */}
      <button onClick={goToNextStep}>Próximo</button>
    </div>
  );
};

export default Step1Page;
