'use client';

import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { 
  // ABOUT_STORE, 
  // APP_STORE, 
  AUTH_STORE, 
  ALL_STORE
  // CAREER_STORE, 
  // CONTACTS_STORE, 
  // DIRECTION_STORE, 
  // MAIN_STORE,
  // NEWS_STORE
} from "../identifiers";
// import AppStore from "../app.store";
import Injector from "@/utils/injector";
// import MainStore from "../main.store";
// import NewsStore from "../news.store"
// import DirectionStore from "../direction.store";
// import CareerStore from "../career.store";
// import AboutStore from "../about.store";
// import ContactsStore from "../contacts.store";
import AuthStore from "../auth.store";
import AllStore from "../all.store";

interface StoreContextValue {
  // appStore: AppStore;
  authStore: AuthStore;
  allStore: AllStore;
  // mainStore: MainStore;
  // newsStore: NewsStore;
  // directionStore: DirectionStore;
  // careerStore: CareerStore;
  // aboutStore: AboutStore;
  // contactsStore: ContactsStore;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  const [rootStore, setRootStore] = useState<StoreContextValue | undefined>();

  useEffect(() => {
    setRootStore({
      // Создаем экземпляры сторов
      // appStore: new AppStore(),
      authStore: new AuthStore(),
      allStore: new AllStore(),
      // mainStore: new MainStore(),
      // newsStore: new NewsStore(),
      // directionStore: new DirectionStore(),
      // careerStore: new CareerStore(),
      // aboutStore: new AboutStore(),
      // contactsStore: new ContactsStore(),
    });
  }, []);

  // Регистрируем сторы в инжекторе
  if (rootStore) {
    // Injector.register(APP_STORE, rootStore.appStore);
    Injector.register(AUTH_STORE, rootStore.authStore);
    Injector.register(ALL_STORE, rootStore.allStore);
    // Injector.register(MAIN_STORE, rootStore.mainStore);
    // Injector.register(NEWS_STORE, rootStore.newsStore);
    // Injector.register(DIRECTION_STORE, rootStore.directionStore);
    // Injector.register(CAREER_STORE, rootStore.careerStore);
    // Injector.register(ABOUT_STORE, rootStore.aboutStore);
    // Injector.register(CONTACTS_STORE, rootStore.contactsStore);

    return (
      <StoreContext.Provider value={{ ...rootStore }}>
        {children}
      </StoreContext.Provider>
    );
  }
};

export default StoreProvider;
