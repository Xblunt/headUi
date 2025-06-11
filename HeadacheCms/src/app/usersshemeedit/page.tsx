'use client';

import s from './style.module.scss';

const UsersshemeEditPage = () => {
  return (
    <div className={s.modalBackdrop}>
      <div className={s.modalWindow}>
        <div className={s.modalHeader}>
          <span className={s.modalTitle}>[ Редактировать пользователя ]</span>
        </div>
        <div className={s.modalContent}>
          <div className={s.formGroup}>
            <label className={s.formLabel}>[ Имя пользователя* ]</label>
            <div className={s.inputPlaceholder}>[ Input ]</div>
          </div>
          <div className={s.formGroup}>
            <label className={s.formLabel}>[ Пароль* ]</label>
            <div className={s.inputPlaceholder}>[ Input ]</div>
          </div>
          <div className={s.formGroup}>
            <label className={s.formLabel}>[ Email* ]</label>
            <div className={s.inputPlaceholder}>[ Input ]</div>
          </div>
          <div className={s.formGroup}>
            <label className={s.formLabel}>[ Телефон ]</label>
            <div className={s.inputPlaceholder}>[ Input ]</div>
          </div>
          <div className={s.formGroup}>
            <label className={s.formLabel}>[ Дата рождения ]</label>
            <div className={s.inputPlaceholder}>[ Input ]</div>
          </div>
          <div className={s.formGroup}>
            <label className={s.formLabel}>[ Описание ]</label>
            <div className={s.inputPlaceholder}>[ Input ]</div>
          </div>
          <div className={s.formGroup}>
            <label className={s.formLabel}>[ Фото ]</label>
            <div className={s.inputPlaceholder}>[ Input ]</div>
          </div>
          <div className={s.formGroup}>
            <label className={s.formLabel}>[ Роль* ]</label>
            <div className={s.inputPlaceholder}>[ Dropdown ]</div>
          </div>
          <div className={s.formGroup}>
            <label className={s.formLabel}>[ Статус ]</label>
            <div className={s.inputPlaceholder}>[ Switch ]</div>
          </div>
          <div className={s.modalFooter}>
            <button className={s.cancelButton}>[ Отмена ]</button>
            <button className={s.saveButton}>[ Сохранить ]</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersshemeEditPage;
