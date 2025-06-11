'use client';

import s from './style.module.scss';

const UsersshemeAddPage = () => {
  return (
    <div className={s.wrapper} style={{ maxWidth: 750, width: 750, margin: '40px auto', border: '2px solid #000', borderRadius: 12, padding: '32px 28px' }}>
      <div className={s.formTitle}>[ Создать пользователя ]</div>
      <form className={s.form}>
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
        <div className={s.formActions}>
          <button className={s.cancelButton}>[ Отмена ]</button>
          <button className={s.saveButton}>[ Создать ]</button>
        </div>
      </form>
    </div>
  );
};

export default UsersshemeAddPage;
