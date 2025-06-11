'use client';

import s from './style.module.scss';

const AlbumsshemeInfoPage = () => {
  return (
    <div className={s.modalBackdrop}>
      <div className={s.modalWindow}>
        <div className={s.modalHeader}>
          <span className={s.modalTitle}>[ Информация об альбоме ]</span>
        </div>
        <div className={s.modalContent}>
          <div className={s.albumModalImage}>[ Обложка ]</div>
          <div className={s.infoRow}>
            <span className={s.infoLabel}>[ Название: ]</span>
            <span className={s.infoValue}>[ ... ]</span>
          </div>
          <div className={s.infoRow}>
            <span className={s.infoLabel}>[ Артист: ]</span>
            <span className={s.infoValue}>[ ... ]</span>
          </div>
          <div className={s.infoRow}>
            <span className={s.infoLabel}>[ Треки: ]</span>
            <span className={s.infoValue}>[ ... ]</span>
          </div>
          <div className={s.infoRow}>
            <span className={s.infoLabel}>[ Дата создания: ]</span>
            <span className={s.infoValue}>[ ... ]</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumsshemeInfoPage;
