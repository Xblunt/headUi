'use client';

import { FC, useState, useRef, useEffect } from 'react';
import s from './style.module.scss';
import { usePathname, useRouter } from 'next/navigation';
import 'primeicons/primeicons.css';
import { userTabs, authorTabs, labelTabs } from '@/mocks/other.mocks';

interface User {
  name: string;
  email: string;
  avatar: string;
  role: string;
}

const USERS_DB: Record<string, User> = {
  'firstUser': {
    name: 'Иван Иванов',
    email: 'ivan@mail.ru',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    role: 'Слушатель'
  },
   'secondtUser': {
    name: 'Илья Ильин',
    email: 'ilya@mail.ru',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    role: 'Слушатель'
  },
  'author111': {
    name: 'Алексей Петров',
    email: 'alex@mail.ru',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    role: 'Автор'
  },
  'label78': {
    name: 'Мария Сидорова',
    email: 'maria@mail.ru',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    role: 'Лейбл'
  },
  'default': {
    name: 'Петр Петрович',
    email: 'petr@mail.ru',
    avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
    role: 'Гость'
  }
};

export const Header: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>(USERS_DB['default']);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userAvatarRef = useRef<HTMLDivElement>(null);

  // Определяем какие вкладки показывать
  const getTabsForUser = () => {
    const userKey = localStorage.getItem('user') || 'default';
    
    switch(userKey) {
      case 'label78':
        return labelTabs;
      case 'author111':
        return authorTabs;
      case 'firstUser':
      case 'secondtUser':
      default:
        return userTabs;
    }
  };

  const currentTabs = getTabsForUser();
  const isAuthor = localStorage.getItem('user') === 'author111';

  useEffect(() => {
    const handleStorageChange = () => {
      const userKey = localStorage.getItem('user') || 'default';
      setCurrentUser(USERS_DB[userKey] || USERS_DB['default']);
    };

    handleStorageChange();
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && userAvatarRef.current) {
        if (
          !userMenuRef.current.contains(event.target as Node) &&
          !userAvatarRef.current.contains(event.target as Node)
        ) {
          setIsUserMenuVisible(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleUserMenu = () => {
    setIsUserMenuVisible(!isUserMenuVisible);
  };

  if (pathname.includes('chats/session') || pathname.includes('login') || pathname.includes('register')) {
    return null;
  }

  return (
    <header className={`${s.header} ${isAuthor ? s.authorHeader : ''}`}>
      <div className={s.tabContainer}>
        {currentTabs.map((tab, idx) => {
          const isActive = pathname.includes(`/${tab.link}`);

          return (
            <button  
              key={idx}  
              className={`${s.tab} ${isActive ? s.active : ''}`}
              onClick={() => router.push(`/${tab.link}`)}
            >
              {tab.title}
            </button>
          );
        })}
      </div>

      <div className={s.userContainer}>
        <div 
          className={s.userAvatar}
          onClick={toggleUserMenu}
          ref={userAvatarRef}
        >
          <img src={currentUser.avatar} alt="User Avatar" />
          <div 
            className={`${s.userInfo} ${isUserMenuVisible ? s.visible : ''}`}
            ref={userMenuRef}
          >
            <div className={s.userName}>{currentUser.name}</div>
            <div className={s.userEmail}>{currentUser.email}</div>
            <div className={s.userRole}>{currentUser.role}</div>
            <div className={s.userActions}>
              <button 
                className={s.infoButton} 
                disabled={pathname.includes('/info')}  
                onClick={() => !pathname.includes('/info') && router.push('/info')}
              >
                Личный кабинет
              </button>
              <button 
                className={s.logoutButton} 
                onClick={() => {
                  localStorage.removeItem('user');
                  router.push('login');
                }}
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};