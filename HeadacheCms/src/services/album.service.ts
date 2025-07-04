import { Album } from "@/models";
import { get, post } from "@/utils/fetchWrapper";

class AlbumService {
  private baseUrl = '/api/albums';

  async getAlbums(): Promise<Album[]> {
    const response = await get(`${this.baseUrl}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getAlbumById(id: string): Promise<Album | null> {
    const response = await get(`${this.baseUrl}/${id}`, {}, null);
    return response ? JSON.parse(response) : null;
  }

  async createAlbum(album: Omit<Album, 'uuid'>): Promise<Album | null> {
    const response = await post(`${this.baseUrl}`, JSON.stringify(album), null);
    return response ? JSON.parse(response) : null;
  }

  async updateAlbum(id: string, album: Partial<Album>): Promise<Album | null> {
    const response = await post(`${this.baseUrl}/${id}`, JSON.stringify(album), null);
    return response ? JSON.parse(response) : null;
  }

  async deleteAlbum(id: string): Promise<void> {
    await post(`${this.baseUrl}/${id}`, '', null);
  }
}

export default AlbumService; 