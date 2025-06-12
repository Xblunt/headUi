'use client';

import s from './style.module.scss';

const LoginSchemeAuthPage = () => {
  return (
    <div className='wrapper'>
    <div className={s.authContainer}>
      <div className={s.authWrapper}>
        <div className={s.welcomePanel}>
          <div className={s.welcomeTitle}>[ С возвращением! ]</div>
          <div className={s.welcomeText}>[ Введите логин и пароль, чтобы войти. ]</div>
          <button className={s.toggleButton}>[ Создать аккаунт ]</button>
        </div>
        <div className={s.formPanel}>
          <div className={s.formTitle}>[ Авторизация ]</div>
          <form>
            <div className={s.formInput}>[ input: Логин ]</div>
            <div className={s.formInput}>[ input: Пароль ]</div>
            <div className={s.buttonWrapper}>
              <button className={s.submitButton}>[ Войти ]</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoginSchemeAuthPage;
