import { createContext, useContext, useState } from 'react';

const ProgressContext = createContext();

export const useProgress = () => {
  return useContext(ProgressContext);
};

export const ProgressProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const goToNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  return (
    <ProgressContext.Provider value={{ currentStep, goToNextStep }}>
      {children}
    </ProgressContext.Provider>
  );
};
