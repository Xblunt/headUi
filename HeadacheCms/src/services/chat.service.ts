import { Chat } from "@/models";
import { get, post } from "@/utils/fetchWrapper";

class ChatService {
  private baseUrl = '/api/chats';

  async getChats(): Promise<Chat[]> {
    const response = await get(`${this.baseUrl}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getChatById(id: string): Promise<Chat | null> {
    const response = await get(`${this.baseUrl}/${id}`, {}, null);
    return response ? JSON.parse(response) : null;
  }

  async createChat(chat: Omit<Chat, 'uuid'>): Promise<Chat | null> {
    const response = await post(`${this.baseUrl}`, JSON.stringify(chat), null);
    return response ? JSON.parse(response) : null;
  }

  async updateChat(id: string, chat: Partial<Chat>): Promise<Chat | null> {
    const response = await post(`${this.baseUrl}/${id}`, JSON.stringify(chat), null);
    return response ? JSON.parse(response) : null;
  }

  async deleteChat(id: string): Promise<void> {
    await post(`${this.baseUrl}/${id}`, '', null);
  }
}

export default ChatService; 