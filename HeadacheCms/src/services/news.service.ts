// import { News } from "@/models";
// import { AUTH_STORE, NEWS_STORE } from "@/stores/identifiers";
// import { AuthStore, NewsStore } from "@/stores";
// import { get, post } from "@/utils/fetchWrapper";
// import Injector from "@/utils/injector";
// import { getValidToken } from "@/utils/authToken";

// class NewsService {
//   private static instance: NewsService;
//   private newsStore: NewsStore;
//   private authStore: AuthStore;

//   private constructor() {
//     this.newsStore = Injector.get<NewsStore>(NEWS_STORE);
//     this.authStore = Injector.get<AuthStore>(AUTH_STORE);
//   }

//   static getInstance(): NewsService {
//     if (!NewsService.instance) {
//       NewsService.instance = new NewsService();
//     }
//     return NewsService.instance;
//   }

//   async fetchNews(): Promise<void> {
//     const token = getValidToken() !== null;
//     if (token) {
//       const response = await get(`cms/news`, {});
//       if (response) {
//         const data = JSON.parse(response);
//         this.newsStore.setNews(data);
//       } else {
//         console.error('Ошибка при загрузки данных страницы "Новости"');
//         throw new Error('Не удалось загрузить данные страницы "Новости"');
//       }
//     } else {
//       this.authStore.setNotHaveToken(true);
//     }
//   };

//   async updateNews(careers: News[]): Promise<News[]> {
//     const token = getValidToken();
//     this.newsStore.setLoading(true);
//     try {
//       const response = await post(`news`, JSON.stringify(careers), token);
//       if (response) {
//         const newNews = JSON.parse(response);
//         this.newsStore.setNews(newNews);
//         this.newsStore.setLoading(false);
//         return newNews;
//       } else {
//         console.error('Ошибка при обновлении данных страницы "Новости"');
//       }
//       throw new Error("Unable to update news");
//     } finally { }
//   };
// }

// export default NewsService;
