// import { Career } from "@/models";
// import { AuthStore, CareerStore } from "@/stores";
// import { AUTH_STORE, CAREER_STORE } from "@/stores/identifiers";
// import { getValidToken } from "@/utils/authToken";
// import { get, post } from "@/utils/fetchWrapper";
// import Injector from "@/utils/injector";

// class CareerService {
//   private static instance: CareerService;
//   private careerStore: CareerStore;
//   private authStore: AuthStore;

//   private constructor() {
//     this.careerStore = Injector.get<CareerStore>(CAREER_STORE);
//     this.authStore = Injector.get<AuthStore>(AUTH_STORE);
//   }

//   static getInstance(): CareerService {
//     if (!CareerService.instance) {
//       CareerService.instance = new CareerService();
//     }
//     return CareerService.instance;
//   }

//   async fetchCareers(): Promise<void> {
//     const token = getValidToken() !== null;
//     if (token) {
//       const response = await get(`career`, {});
//       if (response) {
//         const data = JSON.parse(response);
//         this.careerStore.setCareers(data);
//       } else {
//         console.error('Ошибка при загрузки данных страницы "Карьера"');
//         throw new Error('Не удалось загрузить данные страницы "Карьера"');
//       }
//     } else {
//       this.authStore.setNotHaveToken(true);
//     }
//   };

//   async updateCareers(careers: Career[]): Promise<Career[]> {
//     const token = getValidToken();
//     this.careerStore.setLoading(true);
//     try {
//       const response = await post(`career`, JSON.stringify(careers), token);
//       if (response) {
//         const newCareers = JSON.parse(response);
//         this.careerStore.setCareers(newCareers);
//         this.careerStore.setLoading(false);
//         return newCareers;
//       } else {
//         console.error('Ошибка при обновлении данных страницы "Карьера"');
//       }
//       throw new Error("Unable to update career");
//     } finally { }
//   };
// }

// export default CareerService;
