'use client';

import s from './style.module.scss';

const MainSchemePage = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>[ Header ]</div>
      <div className={s.musicApp}>
        <div className={s.swiperSection}>
          <div className={s.swiperPlaceholder}>[ Слайдер промо и новинок ]</div>
        </div>
        <div className={s.section}>
          <div className={s.sectionTitle}>[ Рекомендованные треки ]</div>
          <div className={s.songsGrid}>
            {[...Array(5)].map((_, i) => (
              <div key={i} className={s.songCard}>[ Трек ]</div>
            ))}
          </div>
          <div className={s.tracksList}>
            {[...Array(3)].map((_, i) => (
              <div key={i} className={s.trackRow}>[ Трек ]</div>
            ))}
          </div>
        </div>
        <div className={s.section}>
          <div className={s.sectionTitle}>[ Рекомендованные альбомы ]</div>
          <div className={s.albumsGrid}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className={s.albumCard}>[ Альбом ]</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSchemePage;
