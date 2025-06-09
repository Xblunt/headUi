// app/users/page.tsx
'use client';

import { useState, useRef } from "react";
import { User } from "@/models";
import { PfInputText } from "@/components/ui/input-text";
import { Dropdown } from 'primereact/dropdown';
import s from './style.module.scss';
import { Pagination } from "@/components/pagination";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { TabMenu } from 'primereact/tabmenu';
import { ILink } from "@/models";
import { mockUsers } from '@/mocks/mockUsers';

const roleOptions = [
  { label: 'Автор', value: 'ARTIST' },
  { label: 'Лейбл', value: 'LABEL' },
  { label: 'Администратор', value: 'ADMIN' },
  { label: 'Слушатель', value: 'USER' },
];

const roleTabs: ILink[] = [
  { label: 'Все', icon: 'pi pi-users' },
  { label: 'Авторы', icon: 'pi pi-user' },
  { label: 'Лейблы', icon: 'pi pi-building' },
  { label: 'Администраторы', icon: 'pi pi-shield' },
  { label: 'Слушатели', icon: 'pi pi-eye' },
  { label: 'Заблокированные', icon: 'pi pi-ban' },
];

type SortOption = {
  label: string;
  value: string;
};

const UsersPage = () => {
  // Списки пользователей для каждого таба
  const [allUsers, setAllUsers] = useState<User[]>(mockUsers);
  const [authors, setAuthors] = useState<User[]>(mockUsers.filter(u => u.roles.includes('ARTIST') && u.isAccountNonLocked && u.isActive));
  const [labels, setLabels] = useState<User[]>(mockUsers.filter(u => u.roles.includes('LABEL') && u.isAccountNonLocked && u.isActive));
  const [admins, setAdmins] = useState<User[]>(mockUsers.filter(u => u.roles.includes('ADMIN') && u.isAccountNonLocked && u.isActive));
  const [listeners, setListeners] = useState<User[]>(mockUsers.filter(u => u.roles.includes('USER') && u.isAccountNonLocked && u.isActive));
  const [banned, setBanned] = useState<User[]>(mockUsers.filter(u => !u.isAccountNonLocked || !u.isActive));

  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<string>('login-asc');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUser, setNewUser] = useState<Partial<User>>({
    login: '',
    email: '',
    roles: [],
    isAccountNonLocked: true,
    isActive: true
  });
  const itemsPerPage = 5;

  const phoneRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const sortOptions: SortOption[] = [
    { label: 'По логину (A-Z)', value: 'login-asc' },
    { label: 'По логину (Z-A)', value: 'login-desc' },
    { label: 'По дате регистрации (новые)', value: 'date-desc' },
    { label: 'По дате регистрации  (старые)', value: 'date-asc' },
  ];

  // Получить список пользователей для текущего таба
  const getUsersForTab = () => {
    switch (activeTab) {
      case 0: return allUsers.filter(u => u.isAccountNonLocked && u.isActive);
      case 1: return authors;
      case 2: return labels;
      case 3: return admins;
      case 4: return listeners;
      case 5: return banned;
      default: return allUsers;
    }
  };

  // Сортировка
  const sortUsers = (users: User[]) => {
    return [...users].sort((a, b) => {
      switch (sortOption) {
        case 'login-asc': return a.login.localeCompare(b.login);
        case 'login-desc': return b.login.localeCompare(a.login);
        case 'date-asc': return (a.createdAt || '').localeCompare(b.createdAt || '');
        case 'date-desc': return (b.createdAt || '').localeCompare(a.createdAt || '');
        default: return 0;
      }
    });
  };

  // Фильтрация
  const filteredUsers = sortUsers(
    getUsersForTab().filter(user => {
      const searchMatch = searchQuery === '' ||
        user.login.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.email?.toLowerCase() || '').includes(searchQuery.toLowerCase());
      return searchMatch;
    })
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // --- Обновление списков при изменении пользователя ---
  const updateAllLists = (updatedUsers: User[]) => {
    setAllUsers(updatedUsers);
    setAuthors(updatedUsers.filter(u => u.roles.includes('ARTIST') && u.isAccountNonLocked && u.isActive));
    setLabels(updatedUsers.filter(u => u.roles.includes('LABEL') && u.isAccountNonLocked && u.isActive));
    setAdmins(updatedUsers.filter(u => u.roles.includes('ADMIN') && u.isAccountNonLocked && u.isActive));
    setListeners(updatedUsers.filter(u => u.roles.includes('USER') && u.isAccountNonLocked && u.isActive));
    setBanned(updatedUsers.filter(u => !u.isAccountNonLocked || !u.isActive));
  };

  // --- Блокировка/разблокировка пользователя ---
  const handleToggleBan = (userId: string) => {
    const updatedUsers = allUsers.map(user =>
      user.uuid === userId
        ? { ...user, isAccountNonLocked: !user.isAccountNonLocked, isActive: !user.isActive }
        : user
    );
    updateAllLists(updatedUsers);
  };

  // --- Изменение ролей пользователя ---
  const handleUpdateRoles = (userId: string, newRoles: string[]) => {
    const updatedUsers = allUsers.map(user =>
      user.uuid === userId
        ? { ...user, roles: newRoles }
        : user
    );
    updateAllLists(updatedUsers);
  };

  // --- Создание пользователя ---
  const handleCreateUser = () => {
    if (!newUser.login || !newUser.email || !newUser.roles || newUser.roles.length === 0 || !newUser.password) return;
    const user = new User({
      uuid: `user-${Date.now()}`,
      login: newUser.login,
      email: newUser.email,
      roles: newUser.roles,
      isAccountNonLocked: newUser.isAccountNonLocked ?? true,
      isActive: newUser.isActive ?? true,
      password: newUser.password,
      phoneNumber: newUser.phoneNumber,
      birthDate: newUser.birthDate,
      description: newUser.description,
      urlImage: newUser.urlImage,
      createdAt: new Date().toISOString(),
      lastVisitDate: new Date().toISOString()
    });
    const updatedUsers = [user, ...allUsers];
    updateAllLists(updatedUsers);
    setNewUser({
      login: '',
      email: '',
      roles: [],
      isAccountNonLocked: true,
      isActive: true,
      password: '',
      phoneNumber: '',
      birthDate: '',
      description: '',
      urlImage: undefined
    });
    setShowCreateModal(false);
    if (phoneRef.current) phoneRef.current.value = '';
    if (dateRef.current) dateRef.current.value = '';
    // Переключаемся на таб, куда попал пользователь
    if (!user.isAccountNonLocked || !user.isActive) setActiveTab(5);
    else if (user.roles.includes('ARTIST')) setActiveTab(1);
    else if (user.roles.includes('LABEL')) setActiveTab(2);
    else if (user.roles.includes('ADMIN')) setActiveTab(3);
    else if (user.roles.includes('USER')) setActiveTab(4);
    else setActiveTab(0);
    setCurrentPage(1);
  };

  const handleCancelCreate = () => {
    setNewUser({
      login: '',
      email: '',
      roles: [],
      isAccountNonLocked: true,
      isActive: true,
      password: '',
      phoneNumber: '',
      birthDate: '',
      description: '',
      urlImage: undefined
    });
    setShowCreateModal(false);
    if (phoneRef.current) phoneRef.current.value = '';
    if (dateRef.current) dateRef.current.value = '';
  };

  // --- Сброс пагинации при смене таба ---
  const handleTabChange = (e: any) => {
    setActiveTab(e.index);
    setCurrentPage(1);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className={"wrapper"}>
      <div className={s.header}>
        {/* <h1>User Management</h1> */}
        
        <TabMenu
          className={s.tabs}
          model={roleTabs}
          activeIndex={activeTab}
          onTabChange={handleTabChange}
        />
        
        <div className={s.controls}>
          <div className={s.searchContainer}>
            <PfInputText
              value={searchQuery}
              style={{width: '100%'}}
              onChange={(e) => setSearchQuery(e.target.value)}
              title="Поиск..."
              placeholder="Username or email"
            />
          </div>
          
          <div className={s.sortContainer}>
            <Dropdown
              value={sortOption}
              options={sortOptions}
              onChange={(e) => setSortOption(e.value)}
              placeholder="Sort by"
              className={s.sortDropdown}
            />
          </div>
          
          <Button 
            label="Создать" 
            icon="pi pi-plus" 
            className={s.createButton}
            onClick={() => setShowCreateModal(true)}
          />
        </div>
      </div>

      <div className={s.userList}>
        {paginatedUsers.length > 0 ? (
          <table className={s.usersTable}>
            <thead>
              <tr>
                <th>Пользователь</th>
                <th>Роли</th>
                <th>Зарегистрирован</th>
                <th>Последняя активность</th>
                <th>Статус</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.uuid} className={!user.isAccountNonLocked ? s.bannedUser : ''}>
                  <td>
                    <div className={s.userCell} onClick={() => setSelectedUser(user)}>
                      <img 
                        src={user.urlImage || 'https://via.placeholder.com/40'} 
                        alt={user.login} 
                        className={s.userAvatar}
                      />
                      <div className={s.userInfo}>
                        <div className={s.userLogin}>{user.login}</div>
                        <div className={s.userEmail}>{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Dropdown
                      value={user.roles}
                      options={roleOptions}
                      onChange={(e) => handleUpdateRoles(user.uuid, e.value)}
                      optionLabel="label"
                      optionValue="value"
                      placeholder={Array.isArray(user.roles) && user.roles.length > 0
                        ? user.roles.map(r => {
                            const found = roleOptions.find(opt => opt.value === r);
                            return found ? found.label : r;
                          }).join(', ')
                        : "Выберите роли"}
                      className={s.rolesDropdown}
                      disabled={!user.isAccountNonLocked}
                    />
                  </td>
                  <td>{formatDate(user.createdAt)}</td>
                  <td>{formatDate(user.lastVisitDate)}</td>
                  <td>
                    <span className={`${s.statusBadge} ${
                      user.isAccountNonLocked ? s.active : s.banned
                    }`}>
                      {user.isAccountNonLocked ? 'Активен' : 'Заблокирован'}
                    </span>
                  </td>
                  <td>
                    <div className={s.userActions}>
                      <button 
                        className={`${s.actionButton} ${s.infoButton}`}
                        onClick={() => setSelectedUser(user)}
                        title="Подробнее"
                      >
                        <i className="pi pi-info-circle"></i>
                      </button>
                      <button 
                        className={`${s.actionButton} ${
                          user.isAccountNonLocked ? s.banButton : s.unbanButton
                        }`}
                        onClick={() => handleToggleBan(user.uuid)}
                        title={user.isAccountNonLocked ? 'Заблокировать пользователя' : 'Разблокировать пользователя'}
                      >
                        {user.isAccountNonLocked ? (
                          <i className="pi pi-lock"></i>
                        ) : (
                          <i className="pi pi-lock-open"></i>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={s.emptyState}>
            {searchQuery ? (
              <p>Пользователи не найдены по запросу "{searchQuery}"</p>
            ) : (
              <p>Нет пользователей в этой категории</p>
            )}
          </div>
        )}
      </div>

      <div className={s.pagination}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* User Details Modal */}
      <Dialog 
        visible={!!selectedUser} 
        onHide={() => setSelectedUser(null)}
        header="Детали пользователя"
        className={s.userModal}
        style={{ minWidth: 750, width: 750 }}
      >
        {selectedUser && (
          <div className={s.userDetails}>
            <div className={s.userHeader}>
              <img 
                src={selectedUser.urlImage || 'https://via.placeholder.com/100'} 
                alt={selectedUser.login} 
                className={s.detailAvatar}
              />
              <div className={s.userTitle}>
                <h3>{selectedUser.login}</h3>
                <p>{selectedUser.email}</p>
                <span className={`${s.statusBadge} ${
                  selectedUser.isAccountNonLocked ? s.active : s.banned
                }`}>
                  {selectedUser.isAccountNonLocked ? 'Активен' : 'Заблокирован'}
                </span>
              </div>
            </div>
            <div className={s.detailGrid}>
              <div className={s.detailItem}>
                <span className={s.detailLabel}>Логин:</span>
                <span>{selectedUser.login}</span>
              </div>
              <div className={s.detailItem}>
                <span className={s.detailLabel}>Email:</span>
                <span>{selectedUser.email}</span>
              </div>
              <div className={s.detailItem}>
                <span className={s.detailLabel}>Телефон:</span>
                <span>{selectedUser.phoneNumber || '-'}</span>
              </div>
              <div className={s.detailItem}>
                <span className={s.detailLabel}>Дата рождения:</span>
                <span>{selectedUser.birthDate ? formatDate(selectedUser.birthDate) : '-'}</span>
              </div>
              <div className={s.detailItem}>
                <span className={s.detailLabel}>Описание:</span>
                <span>{selectedUser.description || '-'}</span>
              </div>
              <div className={s.detailItem}>
                <span className={s.detailLabel}>Зарегистрирован:</span>
                <span>{formatDate(selectedUser.createdAt)}</span>
              </div>
              <div className={s.detailItem}>
                <span className={s.detailLabel}>Последняя активность:</span>
                <span>{formatDate(selectedUser.lastVisitDate)}</span>
              </div>
            </div>
            <div className={s.detailSection}>
              <h4>Роли</h4>
              <div className={s.rolesList}>
                {selectedUser.roles.map(role => (
                  <span key={role} className={s.roleBadge}>
                    {roleOptions.find(opt => opt.value === role)?.label || role}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </Dialog>

      {/* Create User Modal */}
      <Dialog 
        visible={showCreateModal} 
        onHide={handleCancelCreate}
        header="Создать пользователя"
        className={s.createModal}
        style={{ minWidth: 750, width: 750 }}
      >
        <div className={s.formGroup}>
          <label className={s.formLabel}>Имя пользователя*</label>
          <InputText
            value={newUser.login}
            onChange={(e) => setNewUser({...newUser, login: e.target.value})}
            className={s.formInput}
            placeholder="Введите имя пользователя"
          />
        </div>
        <div className={s.formGroup}>
          <label className={s.formLabel}>Пароль*</label>
          <InputText
            type="password"
            value={newUser.password || ''}
            onChange={(e) => setNewUser({...newUser, password: e.target.value})}
            className={s.formInput}
            placeholder="Введите пароль"
          />
        </div>
        <div className={s.formGroup}>
          <label className={s.formLabel}>Email*</label>
          <InputText
            value={newUser.email}
            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
            className={s.formInput}
            placeholder="Введите email"
          />
        </div>
        <div className={s.formGroup}>
          <label className={s.formLabel}>Телефон</label>
          <input
            type="text"
            ref={phoneRef}
            name="phone"
            placeholder="Телефон"
            className={s.formInput}
            value={newUser.phoneNumber || ''}
            onChange={(e) => setNewUser({...newUser, phoneNumber: e.target.value})}
          />
        </div>
        <div className={s.formGroup}>
          <label className={s.formLabel}>Дата рождения</label>
          <input
            type="text"
            ref={dateRef}
            name="birthdate"
            placeholder="Дата рождения"
            className={s.formInput}
            value={newUser.birthDate || ''}
            onChange={(e) => setNewUser({...newUser, birthDate: e.target.value})}
          />
        </div>
        <div className={s.formGroup}>
          <label className={s.formLabel}>Описание</label>
          <InputText
            value={newUser.description || ''}
            onChange={(e) => setNewUser({...newUser, description: e.target.value})}
            className={s.formInput}
            placeholder="Описание"
          />
        </div>
        <div className={s.formGroup}>
          <label className={s.formLabel}>Фото</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <input
              type="file"
              accept="image/*"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    setNewUser({ ...newUser, urlImage: ev.target?.result as string });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            {newUser.urlImage && (
              <img
                src={newUser.urlImage}
                alt="Фото пользователя"
                style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, border: '1px solid #ccc' }}
              />
            )}
          </div>
        </div>
        <div className={s.formGroup}>
          <label className={s.formLabel}>Роль*</label>
          <Dropdown
            value={newUser.roles && newUser.roles.length > 0 ? newUser.roles[0] : null}
            options={roleOptions}
            onChange={(e) => setNewUser({...newUser, roles: e.value ? [e.value] : []})}
            optionLabel="label"
            optionValue="value"
            placeholder="Выберите роль"
            className={s.formInput}
          />
        </div>
        <div className={s.formGroup}>
          <label className={s.formLabel}>Статус</label>
          <div className={s.statusToggle}>
            <input
              type="checkbox"
              id="activeStatus"
              checked={newUser.isAccountNonLocked ?? true}
              onChange={(e) => setNewUser({
                ...newUser, 
                isAccountNonLocked: e.target.checked,
                isActive: e.target.checked
              })}
            />
            <label htmlFor="activeStatus">
              {newUser.isAccountNonLocked ? 'Активен' : 'Заблокирован'}
            </label>
          </div>
        </div>
        <div className={s.modalFooter}>
          <Button 
            label="Отмена" 
            icon="pi pi-times" 
            className={s.cancelButton}
            onClick={handleCancelCreate}
          />
          <Button 
            label="Создать" 
            icon="pi pi-check" 
            className={s.confirmButton}
            onClick={() => {
              setNewUser(prev => ({ ...prev, urlImage: '/st.jpg' }));
              setTimeout(() => handleCreateUser(), 0);
            }}
            disabled={!newUser.login || !newUser.email || !newUser.roles || newUser.roles.length === 0 || !newUser.password}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default UsersPage;