import { PromotionRequest } from "@/models";
import { get, post } from "@/utils/fetchWrapper";

class PromotionService {
  private baseUrl = '/api/promotions';

  async getPromotions(): Promise<PromotionRequest[]> {
    const response = await get(`${this.baseUrl}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getPromotionById(id: string): Promise<PromotionRequest | null> {
    const response = await get(`${this.baseUrl}/${id}`, {}, null);
    return response ? JSON.parse(response) : null;
  }

  async createPromotion(promotion: Omit<PromotionRequest, 'uuid'>): Promise<PromotionRequest | null> {
    const response = await post(`${this.baseUrl}`, JSON.stringify(promotion), null);
    return response ? JSON.parse(response) : null;
  }

  async updatePromotion(id: string, promotion: Partial<PromotionRequest>): Promise<PromotionRequest | null> {
    const response = await post(`${this.baseUrl}/${id}`, JSON.stringify(promotion), null);
    return response ? JSON.parse(response) : null;
  }

  async deletePromotion(id: string): Promise<void> {
    await post(`${this.baseUrl}/${id}`, '', null);
  }
}

export default PromotionService; 