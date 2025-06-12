'use client';

import s from './style.module.scss';

const ChatsCreatePage = () => {
  return (
    <div className={s.modalBackdrop}>
      <div className={s.modalWindow}>
        <div className={s.modalHeader}>
          <span className={s.modalTitle}>Создать новый чат</span>
        </div>
        <div className={s.modalContent}>
          {/* Название чата */}
          <div className={s.formGroup}>
            <label className={s.formLabel}>Название чата</label>
            <div className={s.inputPlaceholder}>[ input ]</div>
          </div>
          {/* Поиск участников */}
          <div className={s.formGroup}>
            <label className={s.formLabel}>Поиск участников</label>
            <div className={s.inputPlaceholder}>[ input ]</div>
          </div>
          {/* Участники */}
          <div className={s.formGroup}>
            <label className={s.formLabel}>Участники</label>
            <div className={s.participantsList}>
              {[...Array(5)].map((_, i) => (
                <div key={i} className={s.participantRow}>[ Участник ]</div>
              ))}
            </div>
          </div>
          {/* Кнопки */}
          <div className={s.modalFooter}>
            <button className={s.saveButton}>Создать</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatsCreatePage;
