'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './style.module.scss';
import { withMask } from 'use-mask-input';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    login: '',
    email: '',
    password: '',
    birthdate: '',
    role: '',
    phone: '',
    description: '',
  });



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className={styles.authContainer}>
      <div className={`${styles.authWrapper} ${isLogin ? styles.login : styles.signup}`}>
        <div className={styles.welcomePanel}>
          <h1 className={styles.welcomeTitle}>
            {isLogin ? 'С возвращением!' : 'Приятно познакомиться!'}
          </h1>
          <p className={styles.welcomeText}>
            {isLogin
              ? 'Введите логин и пароль, чтобы войти.'
              : 'Зарегистрируйтесь, если у вас ещё нет аккаунта.'}
          </p>
          <button
            className={styles.toggleButton}
            onClick={() => setIsLogin((prev) => !prev)}
          >
            {isLogin ? 'Создать аккаунт' : 'Войти'}
          </button>
        </div>

        <div className={styles.formPanel}>
          {isLogin ? (
            <>
              <h2 className={styles.formTitle}>Авторизация</h2>
              <form className={styles.in} onSubmit={handleSubmit}>
                <input
                  className={styles.formInput}
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  className={styles.formInput}
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <div className={styles.buttonWrapper}>
                  <button type="submit" className={styles.submitButton}>
                    Войти
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <h2 className={styles.formTitle}>Создать аккаунт</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="login"
                  className={styles.formInput}
                  placeholder="Login"
                  value={formData.login}
                  onChange={handleChange}
                  required
                />
                <input
                  className={styles.formInput}
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  className={styles.formInput}
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="date"
                  name="birthdate"
                  className={`${styles.formInput} ${styles.coloredInput}`}
                  value={formData.birthdate}
                  onChange={handleChange}
                  required
                />
{/* 
                <input
                  ref={phoneRef}
                  type="tel"
                  name="phone"
                  className={styles.formInput}
                  placeholder="+7 (___) ___-__-__"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                /> */}
                 <input
                 ref={withMask('+7 (999) 999-99-99')} 
                  type="text"
                  name="phone"
                  className={styles.formInput}
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
{/* <input ref={inputRef} type="tel"   required   onChange={handleChange}  value={formData.phone}   name="phone"    className={styles.formInput} placeholder="+7 (___) ___-__-__" />; */}
                <textarea
                  name="description"
                  className={styles.formInput}
                  placeholder="Описание"
                  value={formData.description}
                  onChange={handleChange}
                  style={{ resize: 'none' }}
                />

                <div className={styles.roleWrapper}>
                  <label className={styles.roleOption}>
                    <input
                      type="radio"
                      name="role"
                      value="User"
                      checked={formData.role === 'User'}
                      onChange={handleChange}
                      required
                    />
                    Пользователь
                  </label>
                  <label className={styles.roleOption}>
                    <input
                      type="radio"
                      name="role"
                      value="Label"
                      checked={formData.role === 'Label'}
                      onChange={handleChange}
                      required
                    />
                    Лейбл
                  </label>
                </div>

                <div className={styles.buttonWrapper}>
                  <button type="submit" className={styles.submitButton} onClick={()=> console.log('reg', formData)}>
                    Зарегистрироваться
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
