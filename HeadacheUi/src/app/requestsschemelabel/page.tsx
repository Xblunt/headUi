'use client';

import s from './style.module.scss';

const RequestsSchemeLabelPage = () => {
  return (
    <div className={s.modalOverlay}>
      <div className={s.modalContent}>
        <button className={s.closeButton}>[ × ]</button>
        <div className={s.modalTitle}>[ Информация о лейбле ]</div>
        <div className={s.modalBody}>
          <div className={s.labelInfo}>
            <div className={s.labelName}>[ Название лейбла ]</div>
            <div className={s.labelDescription}>[ Описание лейбла ]</div>
            <div className={s.labelContacts}>
              <div>[ Email: ... ]</div>
              <div>[ Телефон: ... ]</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestsSchemeLabelPage;
