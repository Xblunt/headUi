'use client';

import s from './style.module.scss';

const MusicSchemePage = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>[ Header ]</div>
      {/* Блок треков */}
      <div className={s.tracksBlock}>
        <div className={s.tabsHeader}>
          <div className={s.tabButton}>[ Одобренные ]</div>
          <div className={s.tabButton}>[ На модерации ]</div>
          <div className={s.tabButton}>[ Отклонённые ]</div>
          <div className={s.createTrackButton}>[ + ]</div>
        </div>
        <div className={s.trackSearchRow}>
          <div className={s.trackSearchInput}>[ Поиск треков... ]</div>
        </div>
        <div className={s.tracksList}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className={s.trackRow}>[ Трек ]</div>
          ))}
        </div>
      </div>
      {/* Блок альбомов */}
      <div className={s.albumsBlock}>
        <div className={s.albumsHeader}>
          <div className={s.albumsTitle}>[ Альбомы ]</div>
          <div className={s.createAlbumButton}>[ + ]</div>
        </div>
        <div className={s.albumSearchRow}>
          <div className={s.albumSearchInput}>[ Поиск альбомов... ]</div>
        </div>
        <div className={s.albumsGridMain}>
          {[...Array(4)].map((_, i) => (
            <div key={i} className={s.albumCard}>[ Альбом ]</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicSchemePage;
