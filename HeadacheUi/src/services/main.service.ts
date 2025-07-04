import { Album, Song, User } from "@/models";
import { get, post } from "@/utils/fetchWrapper";

class MainService {
  private baseUrl = '/api/main';

  async getPromotions(): Promise<any[]> {
    const response = await get(`${this.baseUrl}/promotions`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getNewReleases(): Promise<Song[]> {
    const response = await get(`${this.baseUrl}/new-releases`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getFeaturedAlbums(): Promise<Album[]> {
    const response = await get(`${this.baseUrl}/featured-albums`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getPopularSongs(): Promise<Song[]> {
    const response = await get(`${this.baseUrl}/popular-songs`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getRecommendedSongs(): Promise<Song[]> {
    const response = await get(`${this.baseUrl}/recommended-songs`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getArtistByName(name: string): Promise<User | null> {
    const response = await get(`${this.baseUrl}/artist/${encodeURIComponent(name)}`, {}, null);
    return response ? JSON.parse(response) : null;
  }

  async getPlaylist(): Promise<Song[]> {
    const response = await get(`${this.baseUrl}/playlist`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async addToPlaylist(songId: string): Promise<void> {
    await post(`${this.baseUrl}/playlist/add`, JSON.stringify({ songId }), null);
  }

  async removeFromPlaylist(songId: string): Promise<void> {
    await post(`${this.baseUrl}/playlist/remove`, JSON.stringify({ songId }), null);
  }

  async getAppConfig(): Promise<any> {
    const response = await get(`${this.baseUrl}/config`, {}, null);
    return response ? JSON.parse(response) : null;
  }
}

export default MainService;
