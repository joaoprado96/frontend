import { ProgressProvider } from '../../app/contexts/ProgressContext';
import Step1Page from '../../app/components/Step1Page';

const Cadastro = () => {
  return (
    <ProgressProvider>
      <Step1Page />
    </ProgressProvider>
  );
};

export default Cadastro;
