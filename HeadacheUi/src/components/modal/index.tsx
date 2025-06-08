'use client';

import React from 'react';
import s from './style.module.scss';

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  isOpen: boolean;
  small?: boolean; // Добавим опциональный пропс для маленького модального окна
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children, isOpen, small = false }) => {
  if (!isOpen) return null;

  return (
    <div className={s.modalOverlay}>
      <div className={`${s.modalContent} ${small ? s.small : ''}`}>
        <div className={s.modalHeader}>
          <h3>{title}</h3>
          <button className={s.closeButton} onClick={onClose}>×</button>
        </div>
        <div className={s.modalBody}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;