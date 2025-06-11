'use client';

import s from './style.module.scss';

const MusicshemeInfoPage = () => {
  return (
    <div className={s.modalBackdrop}>
      <div className={s.modalWindow}>
        <div className={s.modalHeader}>
          <span className={s.modalTitle}>[ Информация о треке ]</span>
        </div>
        <div className={s.modalContent}>
          <div className={s.infoRow}>
            <div className={s.coverPlaceholder}>[ Обложка ]</div>
            <div className={s.infoBlock}>
              <div className={s.infoItem}>
                <span className={s.label}>[ Название ]</span>
                <span className={s.value}>[ ... ]</span>
              </div>
              <div className={s.infoItem}>
                <span className={s.label}>[ Артист ]</span>
                <span className={s.value}>[ ... ]</span>
              </div>
              <div className={s.infoItem}>
                <span className={s.label}>[ Статус ]</span>
                <span className={s.value}>[ ... ]</span>
              </div>
              <div className={s.infoItem}>
                <span className={s.label}>[ Рейтинг ]</span>
                <span className={s.value}>[ ... ]</span>
              </div>
              <div className={s.infoItem}>
                <span className={s.label}>[ Дата загрузки ]</span>
                <span className={s.value}>[ ... ]</span>
              </div>
              <div className={s.infoItem}>
                <span className={s.label}>[ Файл ]</span>
                <span className={s.value}>[ ... ]</span>
              </div>
              <div className={s.infoItem}>
                <span className={s.label}>[ Теги ]</span>
                <span className={s.value}>[ ... ]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicshemeInfoPage;
