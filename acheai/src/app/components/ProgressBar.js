import React from 'react';
import { useProgress } from '../../app/contexts/ProgressContext';

const ProgressBar = ({ totalSteps }) => {
  const { currentStep } = useProgress();

  console.log(currentStep)

  // Calcula a porcentagem de progresso
  const progressPercentage = ((currentStep / totalSteps) * 100).toFixed(0);

  return (    
    <div className='formulario-cadastro'>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <div className="progress-bar-container" style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '8px' }}>
        <div
            className="progress-bar-fill"
            style={{
            height: '20px',
            width: `${progressPercentage}%`,
            backgroundColor: 'green',
            borderRadius: '8px',
            transition: 'width 0.3s ease-in-out',
            }}
        >
            <span style={{ color: 'white', padding: '0 10px' }}>{progressPercentage}%</span>
        </div>
        </div>
    </div>
  );
};

export default ProgressBar;
