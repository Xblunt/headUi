// import { AppStore, AuthStore } from "@/stores";
// import { APP_STORE, AUTH_STORE } from "@/stores/identifiers";
// import { getValidToken } from "@/utils/authToken";
// import { get, post } from "@/utils/fetchWrapper";
// import Injector from "@/utils/injector";

// class AppService {
//   private static instance: AppService;
//   private appStore: AppStore;
//   private authStore: AuthStore;

//   private constructor() {
//     this.appStore = Injector.get<AppStore>(APP_STORE);
//     this.authStore = Injector.get<AuthStore>(AUTH_STORE);
//   }

//   static getInstance(): AppService {
//     if (!AppService.instance) {
//       AppService.instance = new AppService();
//     }
//     return AppService.instance;
//   }

//   async updateFile(file: File, path: string): Promise<string> {
//     const token = getValidToken();
//     this.appStore.setIsLoadingFile(true);
//     try {
//       const formData = new FormData();
//       formData.append('file', file);
//       const response = await post(path, formData, token);
//       this.appStore.setIsLoadingFile(false);
//       return response;
//     } catch (error) {
//       console.error('Ошибка загруки файла:', error);
//       this.appStore.setIsLoadingFile(false);
//       throw error;
//     }
//   };

//   async fetchCertificate(): Promise<void> {
//     const token = getValidToken() !== null;

//     if (token) {
//       this.appStore.setIsLoadingFile(true);
//       const response = await get(`certificate`, {});
//       if (response) {
//         this.appStore.setCertificate(response);
//       } else {
//         console.error("Ошибка при загрузке сертификата");
//         throw new Error('Не удалось загрузить сертификат');
//       }
//       this.appStore.setIsLoadingFile(false);
//     } else {
//       this.authStore.setNotHaveToken(true);
//     }

    
//   };
// }

// export default AppService;
