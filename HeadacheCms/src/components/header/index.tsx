'use client';

import { FC } from "react";
import s from './style.module.scss';
// import logo from '../../../public/dark_logo.svg';
import { useRouter } from "next/navigation";
import { PfButton } from "../ui/button";
import { useStores } from "@/utils/hooks/useStores";
import { keyToken } from "@/mocks/other.mock";

export const Header: FC = () => {
  const router = useRouter();
  const { authStore } = useStores();

  return (
    <div className={s.header}>
      {/* <img src={logo.src} alt="logo" onClick={() => router.push('/')} /> */}
      {/* {'Система управления контентом'} */}
      <PfButton onClick={() => { localStorage.removeItem(keyToken.key); router.push('/auth') }} severity="danger" text={true} icon='pi pi-sign-out' />
    </div>
  );
};
