'use client';

import s from '../tracksscheme/style.module.scss';

const AlbumsSchemePage = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.tabs}>
        <button className={s.tab}>Треки</button>
        <button className={`${s.tab} ${s.active}`}>Альбомы</button>
      </div>
      <div className={s.tabContent}>
        <div className={s.searchContainer}>
          <div className={s.inputPlaceholder}>[ Поиск альбомов или исполнителей ]</div>
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
        <div className={s.albumsGrid}>
          {[...Array(4)].map((_, i) => (
            <div key={i} className={s.albumCard}>[ Альбом ]</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumsSchemePage;
