import { useState, useEffect } from 'react';

import './styles.css';
import { QuestionProps } from '../../@types/games';
import { Button } from '../Button';

interface ModalQuestionsProps {
  questions: QuestionProps[];
  testAnswerKey: { [key: string]: string};
  handleClose: () => void;
  gameId: number;
  gameIcon: string;
}

export function ModalQuestions({questions, handleClose, testAnswerKey, gameId, gameIcon}: ModalQuestionsProps) {
  const [countQuestion, setCountQuestion] = useState(0);
  const [answer, setAnswer] = useState('');

  function handleNextQuestion() {
    if (countQuestion < questions.length - 1) {
      setCountQuestion(countQuestion + 1);
    } else {
      handleClose();
    }
  }

  useEffect(() => {
    if (countQuestion < questions.length - 1) {
      setAnswer('');
    }
  }, [countQuestion]);

  return (
    <div className='modal-questions'>
      <div className='modal-question-header'>
        <span>Ganhe {questions[countQuestion].xp} xp</span>
        <div className='divider'></div>
      </div>
      <div className='modal-question-content'>
        <div className='modal-question-icon'>
          <img src={`/src/assets/${gameIcon}`} alt='' />
        </div>
        <div className='questions-content'>
          <h3 className='font-bold mt-3 mb-3'>{questions[countQuestion].title}</h3>
          <div className='question-radios'>
            {
              questions[countQuestion].questions.map((question) => {
                return (
                  <div key={question.id}>
                    <input type='radio' name='options-question' id={`option-${question.id}`} onChange={(e) => setAnswer(e.target.value)} checked={answer === question.title} value={question.title} />
                    <label htmlFor={`option-${question.id}`}>{question.title}</label>
                  </div>
                );
              })
            }
          </div>
        </div>
        <div className='card-footer-modal-question'>
          <div className='left-content'></div>
          <div className='right-content'>
            <Button title={'Próxima'} onClick={handleNextQuestion} disabled={!answer.length} />
          </div>
        </div>
      </div>
    </div>
  );
}
