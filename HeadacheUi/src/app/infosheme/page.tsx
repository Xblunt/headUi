'use client';

import s from './style.module.scss';

const InfoShemePage = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.profileContainer}>
        <div className={s.profileHeader}>
          <h1>[ Личный кабинет ]</h1>
          <div className={s.actions}>
            <span className={s.editButton}>[ Редактировать ]</span>
          </div>
        </div>
        <div className={s.profileContent}>
          <div className={s.avatarSection}>
            <div className={s.avatar}>[ А ]</div>
            <div className={s.uploadButton}>[ Заменить аватар ]</div>
          </div>
          <div className={s.userInfo}>
            <div className={s.section}>
              <h2>[ Основная информация ]</h2>
              <div className={s.formGroup}>
                {/* <label>[ Логин ]</label> */}
                <div className={s.fieldValue}>[ login ]</div>
              </div>
              <div className={s.formGroup}>
                {/* <label>[ Email ]</label> */}
                <div className={s.fieldValue}>[ email ]</div>
              </div>
              <div className={s.formGroup}>
                {/* <label>[ Телефон ]</label> */}
                <div className={s.fieldValue}>[ +7 (___) ___-____ ]</div>
              </div>
              <div className={s.formGroup}>
                {/* <label>[ Описание ]</label> */}
                <div className={s.fieldValue}>[ описание ]</div>
              </div>
              <div className={s.formGroup}>
                {/* <label>[ Дата рождения ]</label> */}
                <div className={s.fieldValue}>[ ДД.ММ.ГГГГ ]</div>
              </div>
            </div>
            <div className={s.section}>
              <h2>[ Системная информация ]</h2>
              <div className={s.formGroup}>
                <label>[ Дата создания ]</label>
                <div className={s.fieldValue}>[ 01.01.2020 ]</div>
              </div>
              <div className={s.formGroup}>
                <label>[ Последнее обновление ]</label>
                <div className={s.fieldValue}>[ 01.01.2024 ]</div>
              </div>
              <div className={s.formGroup}>
                <label>[ Последний визит ]</label>
                <div className={s.fieldValue}>[ 01.01.2024 ]</div>
              </div>
              <div className={s.formGroup}>
                <label>[ Рейтинг ]</label>
                <div className={s.fieldValue}>[ 4.8 ]</div>
              </div>
            </div>
            {/* <div className={s.section}>
              <h2>[ Дополнительная информация ]</h2>
              <div className={s.formGroup}>
                <label>[ Роли ]</label>
                <div className={s.fieldValue}>[ user, artist ]</div>
              </div>
              <div className={s.formGroup}>
                <label>[ Статус аккаунта ]</label>
                <div className={s.fieldValue}>[ Аккаунт не заблокирован, Аккаунт активен ]</div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoShemePage;
