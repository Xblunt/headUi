'use client';

import s from './style.module.scss';

const MusicshemePage = () => {
  return (
    <div className={"wrapper"}>
      <div className={s.header}>
        <div className={s.tabsPlaceholder}>
          <span className={s.tab}>[ Ожидают ]</span>
          <span className={s.tab}>[ Одобрены ]</span>
          <span className={s.tab}>[ Отклонены ]</span>
        </div>
        <div className={s.controls}>
          <div className={s.searchContainer}>
            <div className={s.inputPlaceholder}>[ Поиск ]</div>
          </div>
          <div className={s.sortContainer}>
            <div className={s.dropdownPlaceholder}>[ Сортировка ]</div>
          </div>
        </div>
      </div>
      <div className={s.trackList}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className={s.trackRowWrapper}>
            <div className={s.trackInfo}>
              <div className={s.coverPlaceholder}>[ Обложка ]</div>
              <div className={s.trackMeta}>
                <div className={s.trackName}>[ Название ]</div>
                <div className={s.artistName}>[ Артист ]</div>
                <div className={s.tagsPlaceholder}>[ #тег #тег2 ]</div>
              </div>
            </div>
            <div className={s.actionsAndStarsRow}>
              <div className={s.actions}>
                <span>[👁]</span>
                <span>[✏️]</span>
                <span>[✔️]</span>
                <span>[✖️]</span>
              </div>
              <div className={s.ratingStarsRow}>[ ★★★☆☆ ]</div>
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

export default MusicshemePage;
