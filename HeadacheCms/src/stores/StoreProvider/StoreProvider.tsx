'use client';

import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { 
  AUTH_STORE, 
  ALL_STORE,
  ALBUM_STORE,
  SONG_STORE,
  USER_STORE,
  PROMOTION_STORE,
  COOPERATION_STORE,
  CHAT_STORE,
  MAIN_STORE
} from "../identifiers";
import Injector from "@/utils/injector";
import AuthStore from "../auth.store";
import AllStore from "../all.store";
import AlbumStore from "../album.store";
import SongStore from "../song.store";
import UserStore from "../user.store";
import PromotionStore from "../promotion.store";
import CooperationStore from "../cooperation.store";
import ChatStore from "../chat.store";
import MainStore from "../main.store";

interface StoreContextValue {
  authStore: AuthStore;
  allStore: AllStore;
  albumStore: AlbumStore;
  songStore: SongStore;
  userStore: UserStore;
  promotionStore: PromotionStore;
  cooperationStore: CooperationStore;
  chatStore: ChatStore;
  mainStore: MainStore;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  const [rootStore, setRootStore] = useState<StoreContextValue | undefined>();

  useEffect(() => {
    setRootStore({
      authStore: new AuthStore(),
      allStore: new AllStore(),
      albumStore: new AlbumStore(),
      songStore: new SongStore(),
      userStore: new UserStore(),
      promotionStore: new PromotionStore(),
      cooperationStore: new CooperationStore(),
      chatStore: new ChatStore(),
      mainStore: new MainStore(),
    });
  }, []);

  if (rootStore) {
    Injector.register(AUTH_STORE, rootStore.authStore);
    Injector.register(ALL_STORE, rootStore.allStore);
    Injector.register(ALBUM_STORE, rootStore.albumStore);
    Injector.register(SONG_STORE, rootStore.songStore);
    Injector.register(USER_STORE, rootStore.userStore);
    Injector.register(PROMOTION_STORE, rootStore.promotionStore);
    Injector.register(COOPERATION_STORE, rootStore.cooperationStore);
    Injector.register(CHAT_STORE, rootStore.chatStore);
    Injector.register(MAIN_STORE, rootStore.mainStore);

    return (
      <StoreContext.Provider value={{ ...rootStore }}>
        {children}
      </StoreContext.Provider>
    );
  }
};

export default StoreProvider;
