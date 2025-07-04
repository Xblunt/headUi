'use client';

import { observer } from "mobx-react-lite";
import { FC, PropsWithChildren, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useStores } from "@/utils/hooks/useStores";

export const App: FC<PropsWithChildren> = observer((props) => {
  const { authStore } = useStores();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
  }, [router]);

  return (
    <>
      {props.children}
    </>
  );
});
