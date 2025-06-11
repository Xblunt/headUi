'use client';

import s from './style.module.scss';

const MusicshemeRedPage = () => {
  return (
    <div className={s.modalBackdrop}>
      <div className={s.modalWindow}>
        <div className={s.modalHeader}>
          <span className={s.modalTitle}>[ Редактировать трек ]</span>
        </div>
        <div className={s.modalContent}>
          <div className={s.formSection}>
            <div className={s.label}>[ Название ]</div>
            <div className={s.inputPlaceholder}>[ Input ]</div>
          </div>
          <div className={s.formSection}>
            <div className={s.label}>[ Артист ]</div>
            <div className={s.inputPlaceholder}>[ Input ]</div>
          </div>
          <div className={s.formSection}>
            <div className={s.label}>[ Аудиофайл ]</div>
            <div className={s.inputPlaceholder}>[ Input ]</div>
          </div>
          <div className={s.formSection}>
            <div className={s.label}>[ Обложка ]</div>
            <div className={s.inputPlaceholder}>[ Input ]</div>
          </div>
          <div className={s.formSection}>
            <div className={s.label}>[ Теги ]</div>
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

export default MusicshemeRedPage;
