'use client';

import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { 
  APP_STORE,
  AUTH_STORE, 
  CHATS_STORE, 
  COOPERATION_STORE, 
  INFO_STORE,
  MAIN_STORE, 
  MUSIC_STORE,
  PLAYLIST_STORE,
  PROMO_STORE, 
  REQUESTS_STORE,
  STATISTIC_STORE, 
  TRACKS_STORE
} from "../identifiers";
import Injector from "@/utils/injector";
import AppStore from "../app.store";
import AuthStore from "../auth.store";
import ChatsStore from "../chats.store";
import CooperationStore from "../cooperation.store";
import InfoStore from "../info.store";
import MainStore from "../main.store";
import MusicStore from "../music.store";
import PlaylistStore from "../playlist.store";
import PromoStore from "../promo.store";
import RequestsStore from "../requests.store";
import StatisticStore from "../statistic.store";
import TracksStore from "../tracks.store";

interface StoreContextValue {
  appStore: AppStore;
  authStore: AuthStore;
  chatsStore: ChatsStore;
  cooperationStore: CooperationStore;
  infonStore: InfoStore;
  mainStore: MainStore;
  musicStore: MusicStore;
  playlistStore: PlaylistStore;
  promoStore: PromoStore;
  requestsStore: RequestsStore;
  statisticStore: StatisticStore;
  tracksStore: TracksStore;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  const [rootStore, setRootStore] = useState<StoreContextValue | undefined>();

  useEffect(() => {
    setRootStore({
      appStore: new AppStore(),
      authStore: new AuthStore(),
      chatsStore: new ChatsStore(),
      cooperationStore: new CooperationStore(),
      infonStore: new InfoStore(),
      mainStore: new MainStore(),
      musicStore: new MusicStore(),
      playlistStore: new PlaylistStore(),
      promoStore: new PromoStore(),
      requestsStore: new RequestsStore(),
      statisticStore: new StatisticStore(),
      tracksStore: new TracksStore(),
    });
  }, []);

  if (rootStore) {
    Injector.register(APP_STORE, rootStore.appStore);
    Injector.register(AUTH_STORE, rootStore.authStore);
    Injector.register(CHATS_STORE, rootStore.chatsStore);
    Injector.register(COOPERATION_STORE, rootStore.cooperationStore);
    Injector.register(INFO_STORE, rootStore.infonStore);
    Injector.register(MAIN_STORE, rootStore.mainStore);
    Injector.register(MUSIC_STORE, rootStore.musicStore);
    Injector.register(PLAYLIST_STORE, rootStore.playlistStore);
    Injector.register(PROMO_STORE, rootStore.promoStore);
    Injector.register(REQUESTS_STORE, rootStore.requestsStore);
    Injector.register(STATISTIC_STORE, rootStore.statisticStore);
    Injector.register(TRACKS_STORE, rootStore.tracksStore);

    return (
      <StoreContext.Provider value={{ ...rootStore }}>
        {children}
      </StoreContext.Provider>
    );
  }
};

export default StoreProvider;
