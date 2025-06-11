'use client';

import s from './style.module.scss';

const ShatShemeInfoPage = () => {
  return (
    <div className={s.modalBackdrop}>
      <div className={s.modalWindow}>
        <div className={s.modalHeader}>
          <span className={s.modalTitle}>[ Чат: Название ]</span>
        </div>
        <div className={s.modalContent}>
          <div className={s.detailSection}>
            <div className={s.sectionTitle}>[ Участники ]</div>
            <div className={s.participantsList}>
              {[...Array(3)].map((_, i) => (
                <div key={i} className={s.participantPlaceholder}>
                  [ Имя ] [ Роль ]
                </div>
              ))}
            </div>
          </div>
          <div className={s.detailSection}>
            <div className={s.sectionTitle}>[ Последнее сообщение ]</div>
            <div className={s.lastMessagePlaceholder}>
              [ Сообщение ]
              <div className={s.messageTimePlaceholder}>[ Время ]</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShatShemeInfoPage;
