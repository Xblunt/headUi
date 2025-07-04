import { get, post } from "@/utils/fetchWrapper";

interface Statistic {
  id: string;
  type: string;
  data: any;
  period: string;
  createdAt: string;
}

interface UserStatistic {
  userId: string;
  totalSongs: number;
  totalAlbums: number;
  totalPlays: number;
  totalLikes: number;
  avgRating: number;
  lastActivity: string;
}

interface SongStatistic {
  songId: string;
  totalPlays: number;
  totalLikes: number;
  avgRating: number;
  playTime: number;
  lastPlayed: string;
}

class StatisticService {
  private baseUrl = '/api/statistic';

  async getStatistics(): Promise<Statistic[]> {
    const response = await get(`${this.baseUrl}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getStatisticById(id: string): Promise<Statistic | null> {
    const response = await get(`${this.baseUrl}/${id}`, {}, null);
    return response ? JSON.parse(response) : null;
  }

  async createStatistic(statistic: Omit<Statistic, 'id' | 'createdAt'>): Promise<Statistic | null> {
    const response = await post(`${this.baseUrl}`, JSON.stringify(statistic), null);
    return response ? JSON.parse(response) : null;
  }

  async updateStatistic(id: string, statistic: Partial<Statistic>): Promise<Statistic | null> {
    const response = await post(`${this.baseUrl}/${id}`, JSON.stringify(statistic), null);
    return response ? JSON.parse(response) : null;
  }

  async deleteStatistic(id: string): Promise<void> {
    await post(`${this.baseUrl}/${id}/delete`, '', null);
  }

  async getUserStatistics(userId: string): Promise<UserStatistic | null> {
    const response = await get(`${this.baseUrl}/user/${userId}`, {}, null);
    return response ? JSON.parse(response) : null;
  }

  async getSongStatistics(songId: string): Promise<SongStatistic | null> {
    const response = await get(`${this.baseUrl}/song/${songId}`, {}, null);
    return response ? JSON.parse(response) : null;
  }

  async getTopSongs(limit: number = 10): Promise<SongStatistic[]> {
    const response = await get(`${this.baseUrl}/songs/top?limit=${limit}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getTopUsers(limit: number = 10): Promise<UserStatistic[]> {
    const response = await get(`${this.baseUrl}/users/top?limit=${limit}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getStatisticsByPeriod(period: string): Promise<Statistic[]> {
    const response = await get(`${this.baseUrl}/period/${period}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getStatisticsByType(type: string): Promise<Statistic[]> {
    const response = await get(`${this.baseUrl}/type/${type}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getDailyStatistics(date: string): Promise<Statistic[]> {
    const response = await get(`${this.baseUrl}/daily/${date}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getWeeklyStatistics(week: string): Promise<Statistic[]> {
    const response = await get(`${this.baseUrl}/weekly/${week}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getMonthlyStatistics(month: string): Promise<Statistic[]> {
    const response = await get(`${this.baseUrl}/monthly/${month}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getYearlyStatistics(year: string): Promise<Statistic[]> {
    const response = await get(`${this.baseUrl}/yearly/${year}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async generateReport(type: string, period: string): Promise<any> {
    const response = await post(`${this.baseUrl}/report`, JSON.stringify({ type, period }), null);
    return response ? JSON.parse(response) : null;
  }

  async exportStatistics(format: string = 'json'): Promise<any> {
    const response = await get(`${this.baseUrl}/export?format=${format}`, {}, null);
    return response ? JSON.parse(response) : null;
  }
}

export default StatisticService;
