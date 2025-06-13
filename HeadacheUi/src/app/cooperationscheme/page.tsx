'use client';

import s from './style.module.scss';

const CooperationschemePage = () => (
  <div className={s.wrapper}>
    {/* <div className={s.schemeHeader}>[ Заявки на сотрудничество ]</div> */}
    <div className={s.schemeGrid}>
      {/* Ожидают */}
      <div className={s.schemeColumn}>
        <div className={s.schemeColumnTitle}>[ Ожидают ]</div>
        <div className={s.schemeCard}>
          <div className={s.schemeAuthor}>[ Автор: логин ]</div>
          <div className={s.schemeMsg}>[ Сообщение ]</div>
          <div className={s.schemeStatus}>[ Статус: Ожидает ]</div>
          <div className={s.schemeEditBtn}>[ Редактировать ]</div>
        </div>
      </div>
      {/* Одобрено */}
      <div className={s.schemeColumn}>
        <div className={s.schemeColumnTitle}>[ Одобрено ]</div>
        <div className={s.schemeCard}>
          <div className={s.schemeAuthor}>[ Автор: логин ]</div>
          <div className={s.schemeMsg}>[ Сообщение ]</div>
          <div className={s.schemeStatus}>[ Статус: Одобрено ]</div>
        </div>
      </div>
      {/* Отклонено */}
      <div className={s.schemeColumn}>
        <div className={s.schemeColumnTitle}>[ Отклонено ]</div>
        <div className={s.schemeCard}>
          <div className={s.schemeAuthor}>[ Автор: логин ]</div>
          <div className={s.schemeMsg}>[ Сообщение ]</div>
          <div className={s.schemeStatus}>[ Статус: Отклонено ]</div>
        </div>
      </div>
    </div>
  </div>
);

export default CooperationschemePage;
