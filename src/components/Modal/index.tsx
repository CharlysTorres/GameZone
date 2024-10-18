import { ReactNode } from 'react';

import './styles.css';

interface ModalProps {
  visible: boolean; // Whether the modal is visible or not.
  content?: ReactNode | null;
}

export function Modal({visible, content}: ModalProps) {
  return (
    <div className={`overlay-modal card ${visible ? '' : 'hidden-modal'}`}>
      <div className='modal-content'>
        {/* <div className='header-modal'>
          <span></span>
          <i className='bx bx-x text-2xl cursor-pointer hover:opacity-50' onClick={closeModal}></i>
        </div> */}
        {content}
      </div>
    </div>
  );
}
