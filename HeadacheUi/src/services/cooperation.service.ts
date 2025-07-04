import { CooperationRequest, CooperationStatus } from "@/models";
import { get, post } from "@/utils/fetchWrapper";

class CooperationService {
  private baseUrl = '/api/cooperation';

  async getCooperationRequests(): Promise<CooperationRequest[]> {
    const response = await get(`${this.baseUrl}/requests`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getCooperationRequestById(id: string): Promise<CooperationRequest | null> {
    const response = await get(`${this.baseUrl}/requests/${id}`, {}, null);
    return response ? JSON.parse(response) : null;
  }

  async createCooperationRequest(request: Omit<CooperationRequest, 'uuid'>): Promise<CooperationRequest | null> {
    const response = await post(`${this.baseUrl}/requests`, JSON.stringify(request), null);
    return response ? JSON.parse(response) : null;
  }

  async updateCooperationRequest(id: string, request: Partial<CooperationRequest>): Promise<CooperationRequest | null> {
    const response = await post(`${this.baseUrl}/requests/${id}`, JSON.stringify(request), null);
    return response ? JSON.parse(response) : null;
  }

  async deleteCooperationRequest(id: string): Promise<void> {
    await post(`${this.baseUrl}/requests/${id}/delete`, '', null);
  }

  async approveCooperationRequest(id: string): Promise<CooperationRequest | null> {
    const response = await post(`${this.baseUrl}/requests/${id}/approve`, '', null);
    return response ? JSON.parse(response) : null;
  }

  async rejectCooperationRequest(id: string): Promise<CooperationRequest | null> {
    const response = await post(`${this.baseUrl}/requests/${id}/reject`, '', null);
    return response ? JSON.parse(response) : null;
  }

  async getRequestsByStatus(status: CooperationStatus): Promise<CooperationRequest[]> {
    const response = await get(`${this.baseUrl}/requests/status/${status}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getRequestsByLabel(labelUUID: string): Promise<CooperationRequest[]> {
    const response = await get(`${this.baseUrl}/requests/label/${labelUUID}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getRequestsByAuthor(authorUUID: string): Promise<CooperationRequest[]> {
    const response = await get(`${this.baseUrl}/requests/author/${authorUUID}`, {}, null);
    return response ? JSON.parse(response) : [];
  }
}

export default CooperationService;
