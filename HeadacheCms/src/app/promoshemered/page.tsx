'use client';

import s from './style.module.scss';

const PromoshemeRedPage = () => {
  return (
    <div className={s.modalBackdrop}>
      <div className={s.modalWindow}>
        <div className={s.modalHeader}>
          <span className={s.modalTitle}>[ Редактирование промо-заявки ]</span>
        </div>
        <div className={s.modalContent}>
          <div className={s.detailSection}>
            <div className={s.sectionTitle}>[ Песня ]</div>
            <div className={s.cellPlaceholder}>[ Название песни ]</div>
          </div>
          <div className={s.detailSection}>
            <div className={s.sectionTitle}>[ Сообщение ]</div>
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

export default PromoshemeRedPage;
