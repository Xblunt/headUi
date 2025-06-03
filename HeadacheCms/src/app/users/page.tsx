// app/users/page.tsx
'use client';

import { useState } from "react";
import { User } from "@/models";
import { PfInputText } from "@/components/ui/input-text";
import { Dropdown } from 'primereact/dropdown';
import s from './style.module.scss';
import { Pagination } from "@/components/pagination";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { PfTabMenu } from "@/components/ui/tabmenu";
import { ILink } from "@/models";

// Mock data
const usersMock: User[] = [
  // ... (same mock data as before)
];

const roleOptions = [
  { label: 'Author', value: 'ARTIST' },
  { label: 'Label', value: 'LABEL' },
  { label: 'Admin', value: 'ADMIN' },
  { label: 'User', value: 'USER' },
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
  const [users, setUsers] = useState<User[]>(usersMock);
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

  const sortOptions: SortOption[] = [
    { label: 'По логину (A-Z)', value: 'login-asc' },
    { label: 'По логину (Z-A)', value: 'login-desc' },
    { label: 'По дате регистрации (новые)', value: 'date-desc' },
    { label: 'По дате регистрации  (старые)', value: 'date-asc' },
    // { label: 'По статусу (active first)', value: 'status-asc' },
    // { label: 'By status (banned first)', value: 'status-desc' },
  ];

  const getTabFilter = (index: number) => {
    switch (index) {
      case 0: return 'all';
      case 1: return 'ARTIST';
      case 2: return 'LABEL';
      case 3: return 'ADMIN';
      case 4: return 'MODERATOR';
      case 5: return 'banned';
      default: return 'all';
    }
  };

  const sortUsers = (users: User[]) => {
    return [...users].sort((a, b) => {
      switch (sortOption) {
        case 'login-asc': return a.login.localeCompare(b.login);
        case 'login-desc': return b.login.localeCompare(a.login);
        case 'date-asc': return (a.createdAt || '').localeCompare(b.createdAt || '');
        case 'date-desc': return (b.createdAt || '').localeCompare(a.createdAt || '');
        case 'status-asc': return (a.isAccountNonLocked === b.isAccountNonLocked) ? 0 : a.isAccountNonLocked ? -1 : 1;
        case 'status-desc': return (a.isAccountNonLocked === b.isAccountNonLocked) ? 0 : a.isAccountNonLocked ? 1 : -1;
        default: return 0;
      }
    });
  };

  const filteredUsers = sortUsers(
    users.filter(user => {
      const currentTabFilter = getTabFilter(activeTab);
      
      let roleMatch = false;
      if (currentTabFilter === 'all') {
        roleMatch = true;
      } else if (currentTabFilter === 'banned') {
        roleMatch = !user.isAccountNonLocked || !user.isActive;
      } else {
        roleMatch = user.roles.includes(currentTabFilter);
      }
      
      const searchMatch = searchQuery === '' || 
        user.login.toLowerCase().includes(searchQuery.toLowerCase()) || 
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      return roleMatch && searchMatch;
    })
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleToggleBan = (userId: string) => {
    setUsers(users.map(user => 
      user.uuid === userId ? 
      { ...user, isAccountNonLocked: !user.isAccountNonLocked, isActive: !user.isActive } : 
      user
    ));
  };

  const handleUpdateRoles = (userId: string, newRoles: string[]) => {
    setUsers(users.map(user => 
      user.uuid === userId ? { ...user, roles: newRoles } : user
    ));
  };

  const handleCreateUser = () => {
    if (!newUser.login || !newUser.email || !newUser.roles || newUser.roles.length === 0) return;
    
    const user = new User({
      uuid: `user-${Date.now()}`,
      login: newUser.login,
      email: newUser.email,
      roles: newUser.roles,
      isAccountNonLocked: newUser.isAccountNonLocked ?? true,
      isActive: newUser.isActive ?? true,
      createdAt: new Date().toISOString(),
      lastVisitDate: new Date().toISOString()
    });
    
    setUsers([...users, user]);
    setNewUser({
      login: '',
      email: '',
      roles: [],
      isAccountNonLocked: true,
      isActive: true
    });
    setShowCreateModal(false);
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
        
        <PfTabMenu 
          list={roleTabs} 
          // activeIndex={activeTab} 
          onTabChange={(index) => {
            setActiveTab(index);
            setCurrentPage(1);
          }} 
        />
        
        <div className={s.controls}>
          <div className={s.searchContainer}>
            <PfInputText
              value={searchQuery}
              style={{width: '100%'}}
              onChange={(e) => setSearchQuery(e.target.value)}
              title="Search..."
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
                <th>User</th>
                <th>Roles</th>
                <th>Registered</th>
                <th>Last Active</th>
                <th>Status</th>
                <th>Actions</th>
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
                      placeholder="Select roles"
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
                      {user.isAccountNonLocked ? 'Active' : 'Banned'}
                    </span>
                  </td>
                  <td>
                    <div className={s.userActions}>
                      <button 
                        className={`${s.actionButton} ${s.infoButton}`}
                        onClick={() => setSelectedUser(user)}
                        title="View details"
                      >
                        <i className="pi pi-info-circle"></i>
                      </button>
                      <button 
                        className={`${s.actionButton} ${
                          user.isAccountNonLocked ? s.banButton : s.unbanButton
                        }`}
                        onClick={() => handleToggleBan(user.uuid)}
                        title={user.isAccountNonLocked ? 'Ban user' : 'Unban user'}
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
              <p>No users found for "{searchQuery}"</p>
            ) : (
              <p>No users available in this category</p>
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
        header="User Details"
        className={s.userModal}
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
                  {selectedUser.isAccountNonLocked ? 'Active' : 'Banned'}
                </span>
              </div>
            </div>
            
            <div className={s.detailSection}>
              <h4>Roles</h4>
              <div className={s.rolesList}>
                {selectedUser.roles.map(role => (
                  <span key={role} className={s.roleBadge}>
                    {role}
                  </span>
                ))}
              </div>
            </div>
            
            <div className={s.detailGrid}>
              <div className={s.detailItem}>
                <span className={s.detailLabel}>Registered:</span>
                <span>{formatDate(selectedUser.createdAt)}</span>
              </div>
              <div className={s.detailItem}>
                <span className={s.detailLabel}>Last Active:</span>
                <span>{formatDate(selectedUser.lastVisitDate)}</span>
              </div>
              {selectedUser.phoneNumber && (
                <div className={s.detailItem}>
                  <span className={s.detailLabel}>Phone:</span>
                  <span>{selectedUser.phoneNumber}</span>
                </div>
              )}
              {selectedUser.birthDate && (
                <div className={s.detailItem}>
                  <span className={s.detailLabel}>Birth Date:</span>
                  <span>{formatDate(selectedUser.birthDate)}</span>
                </div>
              )}
            </div>
            
            {selectedUser.description && (
              <div className={s.detailSection}>
                <h4>Description</h4>
                <p>{selectedUser.description}</p>
              </div>
            )}
          </div>
        )}
      </Dialog>

      {/* Create User Modal */}
      <Dialog 
        visible={showCreateModal} 
        onHide={() => setShowCreateModal(false)}
        header="Create New User"
        className={s.createModal}
      >
        <div className={s.formGroup}>
          <label className={s.formLabel}>Username*</label>
          <InputText
            value={newUser.login}
            onChange={(e) => setNewUser({...newUser, login: e.target.value})}
            className={s.formInput}
            placeholder="Enter username"
          />
        </div>
        
        <div className={s.formGroup}>
          <label className={s.formLabel}>Email*</label>
          <InputText
            value={newUser.email}
            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
            className={s.formInput}
            placeholder="Enter email"
          />
        </div>
        
        <div className={s.formGroup}>
          <label className={s.formLabel}>Roles*</label>
          <MultiSelect
            value={newUser.roles}
            options={roleOptions}
            onChange={(e) => setNewUser({...newUser, roles: e.value})}
            optionLabel="label"
            optionValue="value"
            placeholder="Select roles"
            className={s.formInput}
          />
        </div>
        
        <div className={s.formGroup}>
          <label className={s.formLabel}>Status</label>
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
              {newUser.isAccountNonLocked ? 'Active' : 'Banned'}
            </label>
          </div>
        </div>
        
        <div className={s.modalFooter}>
          <Button 
            label="Cancel" 
            icon="pi pi-times" 
            className={s.cancelButton}
            onClick={() => setShowCreateModal(false)}
          />
          <Button 
            label="Create User" 
            icon="pi pi-check" 
            className={s.confirmButton}
            onClick={handleCreateUser}
            disabled={!newUser.login || !newUser.email || !newUser.roles || newUser.roles.length === 0}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default UsersPage;