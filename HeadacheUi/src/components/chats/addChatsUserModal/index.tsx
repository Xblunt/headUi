// components/AddParticipantsModal/AddParticipantsModal.tsx
'use client';

import { FiX, FiUserPlus, FiSearch, FiUser } from 'react-icons/fi';
import { User } from '@/models';
import s from './style.module.scss';
import { useState } from 'react';

interface AddParticipantsModalProps {
  users: User[];
  onClose: () => void;
  onAddParticipant: (user: User) => void;
}

const AddParticipantsModal = ({ users, onClose, onAddParticipant }: AddParticipantsModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(user =>
    user.login.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={s.modalOverlay} onClick={onClose}>
      <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={s.closeButton} onClick={onClose}>×</button>
        
        <h3 className={s.modalTitle}>Добавить участников</h3>
        
        <div className={s.searchContainer}>
          <FiSearch className={s.searchIcon} />
          <input
            type="text"
            placeholder="Поиск пользователей..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={s.searchInput}
          />
        </div>
        
        <div className={s.usersList}>
          {filteredUsers.map(user => (
            <div key={user.uuid} className={s.userItem}>
              <div className={s.userInfo}>
                <div className={s.userAvatar}>
                  <FiUser size={16} />
                </div>
                <div>
                  <div className={s.userName}>{user.login}</div>
                  {user.email && <div className={s.userEmail}>{user.email}</div>}
                </div>
              </div>
              <button 
                className={s.addButton}
                onClick={() => onAddParticipant(user)}
              >
                <FiUserPlus size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddParticipantsModal;