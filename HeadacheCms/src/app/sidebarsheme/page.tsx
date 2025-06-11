'use client';

import s from './style.module.scss';

const SidebarshemePage = () => {
  return (
    <div className={s.sidebar}>
      <div className={s.tabContainer}>
        {[...Array(7)].map((_, idx) => (
          <div key={idx} className={s.tab}>
            <div className={s.icon}>[icon]</div>
            <div className={s.tooltipVisible}>[ Название раздела ]</div>
          </div>
        ))}
      </div>
      <div className={s.userContainer}>
        <div className={s.userAvatar}>
          <div className={s.avatarPlaceholder}>[ Фото ]</div>
          <div className={s.userInfoVisible}>
            <div className={s.userName}>[ Логин ]</div>
            <div className={s.userEmail}>[ Email ]</div>
            <div className={s.userRole}>[ Роль ]</div>
            <div className={s.userActions}>
              <button className={s.logoutButton}>[ Выйти ]</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarshemePage;
