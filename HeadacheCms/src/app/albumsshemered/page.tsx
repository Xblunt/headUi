'use client';

import s from './style.module.scss';

const AlbumsshemeRedPage = () => {
  return (
    <div className={s.modalBackdrop}>
      <div className={s.modalWindow}>
        <div className={s.modalHeader}>
          <span className={s.modalTitle}>[ Редактировать альбом ]</span>
        </div>
        <div className={s.modalContent}>
          <div className={s.formSection}>
            <div className={s.label}>[ Название альбома ]</div>
            <div className={s.inputPlaceholder}>[ Input ]</div>
          </div>
          <div className={s.formSection}>
            <div className={s.label}>[ Обложка ]</div>
            <div className={s.inputPlaceholder}>[ Input ]</div>
          </div>
          <div className={s.formSection}>
            <div className={s.label}>[ Артист ]</div>
            <div className={s.inputPlaceholder}>[ Input ]</div>
          </div>
          <div className={s.formSection}>
            <div className={s.label}>[ Треки ]</div>
            <div className={s.inputPlaceholder}>[ Input ]</div>
          </div>
          <div className={s.dialogActions}>
            <button className={s.cancelButton}>[ Отмена ]</button>
            <button className={s.saveButton}>[ Сохранить ]</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumsshemeRedPage;
