import { get, post } from "@/utils/fetchWrapper";

class AppService {
  private baseUrl = '/api/app';

  async getAppConfig(): Promise<any> {
    const response = await get(`${this.baseUrl}/config`, {}, null);
    return response ? JSON.parse(response) : null;
  }

  async updateAppConfig(config: any): Promise<any> {
    const response = await post(`${this.baseUrl}/config`, JSON.stringify(config), null);
    return response ? JSON.parse(response) : null;
  }

  async getAppStatus(): Promise<any> {
    const response = await get(`${this.baseUrl}/status`, {}, null);
    return response ? JSON.parse(response) : null;
  }
}

export default AppService;
