'use client';

import s from './style.module.scss';

const AlbumsshemePage = () => {
  return (
    <div className={'wrapper'}>
      <div className={s.header}>
        <div className={s.controls}>
          <div className={s.searchContainer}>
            <div className={s.inputPlaceholder}>[ Поиск ]</div>
          </div>
          <div className={s.sortContainer}>
            <div className={s.dropdownPlaceholder}>[ Сортировка ]</div>
          </div>
        </div>
      </div>
      <div className={s.albumList}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className={s.albumCard}>
            <div className={s.albumImage}>[ Обложка ]</div>
            <div className={s.albumInfo}>
              <div className={s.albumTitle}>[ Название ]</div>
              <div className={s.albumArtist}>[ Артист ]</div>
              <div className={s.songsCount}>[ 5 треков ]</div>
            </div>
            <div className={s.albumActions}>
              <span>[👁]</span>
              <span>[✏️]</span>
              <span>[🗑]</span>
            </div>
          </div>
        ))}
        {/* <div className={s.emptyState}>[ Пустое состояние ]</div> */}
      </div>
      <div className={s.pagination}>
        <div className={s.paginationPlaceholder}>[ Пагинация ]</div>
      </div>
    </div>
  );
};

export default AlbumsshemePage;
