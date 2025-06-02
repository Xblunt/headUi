// import { FeedbackCareer, FeedbackContacts, FeedbackDirection } from "@/models";
// import { getValidToken } from "@/utils/authToken";
// import { get } from "@/utils/fetchWrapper";
// import Injector from "@/utils/injector";
// import { AuthStore } from "@/stores";
// import { AUTH_STORE } from "@/stores/identifiers";

// class FeedbackService {
//   private static instance: FeedbackService;
//   private authStore: AuthStore;

//   private constructor() {
//     this.authStore = Injector.get<AuthStore>(AUTH_STORE);
//   }

//   static getInstance(): FeedbackService {
//     if (!FeedbackService.instance) {
//       FeedbackService.instance = new FeedbackService();
//     }
//     return FeedbackService.instance;
//   }

//   async fetchMainFeedback(): Promise<FeedbackContacts[]> {
//     const token = getValidToken();

//     if (token) {
//       const response = await get(`mail/main`, {}, token);
//       if (response) {
//         const data = JSON.parse(response);
//         return data;
//       } else {
//         console.error('Ошибка при загрузки данных обратной связи');
//         throw new Error('Не удалось загрузить данные обратной связи');
//       }
//     } else {
//       this.authStore.setNotHaveToken(true);
//       return [];
//     }
//   };

//   async fetchDirectionFeedback(): Promise<FeedbackDirection[]> {
//     const token = getValidToken();

//     if (token) {
//       const response = await get(`mail/direction`, {}, token);
//       if (response) {
//         const data = JSON.parse(response);
//         return data;
//       } else {
//         console.error('Ошибка при загрузки данных обратной связи');
//         throw new Error('Не удалось загрузить данные обратной связи');
//       }
//     } else {
//       this.authStore.setNotHaveToken(true);
//       return [];
//     }
//   };

//   async fetchCareerFeedback(): Promise<FeedbackCareer[]> {
//     const token = getValidToken();

//     if (token) {
//       const response = await get(`mail/career`, {}, token);
//       if (response) {
//         const data = JSON.parse(response);
//         return data;
//       } else {
//         console.error('Ошибка при загрузки данных обратной связи');
//         throw new Error('Не удалось загрузить данные обратной связи');
//       }
//     } else {
//       this.authStore.setNotHaveToken(true);
//       return [];
//     }
//   };
// }

// export default FeedbackService;
