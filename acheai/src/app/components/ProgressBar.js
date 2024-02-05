import React from 'react';
import { useProgress } from '../../app/contexts/ProgressContext';

const LinearProgressBar = ({ totalSteps }) => {
  const { currentStep } = useProgress();
  const progressPercentage = (currentStep / totalSteps) * 100;

  // Estilos inline
  const containerStyles = {
    height: '20px',
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: '8px',
    margin: '20px 0',
  };

  const fillerStyles = {
    height: '100%',
    width: `${progressPercentage}%`,
    backgroundColor: '#663A84',
    borderRadius: 'inherit',
    textAlign: 'right',
    transition: 'width 0.5s ease-in-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: '5px',
  };

  const labelStyles = {
    color: 'white',
    fontWeight: 'bold',
  };

  return (
    <div className='formulario-cadastro'>
        <br/><br/><br/><br/>
        <div style={containerStyles}>
            <div style={fillerStyles}>
                <span style={labelStyles}>{`${progressPercentage.toFixed(0)}%`}</span>
            </div>
        </div>
    </div>
  );
};

export default LinearProgressBar;
