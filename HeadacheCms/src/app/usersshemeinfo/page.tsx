'use client';

import s from './style.module.scss';

const UsersshemeInfoPage = () => {
  return (
    <div className={s.modalBackdrop}>
      <div className={s.modalWindow}>
        <div className={s.modalHeader}>
          <span className={s.modalTitle}>[ Детали пользователя ]</span>
        </div>
        <div className={s.modalContent}>
          <div className={s.userHeader}>
            <div className={s.detailAvatar}>[ Фото ]</div>
            <div className={s.userTitle}>
              <div className={s.userLogin}>[ Логин ]</div>
              <div className={s.userEmail}>[ Email ]</div>
              <span className={s.statusBadge}>[ Статус ]</span>
            </div>
          </div>
          <div className={s.detailGrid}>
            <div className={s.detailItem}>
              <span className={s.detailLabel}>Логин:</span>
              <span>[ ... ]</span>
            </div>
            <div className={s.detailItem}>
              <span className={s.detailLabel}>Email:</span>
              <span>[ ... ]</span>
            </div>
            <div className={s.detailItem}>
              <span className={s.detailLabel}>Телефон:</span>
              <span>[ ... ]</span>
            </div>
            <div className={s.detailItem}>
              <span className={s.detailLabel}>Дата рождения:</span>
              <span>[ ... ]</span>
            </div>
            <div className={s.detailItem}>
              <span className={s.detailLabel}>Описание:</span>
              <span>[ ... ]</span>
            </div>
            <div className={s.detailItem}>
              <span className={s.detailLabel}>Зарегистрирован:</span>
              <span>[ ... ]</span>
            </div>
            <div className={s.detailItem}>
              <span className={s.detailLabel}>Последняя активность:</span>
              <span>[ ... ]</span>
            </div>
          </div>
          <div className={s.detailSection}>
            <div className={s.sectionTitle}>[ Роли ]</div>
            <div className={s.rolesList}>
              <span className={s.roleBadge}>[ Роль ]</span>
              <span className={s.roleBadge}>[ Роль ]</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersshemeInfoPage;
