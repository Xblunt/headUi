'use client';

import { observer } from "mobx-react-lite";
import { FC, PropsWithChildren, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useStores } from "@/utils/hooks/useStores";

export const App: FC<PropsWithChildren> = observer((props) => {
const { authStore } = useStores();
 const router = useRouter();
 const pathname = usePathname();


//  useEffect(() => {
//     if(authStore.notHaveToken) {
//         router.push('/auth')
//     }
//   }, [authStore.notHaveToken]);
 
 useEffect(() => {
    // const token = getValidToken();
  
    // if (token === null) {
    //   router.push('/auth');
    // }

    // if((pathname === '/auth') && (token !== null)){
        // router.push('/main')
    // }
  }, [router]);

  return (
    <>
      {props.children}
    </>
  );
});
