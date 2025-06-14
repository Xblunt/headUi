'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import s from './style.module.scss';
import { User } from '@/models';
import { mockUsers } from '@/mocks/mockUsers';
import { PfInputMask } from '@/components/ui/input-mask';


const UserProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  // Получаем пользователя из localStorage и mockUsers
  useEffect(() => {
    let login = 'firstUser';
    if (typeof window !== 'undefined') {
      login = localStorage.getItem('user') || 'firstUser';
    }
    const found = mockUsers.find(u => u.login === login);
    setUser(found || null);
    setAvatarUrl(found?.urlImage);
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!user) return;
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setUser(prev => prev ? ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }) : null);
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
      setUser(prev => prev ? ({
        ...prev,
        urlImage: url
      }) : null);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Здесь должен быть реальный API-запрос на сохранение
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
    }, 800);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Не указана';
    return new Date(dateString).toLocaleString();
  };

  if (!user) {
    return <div className="wrapper"><div className={s.profileContainer}>Пользователь не найден</div></div>;
  }

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
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="avatar"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '0',
                    display: 'block'
                  }}
                />
              ) : (
                <span style={{ color: '#aaa' }}>Нет аватара</span>
              )}
            </div>
            {isEditing && (
              <label className={s.uploadButton} style={{ marginTop: 12 }}>
                <input 
                  type="file" 
                  accept="image/jpeg, image/png" 
                  style={{ display: 'none' }}
                  onChange={handleAvatarChange}
                />
                {/* <span style={{ cursor: 'pointer', color: '#7c192a' }}>Заменить аватар</span> */}
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
                  <PfInputMask
                    value={user.phoneNumber || ''}
                    // title="Телефон"
                    mask="+9 (999) 999-9999"
                    placeholder="+7 (___) ___-____"
                    name="phoneNumber"
                    onChange={event => {
                      // event.val содержит новое значение
                      setUser(prev => prev ? ({
                        ...prev,
                        phoneNumber: event?.target?.value ?? ''
                      }) : null);
                    }}
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
                  <PfInputMask
                    value={
                      user.birthDate
                        ? user.birthDate
                            .replace(/-/g, '.')
                            .split('T')[0]
                            .split('.').length === 3
                            ? user.birthDate.replace(/-/g, '.').split('T')[0]
                            : user.birthDate
                        : ''
                    }
                    // title="Дата рождения"
                    mask="99.99.9999"
                    placeholder="ДД.ММ.ГГГГ"
                    name="birthDate"
                    onChange={event => {
                      // event.val содержит новое значение
                      const val = event?.target?.value ?? '';
                      const [dd, mm, yyyy] = val.split('.');
                      let iso = '';
                      if (dd && mm && yyyy && dd.length === 2 && mm.length === 2 && yyyy.length === 4) {
                        iso = `${yyyy}-${mm}-${dd}`;
                      }
                      setUser(prev => prev ? ({
                        ...prev,
                        birthDate: iso
                      }) : null);
                    }}
                  />
                ) : (
                  <div className={s.fieldValue}>
                    {user.birthDate
                      ? (() => {
                          const d = user.birthDate.split('T')[0];
                          const [yyyy, mm, dd] = d.split('-');
                          return dd && mm && yyyy ? `${dd}.${mm}.${yyyy}` : user.birthDate;
                        })()
                      : 'Не указана'}
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

              {/* <div className={s.formGroup}>
                <label>Рейтинг</label>
                <div className={s.fieldValue}>{user.avgRating || 'Не указан'}</div>
              </div> */}
            </div>

            {/* <div className={s.section}>
              <h2>Дополнительная информация</h2>
              <div className={s.formGroup}>
                <label>Роли</label>
                <div className={s.fieldValue}>
                  {user.roles?.join(', ') || 'Нет ролей'}
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;