'use client';

import s from './style.module.scss';

const MainShemePage = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.mainContent}>
        <div className={s.mainTitle}>[ Выберите список ]</div>
        <div className={s.tabsGrid}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={s.tabCard}>
              <div className={s.tabIcon}>[icon]</div>
              <div className={s.tabTitle}>[ Название ]</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainShemePage;
