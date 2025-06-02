'use client';

import { FC, useState, useRef, useEffect } from 'react';
import s from './style.module.scss';

import { usePathname, useRouter } from 'next/navigation';
import 'primeicons/primeicons.css';
import { userTabs } from '@/mocks/other.mocks';

interface User {
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export const Header: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userAvatarRef = useRef<HTMLDivElement>(null);
  
  const user: User = {
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    role: 'Администратор'
  };

   if (pathname.includes('chats/session') || pathname.includes('login') || pathname.includes('register')) {
    return null;
  }

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

  return (
    <header className={s.header}>
      <div className={s.tabContainer}>
        {userTabs.map((tab, idx) => {
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
          <img src={user.avatar} alt="User Avatar" />
          <div 
            className={`${s.userInfo} ${isUserMenuVisible ? s.visible : ''}`}
            ref={userMenuRef}
          >
            <div className={s.userName}>{user.name}</div>
            <div className={s.userEmail}>{user.email}</div>
            <div className={s.userRole}>{user.role}</div>
            <div className={s.userActions}>
            <button className={s.infoButton} disabled={pathname.includes(`/info`)}  onClick={() => !pathname.includes('/info') && router.push('/info')}>
                Личный кабинет
              </button>
              <button className={s.logoutButton}>
                Выйти
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};