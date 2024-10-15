import { useState } from 'react';

import './styles.css';
import { CardLogin } from './CardLogin';
import { useAuth } from '../../hooks/useAuth';
import { CreateAccount } from './CreateAccount';
import GameZone from '../../assets/GameZone.svg';
import FamilyGame from '../../assets/family-game.svg';
import { CardForgotPassword } from './CardForgotPassword';
import { toast } from 'react-toastify';

interface LoginPopupProps {
  event: React.MouseEvent<HTMLElement, MouseEvent>;
  authProvider: 'google' | 'facebook' | 'github';
}

export function Login() {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [createAccount, setCreateAccount] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  
  const { signInWithGithub, signInWithFacebook, signInWithGoogle, signUpWithEmail } = useAuth();

  function handleAccountRecovery() {}

  async function handleCreateAccount() {
    await signUpWithEmail(email, name, password);
  }

  async function handleLoginPopup({event, authProvider}: LoginPopupProps) {
    event.preventDefault();
    switch (authProvider) {
      case 'google':
        await signInWithGoogle();
        break;
      case 'facebook':
        // await signInWithFacebook();
        toast.error('Provedor está indisponivel no momento.');
        break;
      case 'github':
        await signInWithGithub();
        break;
      default:
        break;
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
