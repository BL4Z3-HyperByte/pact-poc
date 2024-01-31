import React from 'react';
import { createPortal } from 'react-dom';

function Modal({ children }) {
  return createPortal(
    <div
      className={
        'absolute inset-[0] bg-black/20 backdrop-blur-[5px] flex flex-col items-center justify-center'
      }>
      {children}
    </div>,
    document.body
  );
}

export default Modal;
