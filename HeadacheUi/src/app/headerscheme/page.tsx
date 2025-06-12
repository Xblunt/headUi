'use client';

import s from './style.module.scss';

const HeaderSchemePage = () => {
  return (
    <div className={s.headerSchemeWrapper}>
      {/* Хедер */}
      <div className={s.header}>
        <div className={s.tabContainer}>
          <button className={s.tab + ' ' + s.active}>[ Вкладка ]</button>
          <button className={s.tab}>[ Вкладка ]</button>
          <button className={s.tab}>[ Вкладка ]</button>
          <button className={s.tab}>[ Вкладка ]</button>
        </div>
        <div className={s.userContainer}>
          <div className={s.userAvatar}>
            <div className={s.avatarImg}>[ А ]</div>
            <div className={s.userInfo + ' ' + s.visible}>
              <div className={s.userName}>[ Имя пользователя ]</div>
              <div className={s.userEmail}>[ Логин ]</div>
              <div className={s.userRole}>[ Роль ]</div>
              <div className={s.userActions}>
                <button className={s.infoButton}>[ Личный кабинет ]</button>
                <button className={s.logoutButton}>[ Выйти ]</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Выпавшие тултипы всех табов */}
      {/* <div className={s.tabsTooltipsRow}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className={s.tabTooltip}>[ Подсказка вкладки ]</div>
        ))}
      </div> */}
    </div>
  );
};

export default HeaderSchemePage;
