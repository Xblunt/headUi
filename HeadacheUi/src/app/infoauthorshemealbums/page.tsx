'use client';

import s from './style.module.scss';

const InfoAuthorShemeAlbumsPage = () => {
  return (
    <div className={'wrapper'}>
      <div className={s.artistPage}>
        {/* Header */}
        <div className={s.headerBlock}>
          <div className={s.headerOverlay} />
          <div className={s.headerContent}>
            <h1 className={s.artistName}>[ login ]</h1>
            <p className={s.artistRating}>[ Рейтинг: 4.8 ⭐ ]</p>
            <button className={s.requestButton}>[ Отправить заявку ]</button>
          </div>
        </div>

        {/* Статистика */}
        <div className={s.statisticsBlock}>
          <div className={s.statItem}>
            <span className={s.statValue}>[ 12345 ]</span>
            <span className={s.statLabel}>[ Прослушивания ]</span>
          </div>
          <div className={s.statItem}>
            <span className={s.statValue}>[ 2345 ]</span>
            <span className={s.statLabel}>[ Лайки ]</span>
          </div>
          <div className={s.statItem}>
            <span className={s.statValue}>[ 789 ]</span>
            <span className={s.statLabel}>[ Подписчики ]</span>
          </div>
          <div className={s.statItem}>
            <span className={s.statValue}>[ 4 ]</span>
            <span className={s.statLabel}>[ Альбомы ]</span>
          </div>
          <div className={s.statItem}>
            <span className={s.statValue}>[ 12 ]</span>
            <span className={s.statLabel}>[ Треки ]</span>
          </div>
        </div>

        {/* Tabs */}
        <div className={s.tabsBlock}>
          <div className={s.tabsHeader}>
            <button className={s.tabButton}>[ Треки ]</button>
            <button className={s.tabButton + ' ' + s.active}>[ Альбомы ]</button>
          </div>
          <div className={s.tabContent}>
            <div className={s.albumsList}>
              {[...Array(2)].map((_, i) => (
                <div key={i} className={s.albumCard}>
                  <div className={s.albumImage}>[ img ]</div>
                  <div className={s.albumTitle}>[ Название альбома ]</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Мини-плеер */}
        {/* ...можно добавить мини-плеер по аналогии, если требуется... */}
      </div>
    </div>
  );
};

export default InfoAuthorShemeAlbumsPage;
