// components/CreateChatModal/CreateChatModal.tsx
'use client';

import { FiX, FiCheck, FiUser } from 'react-icons/fi';
import { User } from '@/models';
import s from './style.module.scss';
import { useState } from 'react';

interface CreateChatModalProps {
  users: User[];
  onClose: () => void;
  onCreate: (chatName: string, selectedUsers: User[]) => void;
}

const CreateChatModal = ({ users, onClose, onCreate }: CreateChatModalProps) => {
  const [chatName, setChatName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const filteredUsers = users.filter(user =>
    user.login.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleUserSelection = (user: User) => {
    setSelectedUsers((prev: any) =>
      prev.some((u: any) => u.uuid === user.uuid)
        ? prev.filter((u: any) => u.uuid !== user.uuid)
        : [...prev, user]
    );
  };

  const handleCreate = () => {
    if (chatName.trim() && selectedUsers.length > 0) {
      onCreate(chatName, selectedUsers);
      onClose();
    }
  };

  return (
    <div className={s.modalOverlay} onClick={onClose}>
      <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
       <button className={s.closeButton} onClick={onClose}>×</button>
        
        <h3 className={s.modalTitle}>Создать новый чат</h3>
        
        <input
          type="text"
          placeholder="Название чата"
          value={chatName}
          onChange={(e) => setChatName(e.target.value)}
          className={s.chatNameInput}
        />
        
        <div className={s.searchContainer}>
          <input
            type="text"
            placeholder="Поиск пользователей..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={s.searchInput}
          />
        </div>
        
        <div className={s.selectedUsers}>
          {selectedUsers.map((user: any) => (
            <div key={user.uuid} className={s.selectedUser}>
              {user.login}
              <button 
                className={s.removeButton}
                onClick={() => toggleUserSelection(user)}
              >
                <FiX size={12} />
              </button>
            </div>
          ))}
        </div>
        
        <div className={s.usersList}>
          {filteredUsers.map(user => (
            <div 
              key={user.uuid} 
              className={s.userItem}
              onClick={() => toggleUserSelection(user)}
            >
              <div className={s.userInfo}>
                <div className={`${s.checkbox} ${selectedUsers.some((u: any) => u.uuid === user.uuid) ? s.checked : ''}`}>
                  {selectedUsers.some((u: any) => u.uuid === user.uuid) && <FiCheck size={12} />}
                </div>
                <div className={s.userAvatar}>
                  <FiUser size={16} />
                </div>
                <div>
                  <div className={s.userName}>{user.login}</div>
                  {user.email && <div className={s.userEmail}>{user.email}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button
          className={s.createButton}
          onClick={handleCreate}
          disabled={!chatName.trim() || selectedUsers.length === 0}
        >
          Создать
        </button>
      </div>
    </div>
  );
};

export default CreateChatModal;