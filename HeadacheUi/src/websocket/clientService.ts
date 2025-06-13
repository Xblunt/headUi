import { Session } from "@/models";

class ClientService {
  private readonly baseUrl = process.env.API_BASE_URL || 'http://localhost:8080/api';

  public async updateSession(session: Session): Promise<Session> {
    try {
      const response = await fetch(`${this.baseUrl}/session/${session.uuid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
        body: JSON.stringify(session)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json() as Session;
    } catch (error) {
      console.error('Error updating session:', error);
      throw error;
    }
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }
}

export default ClientService;