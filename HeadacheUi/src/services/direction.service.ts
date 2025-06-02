// import { Direction } from "@/models";
// import { AuthStore, DirectionStore } from "@/stores";
// import { AUTH_STORE, DIRECTION_STORE } from "@/stores/identifiers";
// import { getValidToken } from "@/utils/authToken";
// import { get, post } from "@/utils/fetchWrapper";
// import Injector from "@/utils/injector";

// class DirectionService {
//   private static instance: DirectionService;
//   private directionStore: DirectionStore;
//   private authStore: AuthStore;

//   private constructor() {
//     this.directionStore = Injector.get<DirectionStore>(DIRECTION_STORE);
//     this.authStore = Injector.get<AuthStore>(AUTH_STORE);
//   }

//   static getInstance(): DirectionService {
//     if (!DirectionService.instance) {
//       DirectionService.instance = new DirectionService();
//     }
//     return DirectionService.instance;
//   }

//   async fetchDirections(): Promise<void> {
//     const token = getValidToken() !== null;
//     if (token) {
//       const response = await get(`direction`, {});
//       if (response) {
//         const data = JSON.parse(response);
//         this.directionStore.setDirections(data);
//       } else {
//         console.error('Ошибка при загрузки данных страницы "Наши направления"');
//         throw new Error('Не удалось загрузить данные страницы "Наши направления"');
//       }
//     } else {
//       this.authStore.setNotHaveToken(true);
//     }
//   };

//   async updateDirection(direction: Direction): Promise<Direction> {
//     const token = getValidToken();
//     this.directionStore.setLoading(true);
//     try {
//       const response = await post(`direction`, JSON.stringify(direction), token);
//       if (response) {
//         const newDirection = JSON.parse(response);
//         this.directionStore.setDirections(newDirection);
//         this.directionStore.setLoading(false);
//         return newDirection;
//       } else {
//         console.error('Ошибка при обновлении данных изменяемого направления');
//       }
//       throw new Error("Unable to update direction");
//     } finally { }
//   };

//   async updateDirections(directions: Direction[]): Promise<Direction[]> {
//     const token = getValidToken();
//     this.directionStore.setLoading(true);
//     try {
//       const response = await post(`directions`, JSON.stringify(directions), token);
//       if (response) {
//         const newDirections = JSON.parse(response);
//         this.directionStore.setDirections(newDirections);
//         this.directionStore.setLoading(false);
//         return newDirections;
//       } else {
//         console.error('Ошибка при обновлении данных страницы "Направления"');
//       }
//       throw new Error("Unable to update directions");
//     } finally { }
//   };
// }

// export default DirectionService;
