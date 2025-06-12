'use client';

import s from './style.module.scss';

const LoginSchemeRegPage = () => {
  return (
    <div className='wrapper'>
    <div className={s.authContainer}>
      <div className={s.authWrapper}>
        
        <div className={s.formPanel}>
          <div className={s.formTitle}>[ Создать аккаунт ]</div>
          <form>
            <div className={s.formInput}>[ input: Логин ]</div>
            <div className={s.formInput}>[ input: Пароль ]</div>
            <div className={s.formInput}>[ input: Email ]</div>
            <div className={s.formInput}>[ input: Дата рождения ]</div>
            <div className={s.formInput}>[ input: Номер телефона ]</div>
            <div className={s.formInput}>[ textarea: Описание ]</div>
            <div className={s.roleWrapper}>
              <div className={s.roleOption}>[ Роль ]</div>
              <div className={s.roleOption}>[ Роль ]</div>
              <div className={s.roleOption}>[ Роль ]</div>
            </div>
            <div className={s.buttonWrapper}>
              <button className={s.submitButton}>[ Зарегистрироваться ]</button>
            </div>
          </form>
          
        </div>
        <div className={s.welcomePanel}>
          <div className={s.welcomeTitle}>[ Приятно познакомиться! ]</div>
          <div className={s.welcomeText}>[ Зарегистрируйтесь, если у вас ещё нет аккаунта. ]</div>
          <button className={s.toggleButton}>[ Войти ]</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoginSchemeRegPage;
