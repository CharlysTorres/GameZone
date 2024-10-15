import { useState, useContext } from 'react';

import './styles.css';
import { Button } from '../Button';
import { QuestionProps } from '../../@types/games';
import { ChallengesContext } from '../../contexts/ChallengesContext';

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
  const { completeChallenge } = useContext(ChallengesContext);

  function handleNextQuestion() {
    if (!(countQuestion + 1 === questions.length)) {
      setCountQuestion(countQuestion + 1);
      if (countQuestion < questions.length - 1) {
        setCountQuestion(countQuestion + 1);
      } else {
        handleClose();
      }
    } else {
      handleClose();
    }
  }

  function startChallenge() {
    if (!(countQuestion + 1 === questions.length) || countQuestion + 1 === questions.length) {
      const xp = questions[countQuestion].xp;
      const questionId = questions[countQuestion].id;
      const rightAnswer = testAnswerKey[countQuestion + 1];

      if (answer === rightAnswer) {
        completeChallenge({gameId, questionId, xp});
      }
      handleNextQuestion();
    } else {
      handleNextQuestion();
    }
  }

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
            <Button title={'Próxima'} onClick={startChallenge} disabled={!answer.length} />
          </div>
        </div>
      </div>
    </div>
  );
}
