'use client';

import s from './style.module.scss';

const TracksSchemePage = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.tabs}>
        <button className={`${s.tab} ${s.active}`}>Треки</button>
        <button className={s.tab}>Альбомы</button>
      </div>
      <div className={s.tabContent}>
        <div className={s.searchContainer}>
          <div className={s.inputPlaceholder}>[ Поиск треков или исполнителей ]</div>
        </div>
        <div className={s.filters}>
          <div className={s.tagFilter}>
            <div className={s.tagsList}>
              {[...Array(4)].map((_, i) => (
                <span key={i} className={s.tag}>[ #тег ]</span>
              ))}
            </div>
          </div>
          <div className={s.sortControls}>
            <div className={s.sortSelect}>[ Сортировка ]</div>
            <div className={s.sortDirectionButton}>[ ↑↓ ]</div>
          </div>
        </div>
        <div className={s.tracksList}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className={s.trackRow}>[ Трек ]</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TracksSchemePage;
