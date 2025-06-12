'use client';

import s from './style.module.scss';

const MainAlbumInfoPage = () => {
  return (
    <div className={s.modalBackdrop}>
      <div className={s.modalWindow}>
        <div className={s.modalHeader}>
          <span className={s.modalTitle}>[ Альбом: Название ]</span>
        </div>
        <div className={s.modalContent}>
          <div className={s.albumCover}>[ Обложка ]</div>
          <div className={s.albumInfoBlock}>
            <div className={s.albumTitle}>[ Название ]</div>
            <div className={s.albumArtist}>[ Артист ]</div>
            <div className={s.albumTracksTitle}>[ Треки ]</div>
            <div className={s.albumTracksList}>
              {[...Array(5)].map((_, i) => (
                <div key={i} className={s.albumTrackRow}>[ Трек ]</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainAlbumInfoPage;
