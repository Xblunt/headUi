import { AllStore, AuthStore  } from "@/stores";
import { ALL_STORE, AUTH_STORE } from "@/stores/identifiers";
import { getValidToken } from "@/utils/authToken";
import { get, post } from "@/utils/fetchWrapper";
import Injector from "@/utils/injector";

class AllService {
  private static instance: AllService;
  private allStore: AllStore;
  private authStore: AuthStore;

  private constructor() {
    this.allStore = Injector.get<AllStore>(ALL_STORE);
    this.authStore = Injector.get<AuthStore>(AUTH_STORE);
  }

  static getInstance(): AllService {
    if (!AllService.instance) {
        AllService.instance = new AllService();
    }
    return AllService.instance;
  }

  // GET - Получение всех данных
  async get<T>(endpoint: string): Promise<T | null> {
    const token = getValidToken();
    // if (!token) {
    //   this.authStore.setNotHaveToken(true);
    //   return null;
    // }
    console.log('endpoint', endpoint)
    try {
      const response = await get(endpoint, {}, token);
      if (response) {
        return JSON.parse(response) as T;
      }
      throw new Error(`No data received from ${endpoint}`);
    } catch (error) {
      console.error(`Ошибка при загрузке данных из ${endpoint}:`, error);
      throw error;
    }
  }

  // GET by ID - Получение данных по ID
  async getById<T>(endpoint: string, id: string | number): Promise<T | null> {
    const token = getValidToken();
    if (!token) {
      this.authStore.setNotHaveToken(true);
      return null;
    }

    try {
      const response = await get(`${endpoint}/${id}`, {}, token);
      if (response) {
        return JSON.parse(response) as T;
      }
      throw new Error(`No data received for ID ${id} from ${endpoint}`);
    } catch (error) {
      console.error(`Ошибка при загрузке данных по ID ${id} из ${endpoint}:`, error);
      throw error;
    }
  }

  // POST by ID - Обновление данных по ID
  async postById<T>(endpoint: string, id: string | number, data: any): Promise<T | null> {
    const token = getValidToken();
    if (!token) {
      this.authStore.setNotHaveToken(true);
      return null;
    }

    this.allStore.setLoading(true);
    try {
      const response = await post(`${endpoint}/${id}`, JSON.stringify(data), token);
      if (response) {
        return JSON.parse(response) as T;
      }
      throw new Error(`Failed to update data for ID ${id} in ${endpoint}`);
    } catch (error) {
      console.error(`Ошибка при обновлении данных по ID ${id} в ${endpoint}:`, error);
      throw error;
    } finally {
      this.allStore.setLoading(false);
    }
  }


  async post<T>(endpoint: string, data: any): Promise<T | null> {
    const token = getValidToken();
    // if (!token) {
    //   this.authStore.setNotHaveToken(true);
    //   return null;
    // }

    this.allStore.setLoading(true);
    try {
      const response = await post(`${endpoint}`, JSON.stringify(data), token);
      if (response) {
        return JSON.parse(response) as T;
      }
      throw new Error(`Failed to update data  in ${endpoint}`);
    } catch (error) {
      console.error(`Ошибка при обновлении данных  в ${endpoint}:`, error);
      throw error;
    } finally {
      this.allStore.setLoading(false);
    }
  }

  // DELETE by ID - Удаление данных по ID
  async deleteById<T>(endpoint: string, id: string | number): Promise<T | null> {
    const token = getValidToken();
    if (!token) {
      this.authStore.setNotHaveToken(true);
      return null;
    }

    this.allStore.setLoading(true);
    try {
      // Предполагаем, что у вас есть метод delete в fetchWrapper
      // Если нет, его нужно добавить аналогично get/post
      const response = await post(`${endpoint}/${id}/delete`, "", token);
      if (response) {
        return JSON.parse(response) as T;
      }
      throw new Error(`Failed to delete data for ID ${id} from ${endpoint}`);
    } catch (error) {
      console.error(`Ошибка при удалении данных по ID ${id} из ${endpoint}:`, error);
      throw error;
    } finally {
      this.allStore.setLoading(false);
    }
  }

//   // Специфичные методы для Main (примеры)
//   async fetchMain(): Promise<Main | null> {
//     return this.get<Main>('main');
//   }

//   async updateMain(main: Main): Promise<Main | null> {
//     return this.postById<Main>('main', main.id, main);
//   }
}

export default AllService;