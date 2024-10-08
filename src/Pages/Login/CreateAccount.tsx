import { useRef } from 'react';

import { Button } from "../../components/Button";

interface CreateAccountProps {
  changeEmail: (value: string) => void;
  changePassword: (value: string) => void;
  changeName: (value: string) => void;
  handleBack: () => void; // Implement this function to handle back navigation when 'Conecte-se' is clicked.
}

export function CreateAccount({changeName, changeEmail, changePassword, handleBack}: CreateAccountProps) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  function handleCreateAccount() {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const name = nameRef.current?.value;

    // Implement your logic to create the account here
    if (email && password && name) {
      changeName(name);
      changeEmail(email);
      changePassword(password);
    }
  }

  return (
    <div className='card card-create-account'>
      <form>
        <input type='text' placeholder='Nome' required className='bg-gray-100 placeholder[#9B9A9A]' ref={nameRef} />
        <input type='email' placeholder='Email' required className='bg-gray-100 placeholder[#9B9A9A]' ref={emailRef} />
        <input type='password' placeholder='Senha' required className='bg-gray-100 placeholder[#9B9A9A]' ref={passwordRef} />
        <Button title='Entrar' color='bg-violet-600' textColor='text-white' onClick={handleCreateAccount} />
      </form>
      <div className='signin'>
        <p>Já tem uma conta? <span className='text-violet-500 cursor-pointer hover:opacity-50' onClick={() => handleBack()}>Conecte-se</span></p>
      </div>
    </div>
  );
}
