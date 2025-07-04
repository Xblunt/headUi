import { Song } from "@/models";
import { get, post } from "@/utils/fetchWrapper";

class SongService {
  private baseUrl = '/api/songs';

  async getSongs(): Promise<Song[]> {
    const response = await get(`${this.baseUrl}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getSongById(id: string): Promise<Song | null> {
    const response = await get(`${this.baseUrl}/${id}`, {}, null);
    return response ? JSON.parse(response) : null;
  }

  async createSong(song: Omit<Song, 'uuid'>): Promise<Song | null> {
    const response = await post(`${this.baseUrl}`, JSON.stringify(song), null);
    return response ? JSON.parse(response) : null;
  }

  async updateSong(id: string, song: Partial<Song>): Promise<Song | null> {
    const response = await post(`${this.baseUrl}/${id}`, JSON.stringify(song), null);
    return response ? JSON.parse(response) : null;
  }

  async deleteSong(id: string): Promise<void> {
    await post(`${this.baseUrl}/${id}`, '', null);
  }
}

export default SongService; 