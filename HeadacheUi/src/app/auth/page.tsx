'use client';

import { AuthData } from "@/models";
import { AuthService } from "@/services";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import s from './style.module.scss';
import { PfInputText } from "@/components/ui/input-text";
import { PfButton } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { PfPassword } from "@/components/ui/input-password";

const AuthPageSettings = observer(() => {
  const router = useRouter();
  const authService = AuthService.getInstance();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<AuthData>({
    username: '',
    password: ''
  });

  const handleClick = async () => {
    setError('');
    setLoading(true);

    try {
      const result = await authService.singIn(data);
      if (result) {
        router.push('/main');
        setLoading(false);
      }
    } catch (err) {
      setError('Неверный логин или пароль');
      setLoading(false);
    }
  };

  const disableButton = () => {
    return !(data.username && data.password);
  };

  return (
    <div className={s.authContainer}>
      <div className={s.title}>
      <h2>Вход</h2>
      <h3>Система управления котентом</h3>
      </div>
      <div className={s.authWrapper}>
        <PfInputText
          title={'Логин'}
          placeholder={'Логин'}
          value={data?.username}
          onChange={(e) => {
            setData((prev) => ({
              ...prev,
              ['username']: e.target.value,
            }));
          }}
          required
        />
        <PfPassword
          className={s.password}
          toggleMask={true}
          feedback={false}
          title={'Пароль'}
          placeholder={'Пароль'}
          value={data?.password}
          onChange={(e) => {
            setData((prev) => ({
              ...prev,
              ['password']: e.target.value,
            }));
          }}
          required
        />
        <PfButton
          className={s.authButton}
          onClick={handleClick}
          label={'Войти'}
          loading={loading}
          disabled={disableButton()}
        />
        {<div className={s.errorMessage}>{error}</div>}
      </div>
    </div>
  );
});

export default AuthPageSettings;
