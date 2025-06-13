'use client';

import s from './style.module.scss';

const InfoAuthorShemePage = () => {
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
            <button className={s.tabButton + ' ' + s.active}>[ Треки ]</button>
            <button className={s.tabButton}>[ Альбомы ]</button>
          </div>
          <div className={s.tabContent}>
            <div className={s.tracksList}>
              {[...Array(3)].map((_, i) => (
                <div key={i} className={s.trackRow}>
                  <div className={s.trackInfo}>
                    <div className={s.trackImage}> img </div>
                    <div className={s.trackDetails}>
                      <div className={s.trackTitle}>[ Название трека ]</div>
                      <div className={s.trackArtist}>[ Автор ]</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Альбомы (аналогично, если нужно) */}
          </div>
        </div>

        {/* Мини-плеер */}
        {/* <div className={s.miniPlayer}>
          <div className={s.miniPlayerContent}>
            <div className={s.miniPlayerImg}>[ img ]</div>
            <div className={s.miniPlayerTrackInfo}>
              <div className={s.miniPlayerTrackTitle}>[ Название трека ]</div>
              <div className={s.miniPlayerTrackArtist}>[ Автор ]</div>
            </div>
            <div className={s.miniPlayerControls}>
              <button className={s.playerButton}>◀◀ </button>
              <button className={s.playerButton}> ▶ </button>
              <button className={s.playerButton}> ▶▶ </button>
            </div>
            <div className={s.miniPlayerProgress}>
              <span>[ 0:00 ]</span>
              <div className={s.progressBarContainer}>
                <div className={s.progressBar} style={{ width: '30%' }} />
              </div>
              <span>[ 3:21 ]</span>
            </div>
            <div className={s.volumeSlider}>[ Громкость ]</div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default InfoAuthorShemePage;
