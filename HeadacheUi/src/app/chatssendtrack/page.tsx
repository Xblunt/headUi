'use client';

import s from './style.module.scss';

const ChatsSendTrackPage = () => {
  return (
    <div className={s.modalBackdrop}>
      <div className={s.modalWindow}>
        <div className={s.modalHeader}>
          <span className={s.modalTitle}>[ Отправить трек ]</span>
        </div>
        <div className={s.modalContent}>
          <div className={s.formGroup}>
            <label className={s.formLabel}>[ Поиск треков ]</label>
            <div className={s.inputPlaceholder}>[ Input ]</div>
          </div>
          <div className={s.tracksList}>
            {[...Array(3)].map((_, i) => (
              <div key={i} className={s.trackRow}>
                <span className={s.trackName}>[ Название трека ]</span>
                <button className={s.sendButton}> ➤ </button>
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

export default ChatsSendTrackPage;
