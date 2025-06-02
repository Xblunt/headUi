// import { About } from "@/models";
// import { AboutStore, AuthStore } from "@/stores";
// import { ABOUT_STORE, AUTH_STORE } from "@/stores/identifiers";
// import { getValidToken } from "@/utils/authToken";
// import { get, post } from "@/utils/fetchWrapper";
// import Injector from "@/utils/injector";

// class AboutService {
//   private static instance: AboutService;
//   private aboutStore: AboutStore;
//   private authStore: AuthStore;

//   private constructor() {
//     this.aboutStore = Injector.get<AboutStore>(ABOUT_STORE);
//     this.authStore = Injector.get<AuthStore>(AUTH_STORE);
//   }

//   static getInstance(): AboutService {
//     if (!AboutService.instance) {
//       AboutService.instance = new AboutService();
//     }
//     return AboutService.instance;
//   }

//   async fetchAbout(): Promise<void> {
//     const token = getValidToken() !== null;

//     if (token) {
//       const response = await get(`about`, {});
//       if (response) {
//         const data = JSON.parse(response);
//         this.aboutStore.setAbout(data);
//       } else {
//         console.error('Ошибка при загрузки данных страницы "О компании"');
//         throw new Error('Не удалось загрузить данные страницы "О компании"');
//       }
//     } else {
//       this.authStore.setNotHaveToken(true);
//     }
//   };

//   async updateAbout(about: About): Promise<About> {
//     const token = getValidToken();

//     this.aboutStore.setLoading(true);
//     try {
//       const response = await post(`about`, JSON.stringify(about), token);
//       if (response) {
//         const newAbout = JSON.parse(response);
//         this.aboutStore.setAbout(newAbout);
//         this.aboutStore.setLoading(false);
//         return newAbout;
//       } else {
//         console.error('Ошибка при обновлении данных страницы "О компании"');
//       }
//       throw new Error("Unable to update about");
//     } finally { }
//   };
// }

// export default AboutService;
