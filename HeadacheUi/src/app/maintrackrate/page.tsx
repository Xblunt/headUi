'use client';

import s from './style.module.scss';

const MainTrackRatePage = () => {
  return (
    <div className={s.modalBackdrop}>
      <div className={s.modalWindow}>
        <div className={s.modalHeader}>
          <span className={s.modalTitle}>[ Оценить трек ]</span>
        </div>
        <div className={s.modalContent}>
          <div className={s.trackInfo}>[ Название трека ]</div>
          <div className={s.artistInfo}>[ Артист ]</div>
          <div className={s.starsRow}>[ ★★★★☆ ]</div>
          <div className={s.modalFooter}>
            <button className={s.cancelButton}>[ Отмена ]</button>
            <button className={s.saveButton}>[ Оценить ]</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTrackRatePage;
