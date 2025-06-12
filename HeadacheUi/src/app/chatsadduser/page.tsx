'use client';

import s from './style.module.scss';

const ChatsAddUserPage = () => {
  return (
    <div className={s.modalBackdrop}>
      <div className={s.modalWindow}>
        <div className={s.modalHeader}>
          <span className={s.modalTitle}>[ Добавить участников ]</span>
        </div>
        <div className={s.modalContent}>
          <div className={s.formGroup}>
            <label className={s.formLabel}>[ Поиск пользователей ]</label>
            <div className={s.inputPlaceholder}>[ Input ]</div>
          </div>
          <div className={s.usersList}>
            {[...Array(5)].map((_, i) => (
              <div key={i} className={s.userRow}>
                <span className={s.userAvatar}>A</span>
                <span className={s.userName}>[ Имя ]</span>
                <button className={s.addButton}> + </button>
              </div>
            ))}
          </div>
          <div className={s.modalFooter}>
            <button className={s.cancelButton}>[ Закрыть ]</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatsAddUserPage;
