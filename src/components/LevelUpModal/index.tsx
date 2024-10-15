import { useContext } from 'react';

import './styles.css';
import { ChallengesContext } from '../../contexts/ChallengesContext';

export function LevelUpModal() {
  const { level, closeLevelUpModal } = useContext(ChallengesContext);

  return (
    <div className='overlay'>
      <div className='container-modal-level'>
        <header>{level}</header>

        <strong>Parabéns!</strong>
        <p>Você alcançou um novo level</p>

        <button type='button' onClick={() => closeLevelUpModal()}>
          <img src='/src/assets/close.svg' alt='Fechar' />
        </button>
      </div>
    </div>
  );
}
