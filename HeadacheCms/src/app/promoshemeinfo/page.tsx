'use client';

import s from './style.module.scss';

const PromoshemeInfoPage = () => {
  return (
    <div className={s.modalBackdrop}>
      <div className={s.modalWindow}>
        <div className={s.modalHeader}>
          <span className={s.modalTitle}>[ Детали промо-заявки ]</span>
        </div>
        <div className={s.modalContent}>
          <div className={s.detailSection}>
            <div className={s.sectionTitle}>[ Песня ]</div>
            <div className={s.cellPlaceholder}>[ Название песни ]</div>
          </div>
          <div className={s.detailSection}>
            <div className={s.sectionTitle}>[ Артист ]</div>
            <div className={s.cellPlaceholder}>[ Логин артиста ]</div>
          </div>
          <div className={s.detailSection}>
            <div className={s.sectionTitle}>[ Статус ]</div>
            <div className={s.cellPlaceholder}>[ Статус ]</div>
          </div>
          <div className={s.detailSection}>
            <div className={s.sectionTitle}>[ Дата отправки ]</div>
            <div className={s.cellPlaceholder}>[ Дата ]</div>
          </div>
       
          <div className={s.detailSection}>
            <div className={s.sectionTitle}>[ Сообщение ]</div>
            <div className={s.messageContent}>[ Сообщение ]</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoshemeInfoPage;
