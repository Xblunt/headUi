'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './style.module.scss';
import { withMask } from 'use-mask-input';

const initialFormData = {
  login: '',
  email: '',
  password: '',
  birthdate: '',
  role: '',
  phone: '',
  description: '',
};

const AuthForm = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const phoneRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('user', formData.login);
    console.log('User logged in:', formData.login);
    setFormData(initialFormData);
    if (formData.login == 'author111') {
      router.push('/title'); 
    } else {
      router.push('/main');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalMessage(`Пользователь ${formData.login} успешно зарегистрирован`);
    setShowModal(true);
    setFormData(initialFormData);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsLogin(true);
  };

  const toggleAuthMode = () => {
    setFormData(initialFormData);
    setIsLogin((prev) => !prev);
  };

  return (
    <div className={styles.authContainer}>
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <p>{modalMessage}</p>
            <button onClick={closeModal} className={styles.modalButton}>
              OK
            </button>
          </div>
        </div>
      )}
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
            onClick={toggleAuthMode}
          >
            {isLogin ? 'Создать аккаунт' : 'Войти'}
          </button>
        </div>

        <div className={styles.formPanel}>
          {isLogin ? (
            <>
              <h2 className={styles.formTitle}>Авторизация</h2>
              <form className={styles.in} onSubmit={handleLoginSubmit}>
                <input
                  className={styles.formInput}
                  type="text"
                  name="login"
                  placeholder="Логин"
                  value={formData.login}
                  onChange={handleChange}
                  required
                />
                <input
                  className={styles.formInput}
                  type="password"
                  name="password"
                  placeholder="Пароль"
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
              <form onSubmit={handleRegisterSubmit}>
                <input
                  type="text"
                  name="login"
                  className={styles.formInput}
                  placeholder="Логин"
                  value={formData.login}
                  onChange={handleChange}
                  required
                />
                <input
                  className={styles.formInput}
                  type="password"
                  name="password"
                  placeholder="Пароль"
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
                  type="text"
                  ref={dateRef}
                  name="birthdate"
                  placeholder="Дата рождения"
                  className={`${styles.formInput} ${styles.coloredInput}`}
                  value={formData.birthdate}
                  onChange={handleChange}
                  required
                />
                <input
                  ref={phoneRef}
                  type="text"
                  name="phone"
                  className={styles.formInput}
                  placeholder="Номер телефона"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
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
                  <label className={styles.roleOption}>
                    <input
                      type="radio"
                      name="role"
                      value="Author"
                      checked={formData.role === 'Author'}
                      onChange={handleChange}
                      required
                    />
                    Автор
                  </label>
                </div>

                <div className={styles.buttonWrapper}>
                  <button type="submit" className={styles.submitButton}>
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