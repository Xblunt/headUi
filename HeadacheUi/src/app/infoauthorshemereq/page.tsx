'use client';

import s from './style.module.scss';

const InfoAuthorShemeReqPage = () => {
  return (
    <div className={s.modalOverlay}>
      <div className={s.modalContent}>
        <button className={s.closeButton}>[ × ]</button>
        <h2 className={s.modalTitle}>
          [ Отправить заявку на сотрудничество автору <span style={{ color: '#7c192a' }}>[login]</span> ]
        </h2>
        <textarea className={s.modalTextarea} rows={4} placeholder="[ Ваше сообщение ]" />
        <button className={s.modalSendButton}>[ Отправить ]</button>
      </div>
    </div>
  );
};

export default InfoAuthorShemeReqPage;
