import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import { Main } from '.';
import './services/firebase';
import 'rsuite/dist/rsuite-no-reset.min.css';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Main />
  </StrictMode>,
)
