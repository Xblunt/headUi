import { CooperationRequest } from "@/models";
import { get, post } from "@/utils/fetchWrapper";

class CooperationService {
  private baseUrl = '/api/cooperations';

  async getCooperations(): Promise<CooperationRequest[]> {
    const response = await get(`${this.baseUrl}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getCooperationById(id: string): Promise<CooperationRequest | null> {
    const response = await get(`${this.baseUrl}/${id}`, {}, null);
    return response ? JSON.parse(response) : null;
  }

  async createCooperation(cooperation: Omit<CooperationRequest, 'uuid'>): Promise<CooperationRequest | null> {
    const response = await post(`${this.baseUrl}`, JSON.stringify(cooperation), null);
    return response ? JSON.parse(response) : null;
  }

  async updateCooperation(id: string, cooperation: Partial<CooperationRequest>): Promise<CooperationRequest | null> {
    const response = await post(`${this.baseUrl}/${id}`, JSON.stringify(cooperation), null);
    return response ? JSON.parse(response) : null;
  }

  async deleteCooperation(id: string): Promise<void> {
    await post(`${this.baseUrl}/${id}`, '', null);
  }
}

export default CooperationService; 