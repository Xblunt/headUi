'use client';

import s from './style.module.scss';

const ChatsShemeDelPage = () => {
  return (
    <div className={s.modalBackdrop}>
      <div className={s.modalWindow}>
        <div className={s.modalHeader}>
          <span className={s.modalTitle}>[ Подтверждение удаления ]</span>
        </div>
        <div className={s.modalContent}>
          <div className={s.iconPlaceholder}>[ ! ]</div>
          <div className={s.messagePlaceholder}>
            [ Вы действительно хотите удалить чат "<b>Название чата</b>"? ]
          </div>
          <div className={s.dialogActions}>
            <button className={s.rejectButton}>[ Нет ]</button>
            <button className={s.acceptButton}>[ Да ]</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatsShemeDelPage;
