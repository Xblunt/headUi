'use client';

import s from './style.module.scss';

const RequestsSchemePage = () => {
  return (
    <div className='wrapper'>
    <div className={s.requestsPage}>
      <div className={s.requestsContainer}>
        {/* Ожидают решения */}
        <div className={s.requestsColumn}>
          <div className={s.columnTitle}>[ Ожидают решения (2) ]</div>
          <ul className={s.requestsList}>
            {[...Array(2)].map((_, i) => (
              <li key={i} className={s.requestCard}>
                <div className={s.requestHeader}>
                  <span className={s.requestDate}>[ 01.01.2024 12:00 ]</span>
                </div>
                <p className={s.labelLogin}>[ Лейбл: ... ]</p>
                <p className={s.requestMessage}>[ Сообщение ]</p>
                <button className={s.viewButton}>[ Просмотреть ]</button>
              </li>
            ))}
          </ul>
        </div>
        {/* Одобренные */}
        <div className={s.requestsColumn}>
          <div className={s.columnTitle}>[ Одобренные (1) ]</div>
          <ul className={s.requestsList}>
            <li className={s.requestCard}>
              <div className={s.requestHeader}>
                <span className={s.requestDate}>[ 02.01.2024 13:00 ]</span>
                <span className={s.approvedStatus}>[ ✓ ]</span>
              </div>
              <p className={s.labelLogin}>[ Лейбл: ... ]</p>
              <p className={s.requestMessage}>[ Сообщение ]</p>
              <button className={s.viewButton}>[ Информация о лейбле ]</button>
            </li>
          </ul>
        </div>
        {/* Отклоненные */}
        <div className={s.requestsColumn}>
          <div className={s.columnTitle}>[ Отклоненные (1) ]</div>
          <ul className={s.requestsList}>
            <li className={s.requestCard}>
              <div className={s.requestHeader}>
                <span className={s.requestDate}>[ 03.01.2024 14:00 ]</span>
                <span className={s.rejectedStatus}>[ ✗ ]</span>
              </div>
              <p className={s.labelLogin}>[ Лейбл: ... ]</p>
              <p className={s.requestMessage}>[ Сообщение ]</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
};

export default RequestsSchemePage;
