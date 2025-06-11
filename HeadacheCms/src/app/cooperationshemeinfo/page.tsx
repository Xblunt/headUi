'use client';

import s from './style.module.scss';

const CooperationShemeInfoPage = () => {
  return (
    <div className={s.modalBackdrop}>
      <div className={s.modalWindow}>
        <div className={s.modalHeader}>
          <span className={s.modalTitle}>[ Детали запроса на сотрудничество ]</span>
        </div>
        <div className={s.modalContent}>
          <div className={s.detailSection}>
            <div className={s.sectionTitle}>[ Автор ]</div>
            <div className={s.cellPlaceholder}>[ Имя автора ]</div>
          </div>
          <div className={s.detailSection}>
            <div className={s.sectionTitle}>[ Лейбл ]</div>
            <div className={s.cellPlaceholder}>[ Имя лейбла ]</div>
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

export default CooperationShemeInfoPage;
