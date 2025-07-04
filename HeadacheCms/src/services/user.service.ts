import { User } from "@/models";
import { get, post } from "@/utils/fetchWrapper";

class UserService {
  private baseUrl = '/api/users';

  async getUsers(): Promise<User[]> {
    const response = await get(`${this.baseUrl}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getUserById(id: string): Promise<User | null> {
    const response = await get(`${this.baseUrl}/${id}`, {}, null);
    return response ? JSON.parse(response) : null;
  }

  async createUser(user: Omit<User, 'uuid'>): Promise<User | null> {
    const response = await post(`${this.baseUrl}`, JSON.stringify(user), null);
    return response ? JSON.parse(response) : null;
  }

  async updateUser(id: string, user: Partial<User>): Promise<User | null> {
    const response = await post(`${this.baseUrl}/${id}`, JSON.stringify(user), null);
    return response ? JSON.parse(response) : null;
  }

  async deleteUser(id: string): Promise<void> {
    await post(`${this.baseUrl}/${id}`, '', null);
  }
}

export default UserService; 