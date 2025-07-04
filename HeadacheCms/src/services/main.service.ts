import { Main } from "@/models";
import { get, post } from "@/utils/fetchWrapper";

class MainService {
  private baseUrl = '/api/main';

  async getMain(): Promise<Main | null> {
    const response = await get(`${this.baseUrl}`, {}, null);
    return response ? JSON.parse(response) : null;
  }

  async updateMain(main: Partial<Main>): Promise<Main | null> {
    const response = await post(`${this.baseUrl}`, JSON.stringify(main), null);
    return response ? JSON.parse(response) : null;
  }
}

export default MainService; 