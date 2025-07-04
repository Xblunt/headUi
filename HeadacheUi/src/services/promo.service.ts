import { PromotionRequest, PromotionStatus } from "@/models";
import { get, post } from "@/utils/fetchWrapper";

class PromoService {
  private baseUrl = '/api/promo';

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
    await post(`${this.baseUrl}/${id}/delete`, '', null);
  }

  async approvePromotion(id: string): Promise<PromotionRequest | null> {
    const response = await post(`${this.baseUrl}/${id}/approve`, '', null);
    return response ? JSON.parse(response) : null;
  }

  async rejectPromotion(id: string): Promise<PromotionRequest | null> {
    const response = await post(`${this.baseUrl}/${id}/reject`, '', null);
    return response ? JSON.parse(response) : null;
  }

  async getPromotionsByStatus(status: PromotionStatus): Promise<PromotionRequest[]> {
    const response = await get(`${this.baseUrl}/status/${status}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getPromotionsBySong(songUUID: string): Promise<PromotionRequest[]> {
    const response = await get(`${this.baseUrl}/song/${songUUID}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getActivePromotions(): Promise<PromotionRequest[]> {
    const response = await get(`${this.baseUrl}/active`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async uploadPromoImage(promotionId: string, imageFile: File): Promise<PromotionRequest | null> {
    const formData = new FormData();
    formData.append('image', imageFile);
    const response = await post(`${this.baseUrl}/${promotionId}/image`, formData, null);
    return response ? JSON.parse(response) : null;
  }

  async schedulePromotion(id: string, dispatchTime: string): Promise<PromotionRequest | null> {
    const response = await post(`${this.baseUrl}/${id}/schedule`, JSON.stringify({ dispatchTime }), null);
    return response ? JSON.parse(response) : null;
  }

  async cancelPromotion(id: string): Promise<PromotionRequest | null> {
    const response = await post(`${this.baseUrl}/${id}/cancel`, '', null);
    return response ? JSON.parse(response) : null;
  }
}

export default PromoService;
