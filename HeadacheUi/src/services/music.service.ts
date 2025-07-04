import { Album, Song, User } from "@/models";
import { get, post } from "@/utils/fetchWrapper";

class MusicService {
  private baseUrl = '/api/music';

  async getSongs(): Promise<Song[]> {
    const response = await get(`${this.baseUrl}/songs`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getSongById(id: string): Promise<Song | null> {
    const response = await get(`${this.baseUrl}/songs/${id}`, {}, null);
    return response ? JSON.parse(response) : null;
  }

  async createSong(song: Omit<Song, 'uuid'>): Promise<Song | null> {
    const response = await post(`${this.baseUrl}/songs`, JSON.stringify(song), null);
    return response ? JSON.parse(response) : null;
  }

  async updateSong(id: string, song: Partial<Song>): Promise<Song | null> {
    const response = await post(`${this.baseUrl}/songs/${id}`, JSON.stringify(song), null);
    return response ? JSON.parse(response) : null;
  }

  async deleteSong(id: string): Promise<void> {
    await post(`${this.baseUrl}/songs/${id}/delete`, '', null);
  }

  async getAlbums(): Promise<Album[]> {
    const response = await get(`${this.baseUrl}/albums`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getAlbumById(id: string): Promise<Album | null> {
    const response = await get(`${this.baseUrl}/albums/${id}`, {}, null);
    return response ? JSON.parse(response) : null;
  }

  async createAlbum(album: Omit<Album, 'uuid'>): Promise<Album | null> {
    const response = await post(`${this.baseUrl}/albums`, JSON.stringify(album), null);
    return response ? JSON.parse(response) : null;
  }

  async updateAlbum(id: string, album: Partial<Album>): Promise<Album | null> {
    const response = await post(`${this.baseUrl}/albums/${id}`, JSON.stringify(album), null);
    return response ? JSON.parse(response) : null;
  }

  async deleteAlbum(id: string): Promise<void> {
    await post(`${this.baseUrl}/albums/${id}/delete`, '', null);
  }

  async getSongsByAlbum(albumId: string): Promise<Song[]> {
    const response = await get(`${this.baseUrl}/albums/${albumId}/songs`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getSongsByAuthor(authorId: string): Promise<Song[]> {
    const response = await get(`${this.baseUrl}/songs/author/${authorId}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getAlbumsByAuthor(authorId: string): Promise<Album[]> {
    const response = await get(`${this.baseUrl}/albums/author/${authorId}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async searchSongs(query: string): Promise<Song[]> {
    const response = await get(`${this.baseUrl}/songs/search?q=${encodeURIComponent(query)}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async searchAlbums(query: string): Promise<Album[]> {
    const response = await get(`${this.baseUrl}/albums/search?q=${encodeURIComponent(query)}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async uploadSong(songFile: File, songData: Partial<Song>): Promise<Song | null> {
    const formData = new FormData();
    formData.append('file', songFile);
    formData.append('data', JSON.stringify(songData));
    const response = await post(`${this.baseUrl}/songs/upload`, formData, null);
    return response ? JSON.parse(response) : null;
  }

  async uploadAlbumCover(albumId: string, coverFile: File): Promise<Album | null> {
    const formData = new FormData();
    formData.append('cover', coverFile);
    const response = await post(`${this.baseUrl}/albums/${albumId}/cover`, formData, null);
    return response ? JSON.parse(response) : null;
  }
}

export default MusicService;
