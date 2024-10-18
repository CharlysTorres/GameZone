import { ReactNode } from 'react';

import './styles.css';
import { GamesProps } from '../../@types/games';
import { Button } from '../Button';
import { ModalQuestions } from '../ModalQuestions';

interface ModalContentGameProps {
  game: GamesProps;
  closeModal: () => void; // Function to close the modal
  handleModalContent: (content: ReactNode) => void;
}

export function ModalContentGame({game, closeModal, handleModalContent}: ModalContentGameProps) {

  function handleGoQuestions() {
    handleModalContent(<ModalQuestions handleClose={closeModal} questions={game.questions} testAnswerKey={game.testAnswerKey} gameId={game.id} gameIcon={game.icon} />)
  }

  return (
    <div className='card-modal-game'>
      <div className='header-modal'>
        <span className='text-2xl font-bold'>{game.name}</span>
        <i className='bx bx-x text-2xl cursor-pointer hover:opacity-50' onClick={closeModal}></i>
      </div>
      <div className='content-game scroll-y-transparent'>
        <div className='about-game mb-3'>
          <b className='text-violet-500'>Sobre o jogo: </b>
          <span className='description-game font-medium'>{game.description}</span>
        </div>
        <div className='objective-wrapper mb-3'>
          <b className='text-violet-500'>Objetivo do jogo: </b>
          <span className='objective-game font-medium'>{game.objective}</span>
        </div>

        <b className='text-violet-500'>Preparação:</b>
        {
          game.rules.map(rule => {
            return (
              <div key={rule.step} className='rule'>
                <span className='text-violet-500'>{rule.step}.</span><p>{rule.description}</p>
              </div>
            );
          })
        }
      </div>
      <div className='card-footer-modal'>
          <div className='left-content'></div>
          <div className='right-content'>
            <Button title='Aceitar Desafio' onClick={handleGoQuestions} />
          </div>
        </div>
    </div>
  );
}
