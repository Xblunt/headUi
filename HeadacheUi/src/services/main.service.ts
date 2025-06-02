// import { Main } from "@/models";
// import { AuthStore, MainStore } from "@/stores";
// import { AUTH_STORE, MAIN_STORE } from "@/stores/identifiers";
// import { getValidToken } from "@/utils/authToken";
// import { get, post } from "@/utils/fetchWrapper";
// import Injector from "@/utils/injector";

// class MainService {
//   private static instance: MainService;
//   private mainStore: MainStore;
//   private authStore: AuthStore;

//   private constructor() {
//     this.mainStore = Injector.get<MainStore>(MAIN_STORE);
//     this.authStore = Injector.get<AuthStore>(AUTH_STORE);
//   }

//   static getInstance(): MainService {
//     if (!MainService.instance) {
//       MainService.instance = new MainService();
//     }
//     return MainService.instance;
//   }

//   async fetchMain(): Promise<void> {
//     const token = getValidToken() !== null;
//     if (token) {
//       const response = await get(`main`, {});
//       if (response) {
//         const data = JSON.parse(response);
//         this.mainStore.setMain(data);
//       } else {
//         console.error('Ошибка при загрузки данных главной страницы');
//         throw new Error('Не удалось загрузить данные главной страницы');
//       }
//     } else {
//       this.authStore.setNotHaveToken(true);
//     }
//   };

//   async updateMain(main: Main): Promise<Main> {
//     const token = getValidToken();
//     this.mainStore.setLoading(true);
//     try {
//       const response = await post(`main`, JSON.stringify(main), token);
//       if (response) {
//         const newMain = JSON.parse(response);
//         this.mainStore.setMain(newMain);
//         this.mainStore.setLoading(false);
//         return newMain;
//       } else {
//         console.error('Ошибка при обновлении данных главной страницы');
//       }
//       throw new Error("Unable to update main");
//     } finally { }
//   };
// }

// export default MainService;
