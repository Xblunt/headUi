import { get, post } from "@/utils/fetchWrapper";

interface Request {
  id: string;
  type: string;
  status: string;
  data: any;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

class RequestsService {
  private baseUrl = '/api/requests';

  async getRequests(): Promise<Request[]> {
    const response = await get(`${this.baseUrl}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getRequestById(id: string): Promise<Request | null> {
    const response = await get(`${this.baseUrl}/${id}`, {}, null);
    return response ? JSON.parse(response) : null;
  }

  async createRequest(request: Omit<Request, 'id' | 'createdAt' | 'updatedAt'>): Promise<Request | null> {
    const response = await post(`${this.baseUrl}`, JSON.stringify(request), null);
    return response ? JSON.parse(response) : null;
  }

  async updateRequest(id: string, request: Partial<Request>): Promise<Request | null> {
    const response = await post(`${this.baseUrl}/${id}`, JSON.stringify(request), null);
    return response ? JSON.parse(response) : null;
  }

  async deleteRequest(id: string): Promise<void> {
    await post(`${this.baseUrl}/${id}/delete`, '', null);
  }

  async approveRequest(id: string): Promise<Request | null> {
    const response = await post(`${this.baseUrl}/${id}/approve`, '', null);
    return response ? JSON.parse(response) : null;
  }

  async rejectRequest(id: string): Promise<Request | null> {
    const response = await post(`${this.baseUrl}/${id}/reject`, '', null);
    return response ? JSON.parse(response) : null;
  }

  async getRequestsByStatus(status: string): Promise<Request[]> {
    const response = await get(`${this.baseUrl}/status/${status}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getRequestsByType(type: string): Promise<Request[]> {
    const response = await get(`${this.baseUrl}/type/${type}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getRequestsByUser(userId: string): Promise<Request[]> {
    const response = await get(`${this.baseUrl}/user/${userId}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getPendingRequests(): Promise<Request[]> {
    const response = await get(`${this.baseUrl}/pending`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getApprovedRequests(): Promise<Request[]> {
    const response = await get(`${this.baseUrl}/approved`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getRejectedRequests(): Promise<Request[]> {
    const response = await get(`${this.baseUrl}/rejected`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async bulkApproveRequests(requestIds: string[]): Promise<void> {
    await post(`${this.baseUrl}/bulk-approve`, JSON.stringify({ requestIds }), null);
  }

  async bulkRejectRequests(requestIds: string[]): Promise<void> {
    await post(`${this.baseUrl}/bulk-reject`, JSON.stringify({ requestIds }), null);
  }
}

export default RequestsService;
