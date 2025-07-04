import { User } from "@/models";
import { get, post } from "@/utils/fetchWrapper";

class InfoService {
  private baseUrl = '/api/info';

  async getUsers(): Promise<User[]> {
    const response = await get(`${this.baseUrl}/users`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getUserById(id: string): Promise<User | null> {
    const response = await get(`${this.baseUrl}/users/${id}`, {}, null);
    return response ? JSON.parse(response) : null;
  }

  async getUserByLogin(login: string): Promise<User | null> {
    const response = await get(`${this.baseUrl}/users/login/${login}`, {}, null);
    return response ? JSON.parse(response) : null;
  }

  async createUser(user: Omit<User, 'uuid'>): Promise<User | null> {
    const response = await post(`${this.baseUrl}/users`, JSON.stringify(user), null);
    return response ? JSON.parse(response) : null;
  }

  async updateUser(id: string, user: Partial<User>): Promise<User | null> {
    const response = await post(`${this.baseUrl}/users/${id}`, JSON.stringify(user), null);
    return response ? JSON.parse(response) : null;
  }

  async deleteUser(id: string): Promise<void> {
    await post(`${this.baseUrl}/users/${id}/delete`, '', null);
  }

  async updateUserAvatar(id: string, avatarFile: File): Promise<User | null> {
    const formData = new FormData();
    formData.append('avatar', avatarFile);
    const response = await post(`${this.baseUrl}/users/${id}/avatar`, formData, null);
    return response ? JSON.parse(response) : null;
  }

  async getUsersByRole(role: string): Promise<User[]> {
    const response = await get(`${this.baseUrl}/users/role/${role}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async searchUsers(query: string): Promise<User[]> {
    const response = await get(`${this.baseUrl}/users/search?q=${encodeURIComponent(query)}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getUserProfile(login: string): Promise<any> {
    const response = await get(`${this.baseUrl}/profile/${login}`, {}, null);
    return response ? JSON.parse(response) : null;
  }
}

export default InfoService;
