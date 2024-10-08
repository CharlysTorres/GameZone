import { useState } from 'react';

import './styles.css';
import { CardLogin } from './CardLogin';
import GameZone from '../../assets/GameZone.svg';
import FamilyGame from '../../assets/family-game.svg';
import { CardForgotPassword } from './CardForgotPassword';
import { CreateAccount } from './CreateAccount';
import { checkDevice } from '../../utils/checkDevice';
import { toast } from 'react-toastify';

interface LoginPopupProps {
  event: React.MouseEvent<HTMLElement, MouseEvent>;
  authProvider: 'google' | 'facebook' | 'github';
}

export function Login() {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [createAccount, setCreateAccount] = useState(false);
  const [email, setEmail] = useState<string | undefined>('');
  const [password, setPassword] = useState<string | undefined>('');
  const [name, setName] = useState<string | undefined>('');

  function handleAccountRecovery() {}

  function handleCreateAccount() {}

  const notify = () => toast('wow so easy!');

  function handleLoginPopup({event, authProvider}: LoginPopupProps) {
    event.preventDefault();
    // Implementar a função para logar o usuário
    if (checkDevice()) {
      switch (authProvider) {
        case 'google':
          // Implementar a função para logar o usuário com Google
          break;
        case 'facebook':
          // Implementar a função para logar o usuário com Facebook
          break;
        case 'github':
          // Implementar a função para logar o usuário com GitHub
          break;
        default:
          notify();
      }
    } else {
      notify();
    }
  }

  return (
    <div className='container'>
      <div className='left-side'>
        <div className='image-container'>
            <img src={FamilyGame} alt='Pessoas jogando' />
        </div>
        <p>Tire suas dúvidas e aprenda a jogar aquele jogo que você sempre teve curiosidade em aprender.</p>
      </div>
      <div className='right-side'>
        <div className='login-form'>
          <div className='logo'>
            <img src={GameZone} alt='Gamer Zone Logo' />
            <h2 className='font-bold text-xl'>{forgotPassword ? 'Recupere a Senha' : 'Conecte-se'}</h2>
          </div>
          {
            forgotPassword
              ? 
              <CardForgotPassword
                handleForgotPassword={() => setForgotPassword(false)}
                emailRecovery={handleAccountRecovery}
                changeEmail={(email) => setEmail(email)}
              /> 
              : createAccount ?
                <CreateAccount
                  changeEmail={(email) => setEmail(email)}
                  changePassword={(pass) => setPassword(pass)}
                  changeName={(name) => setName(name)}
                  handleBack={() => setCreateAccount(false)}
                />
              :
              <CardLogin
                handleForgotPassword={() => setForgotPassword(true)}
                changeEmail={(email) => setEmail(email)}
                changePassword={(pass) => setPassword(pass)}
                handleGoCreate={() => setCreateAccount(true)}
                handleLoginPopup={(event, authProvider) => handleLoginPopup({event, authProvider})}
              />
          }
        </div>
      </div>
    </div>
  );
}
