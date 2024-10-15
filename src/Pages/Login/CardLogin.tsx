import React from 'react';

import { Button } from "../../components/Button";
import { toast } from 'react-toastify';

interface CardLoginProps {
  handleForgotPassword: () => void;
  changeEmail: (email: string) => void;
  changePassword: (password: string) => void;
  handleGoCreate: () => void;
  handleLoginPopup: (e: React.MouseEvent<HTMLElement, MouseEvent>, authProvider: 'google' | 'facebook' | 'github') => void;
}
export function CardLogin({handleForgotPassword, changeEmail, changePassword, handleGoCreate, handleLoginPopup}: CardLoginProps) {
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  function handleSignIn() {
    if (emailRef.current?.value) {
      changeEmail(emailRef.current.value);
    }

    if (passwordRef.current?.value) {
      changePassword(passwordRef.current.value);
    }
    toast.error('Indisponivel no momento, por favor tente entrar de outra forma.');
  }

  return (
    <>
      <form>
        <input type='email' placeholder='Email' required className='bg-gray-100 placeholder[#9B9A9A]' ref={emailRef} />
        <input type='password' placeholder='Senha' required className='bg-gray-100 placeholder[#9B9A9A]' ref={passwordRef} />
        <Button title='Entrar' color='bg-violet-600' textColor='text-white' onClick={handleSignIn} />
      </form>
      <div className='forgot-password'>
        <span className='cursor-pointer hover:opacity-80' onClick={handleForgotPassword}>Esqueci minha senha</span>
      </div>
      <div className='or-separator'>
        <span className='w-12 h-px bg-slate-800'></span>
        <span className='px-3'>ou</span>
        <span className='w-12 h-px bg-slate-800'></span>
      </div>
      <div className='social-login'>
        <i className='bx bxl-google text-4xl mx-2 text-red-600 cursor-pointer hover:opacity-50' onClick={(e) => handleLoginPopup(e, 'google')}></i>
        <i className='bx bxl-facebook text-4xl mx-2 text-blue-600 cursor-pointer hover:opacity-50' onClick={(e) => handleLoginPopup(e, 'facebook')}></i>
        <i className='bx bxl-github text-4xl mx-2 cursor-pointer hover:opacity-50' onClick={(e) => handleLoginPopup(e, 'github')}></i>
      </div>
      <div className='signup'>
        <p>Não tem uma conta? <span className='text-violet-500 cursor-pointer hover:opacity-50' onClick={() => handleGoCreate()}>Cadastre-se</span></p>
      </div>
    </>
  );
}
