'use client';

import React, { useState } from 'react';
import s from './style.module.scss';
import { Song, PromotionRequest, Album, User, Tag, SongStatus, PromotionStatus } from '@/models';

const mockUser = new User({
  uuid: '550e8400-e29b-41d4-a716-446655440000',
  login: 'music_producer',
  password: 'hashed_password_123',
  roles: ['ARTIST', 'PREMIUM'],
  isAccountNonLocked: true,
  isActive: true,
  description: 'Профессиональный музыкальный продюсер с 10-летним опытом',
  imgFileUUID: 'a1b2c3d4-e5f6-7890',
  phoneNumber: '+7 (999) 123-4567',
  email: 'producer@musicstudio.com',
  birthDate: '1985-05-15',
  createdAt: '2020-01-01T00:00:00Z',
  updatedAt: '2023-05-01T12:34:56Z',
  lastVisitDate: '2023-05-20T18:45:30Z',
  avgRating: 4.8,
  savedSongsUUIDs: ['song1', 'song2', 'song3']
});

const UserProfilePage = () => {
  const [user, setUser] = useState<User>(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setUser(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/user/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        throw new Error('Ошибка сохранения');
      }

      const result = await response.json();
      console.log('Данные сохранены:', result);
      setIsEditing(false);
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Не удалось сохранить изменения');
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Не указана';
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className={"wrapper"}>
         <div className={s.profileContainer}>
      <div className={s.profileHeader}>
        <h1>Личный кабинет</h1>
        <div className={s.actions}>
          {isEditing ? (
            <>
              <button 
                className={s.cancelButton} 
                onClick={() => setIsEditing(false)}
                disabled={isSaving}
              >
                Отмена
              </button>
              <button 
                className={s.saveButton} 
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? 'Сохранение...' : 'Сохранить'}
              </button>
            </>
          ) : (
            <button 
              className={s.editButton} 
              onClick={() => setIsEditing(true)}
            >
              Редактировать
            </button>
          )}
        </div>
      </div>

      <div className={s.profileContent}>
        <div className={s.avatarSection}>
          <div className={s.avatar}>
            {user.imgFileUUID ? 'Аватар' : 'Нет аватара'}
          </div>
          {isEditing && (
            <label className={s.uploadButton}>
              <input 
                type="file" 
                accept="image/jpeg, image/png" 
                style={{ display: 'none' }}
              />
            </label>
          )}
        </div>

        <div className={s.userInfo}>
          <div className={s.section}>
            <h2>Основная информация</h2>
            <div className={s.formGroup}>
              <label>Логин</label>
              {isEditing ? (
                <input
                  type="text"
                  name="login"
                  value={user.login}
                  onChange={handleInputChange}
                />
              ) : (
                <div className={s.fieldValue}>{user.login}</div>
              )}
            </div>

            <div className={s.formGroup}>
              <label>Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={user.email || ''}
                  onChange={handleInputChange}
                />
              ) : (
                <div className={s.fieldValue}>{user.email || 'Не указан'}</div>
              )}
            </div>

            <div className={s.formGroup}>
              <label>Телефон</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phoneNumber"
                  value={user.phoneNumber || ''}
                  onChange={handleInputChange}
                />
              ) : (
                <div className={s.fieldValue}>{user.phoneNumber || 'Не указан'}</div>
              )}
            </div>

            <div className={s.formGroup}>
              <label>Описание</label>
              {isEditing ? (
                <textarea
                  name="description"
                  value={user.description || ''}
                  onChange={handleInputChange}
                />
              ) : (
                <div className={s.fieldValue}>{user.description || 'Не указано'}</div>
              )}
            </div>
               <div className={s.formGroup}>
              <label>Дата рождения</label>
              {isEditing ? (
                <input
                  type="date"
                  name="birthDate"
                  value={user.birthDate?.split('T')[0] || ''}
                  onChange={handleInputChange}
                />
              ) : (
                <div className={s.fieldValue}>
                  {user.birthDate ? new Date(user.birthDate).toLocaleDateString() : 'Не указана'}
                </div>
              )}
            </div>
          </div>
          
          <div className={s.section}>
            <h2>Системная информация</h2>
            <div className={s.formGroup}>
              <label>Дата создания</label>
              <div className={s.fieldValue}>{formatDate(user.createdAt)}</div>
            </div>

            <div className={s.formGroup}>
              <label>Последнее обновление</label>
              <div className={s.fieldValue}>{formatDate(user.updatedAt)}</div>
            </div>

            <div className={s.formGroup}>
              <label>Последний визит</label>
              <div className={s.fieldValue}>{formatDate(user.lastVisitDate)}</div>
            </div>

            <div className={s.formGroup}>
              <label>Рейтинг</label>
              <div className={s.fieldValue}>{user.avgRating || 'Не указан'}</div>
            </div>
          </div>

          <div className={s.section}>
            <h2>Дополнительная информация</h2>
        
            <div className={s.formGroup}>
              <label>Роли</label>
              <div className={s.fieldValue}>
                {user.roles.join(', ')}
              </div>
            </div>

            <div className={s.formGroup}>
              <label>Статус аккаунта</label>
              {isEditing ? (
                <div className={s.checkboxGroup}>
                  <label>
                    <input
                      type="checkbox"
                      name="isAccountNonLocked"
                      checked={user.isAccountNonLocked || false}
                      onChange={handleInputChange}
                    />
                    Аккаунт не заблокирован
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={user.isActive || false}
                      onChange={handleInputChange}
                    />
                    Аккаунт активен
                  </label>
                </div>
              ) : (
                <div className={s.fieldValue}>
                  {user.isAccountNonLocked ? 'Не заблокирован' : 'Заблокирован'}, {user.isActive ? 'Активен' : 'Не активен'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserProfilePage;