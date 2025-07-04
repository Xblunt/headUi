import { get, post } from "@/utils/fetchWrapper";

interface Message {
  id: string;
  text?: string;
  sender: any;
  timestamp: string;
  isCurrentUser: boolean;
  song?: any;
}

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  participants: any[];
  lastMessageTime: string;
  unread: number;
}

class ChatsService {
  private baseUrl = '/api/chats';

  async getChats(): Promise<Chat[]> {
    const response = await get(`${this.baseUrl}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getChatById(id: string): Promise<Chat | null> {
    const response = await get(`${this.baseUrl}/${id}`, {}, null);
    return response ? JSON.parse(response) : null;
  }

  async createChat(chat: Omit<Chat, 'id'>): Promise<Chat | null> {
    const response = await post(`${this.baseUrl}`, JSON.stringify(chat), null);
    return response ? JSON.parse(response) : null;
  }

  async updateChat(id: string, chat: Partial<Chat>): Promise<Chat | null> {
    const response = await post(`${this.baseUrl}/${id}`, JSON.stringify(chat), null);
    return response ? JSON.parse(response) : null;
  }

  async deleteChat(id: string): Promise<void> {
    await post(`${this.baseUrl}/${id}/delete`, '', null);
  }

  async getMessages(chatId: string): Promise<Message[]> {
    const response = await get(`${this.baseUrl}/${chatId}/messages`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async sendMessage(chatId: string, message: Omit<Message, 'id' | 'timestamp'>): Promise<Message | null> {
    const response = await post(`${this.baseUrl}/${chatId}/messages`, JSON.stringify(message), null);
    return response ? JSON.parse(response) : null;
  }

  async addParticipant(chatId: string, userId: string): Promise<void> {
    await post(`${this.baseUrl}/${chatId}/participants`, JSON.stringify({ userId }), null);
  }

  async removeParticipant(chatId: string, userId: string): Promise<void> {
    await post(`${this.baseUrl}/${chatId}/participants/${userId}/remove`, '', null);
  }
}

export default ChatsService;
