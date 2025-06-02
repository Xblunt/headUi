// 'use client';

// import { FC, useState } from 'react';
// import s from './style.module.scss';
// // import { tabs } from '@/mocks/other.mock';
// import { usePathname, useRouter } from 'next/navigation';
// import 'primeicons/primeicons.css';

// interface User {
//   name: string;
//   email: string;
//   avatar: string;
//   role: string;
// }

// export const Sidebar: FC = () => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  
//   const user: User = {
//     name: 'Иван Иванов',
//     email: 'ivan@example.com',
//     avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
//     role: 'Администратор'
//   };

//   return (
//     <div className={s.sidebar}>
//       <div className={s.tabContainer}>
//         {tabs.map((tab, idx) => {
//           const isActive = pathname.includes(`/${tab.link}`);

//           return (
//             <button  
//               key={idx}  
//               className={`${s.tab} ${isActive ? s.active : ''}`}
//               onClick={() => router.push(`/${tab.link}`)}
//             >
//               <div className={s.icon}>
//                 {tab.icon && <span style={{ fontSize: '1.5rem' }} className={tab.icon}></span>}
//               </div>
//               <div className={s.tooltip}>{tab.title}</div>
//             </button>
//           );
//         })}
//       </div>

//       <div className={s.userContainer}>
//         <div 
//           className={s.userAvatar}
//           onMouseEnter={() => setIsUserMenuVisible(true)}
//           // onMouseLeave={() => setIsUserMenuVisible(false)}
//         >
//           <img src={user.avatar} alt="User Avatar" />
//           <div 
//             className={`${s.userInfo} ${isUserMenuVisible ? s.visible : ''}`}
//             // onMouseEnter={() => setIsUserMenuVisible(true)}
//             onMouseLeave={() => setIsUserMenuVisible(false)}
//           >
//             <div className={s.userName}>{user.name}</div>
//             <div className={s.userEmail}>{user.email}</div>
//             <div className={s.userRole}>{user.role}</div>
//             <div className={s.userActions}>
//               <button 
//                 className={s.logoutButton}
//               >
//                 Выйти
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };