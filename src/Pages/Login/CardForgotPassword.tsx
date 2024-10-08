import React from 'react';

import { Button } from '../../components/Button';

interface CardForgotPasswordProps {
  changeEmail: (email: string | undefined) => void; // Function to change the email state to 'forgot'
  handleForgotPassword: () => void;
  emailRecovery: () => void;
}

export function CardForgotPassword({changeEmail, emailRecovery, handleForgotPassword}: CardForgotPasswordProps) {
  const emailRef = React.useRef<HTMLInputElement>(null);
  
  function handleRecoveryPassword() {
    // Perform email validation and send password reset link
    const email = emailRef.current?.value;
    
    if (email?.length) {
      // Send password reset link to email
      changeEmail(email);
      emailRecovery();
    } else {
      console.error('Invalid email format');
    }
  }
  
  return (
    <div className='card card-forgot-password'>
      <form>
        <input type='email' placeholder='Email' ref={emailRef} required />
        <Button title='Recuperar a Senha' color='bg-violet-600' textColor='text-white' onClick={handleRecoveryPassword} />
      </form>
      <p className='text-center text-sm text-gray-600 mt-4'>
        Já possui uma conta? <span className='hover:opacity-50 cursor-pointer text-violet-500' onClick={() => handleForgotPassword()}>Entre agora</span>
      </p>
    </div>
  );
}
