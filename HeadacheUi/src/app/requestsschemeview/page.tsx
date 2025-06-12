'use client';

import s from './style.module.scss';

const RequestsSchemeViewPage = () => {
  return (
    <div className={s.modalOverlay}>
      <div className={s.modalContent}>
        <button className={s.closeButton}>[ × ]</button>
        <div className={s.modalTitle}>[ Заявка на сотрудничество ]</div>
        <div className={s.modalBody}>
          <div className={s.modalDate}>[ 01.01.2024 12:00 ]</div>
          <div className={s.modalLabel}>[ Лейбл: ... ]</div>
          <div className={s.modalMessage}>[ Сообщение ]</div>
          <div className={s.modalActions}>
            <button className={s.rejectButton}>[ Отклонить ]</button>
            <button className={s.approveButton}>[ Одобрить ]</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestsSchemeViewPage;
