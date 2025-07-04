import { Song, SongStatus } from "@/models";
import { get, post } from "@/utils/fetchWrapper";

class TracksService {
  private baseUrl = '/api/tracks';

  async getTracks(): Promise<Song[]> {
    const response = await get(`${this.baseUrl}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getTrackById(id: string): Promise<Song | null> {
    const response = await get(`${this.baseUrl}/${id}`, {}, null);
    return response ? JSON.parse(response) : null;
  }

  async createTrack(track: Omit<Song, 'uuid'>): Promise<Song | null> {
    const response = await post(`${this.baseUrl}`, JSON.stringify(track), null);
    return response ? JSON.parse(response) : null;
  }

  async updateTrack(id: string, track: Partial<Song>): Promise<Song | null> {
    const response = await post(`${this.baseUrl}/${id}`, JSON.stringify(track), null);
    return response ? JSON.parse(response) : null;
  }

  async deleteTrack(id: string): Promise<void> {
    await post(`${this.baseUrl}/${id}/delete`, '', null);
  }

  async getTracksByStatus(status: SongStatus): Promise<Song[]> {
    const response = await get(`${this.baseUrl}/status/${status}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getTracksByAuthor(authorId: string): Promise<Song[]> {
    const response = await get(`${this.baseUrl}/author/${authorId}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getTracksByAlbum(albumId: string): Promise<Song[]> {
    const response = await get(`${this.baseUrl}/album/${albumId}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async searchTracks(query: string): Promise<Song[]> {
    const response = await get(`${this.baseUrl}/search?q=${encodeURIComponent(query)}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getPopularTracks(limit: number = 10): Promise<Song[]> {
    const response = await get(`${this.baseUrl}/popular?limit=${limit}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getNewTracks(limit: number = 10): Promise<Song[]> {
    const response = await get(`${this.baseUrl}/new?limit=${limit}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getRecommendedTracks(userId: string, limit: number = 10): Promise<Song[]> {
    const response = await get(`${this.baseUrl}/recommended/${userId}?limit=${limit}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async uploadTrack(trackFile: File, trackData: Partial<Song>): Promise<Song | null> {
    const formData = new FormData();
    formData.append('file', trackFile);
    formData.append('data', JSON.stringify(trackData));
    const response = await post(`${this.baseUrl}/upload`, formData, null);
    return response ? JSON.parse(response) : null;
  }

  async uploadTrackCover(trackId: string, coverFile: File): Promise<Song | null> {
    const formData = new FormData();
    formData.append('cover', coverFile);
    const response = await post(`${this.baseUrl}/${trackId}/cover`, formData, null);
    return response ? JSON.parse(response) : null;
  }

  async approveTrack(id: string): Promise<Song | null> {
    const response = await post(`${this.baseUrl}/${id}/approve`, '', null);
    return response ? JSON.parse(response) : null;
  }

  async rejectTrack(id: string): Promise<Song | null> {
    const response = await post(`${this.baseUrl}/${id}/reject`, '', null);
    return response ? JSON.parse(response) : null;
  }

  async rateTrack(id: string, rating: number): Promise<Song | null> {
    const response = await post(`${this.baseUrl}/${id}/rate`, JSON.stringify({ rating }), null);
    return response ? JSON.parse(response) : null;
  }

  async likeTrack(id: string): Promise<void> {
    await post(`${this.baseUrl}/${id}/like`, '', null);
  }

  async unlikeTrack(id: string): Promise<void> {
    await post(`${this.baseUrl}/${id}/unlike`, '', null);
  }

  async getTrackStream(id: string): Promise<string> {
    const response = await get(`${this.baseUrl}/${id}/stream`, {}, null);
    return response || '';
  }

  async getTrackMetadata(id: string): Promise<any> {
    const response = await get(`${this.baseUrl}/${id}/metadata`, {}, null);
    return response ? JSON.parse(response) : null;
  }
}

export default TracksService;
