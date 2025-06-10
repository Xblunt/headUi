'use client';

import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const MainPage = observer(() => {
  const router = useRouter();

  useEffect(() => {
    router.push('/auth');
  }, []);

  return <></>; // TODO: сюда бы лоадер
});

export default MainPage;
