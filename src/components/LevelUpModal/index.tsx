import { useContext } from 'react';
// import { ChallengesContext } from '../contexts/ChallengesContext';

import './styles.css';

export function LevelUpModal() {
  // const { level, closeLevelUpModal } = useContext(ChallengesContext);

  return (
    <div className='overlay'>
      <div className='container-modal-level'>
        <header>1</header>

        <strong>Parabéns!</strong>
        <p>Você alcançou um novo level</p>

        <button type="button">
          <img src="/src/assets/close.svg" alt="Fechar" />
        </button>
      </div>
    </div>
  );
}
