import { CustomProvider } from 'rsuite';
import { ToastContainer } from 'react-toastify';

import { App } from './App';
import { AuthContextProvider } from './contexts/AuthContext';

export function Main() {
  return (
    <AuthContextProvider>
      <CustomProvider>
        <App />
      </CustomProvider>
      <ToastContainer />
    </AuthContextProvider>
  );
}
