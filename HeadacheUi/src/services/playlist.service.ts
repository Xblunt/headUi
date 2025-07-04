import { Song } from "@/models";
import { get, post } from "@/utils/fetchWrapper";

interface Playlist {
  id: string;
  name: string;
  description?: string;
  songs: Song[];
  createdAt: string;
  updatedAt: string;
  userId: string;
}

class PlaylistService {
  private baseUrl = '/api/playlist';

  async getPlaylists(): Promise<Playlist[]> {
    const response = await get(`${this.baseUrl}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async getPlaylistById(id: string): Promise<Playlist | null> {
    const response = await get(`${this.baseUrl}/${id}`, {}, null);
    return response ? JSON.parse(response) : null;
  }

  async createPlaylist(playlist: Omit<Playlist, 'id' | 'createdAt' | 'updatedAt'>): Promise<Playlist | null> {
    const response = await post(`${this.baseUrl}`, JSON.stringify(playlist), null);
    return response ? JSON.parse(response) : null;
  }

  async updatePlaylist(id: string, playlist: Partial<Playlist>): Promise<Playlist | null> {
    const response = await post(`${this.baseUrl}/${id}`, JSON.stringify(playlist), null);
    return response ? JSON.parse(response) : null;
  }

  async deletePlaylist(id: string): Promise<void> {
    await post(`${this.baseUrl}/${id}/delete`, '', null);
  }

  async addSongToPlaylist(playlistId: string, songId: string): Promise<void> {
    await post(`${this.baseUrl}/${playlistId}/songs/add`, JSON.stringify({ songId }), null);
  }

  async removeSongFromPlaylist(playlistId: string, songId: string): Promise<void> {
    await post(`${this.baseUrl}/${playlistId}/songs/remove`, JSON.stringify({ songId }), null);
  }

  async getPlaylistSongs(playlistId: string): Promise<Song[]> {
    const response = await get(`${this.baseUrl}/${playlistId}/songs`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async reorderPlaylistSongs(playlistId: string, songIds: string[]): Promise<void> {
    await post(`${this.baseUrl}/${playlistId}/songs/reorder`, JSON.stringify({ songIds }), null);
  }

  async getPlaylistsByUser(userId: string): Promise<Playlist[]> {
    const response = await get(`${this.baseUrl}/user/${userId}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async searchPlaylists(query: string): Promise<Playlist[]> {
    const response = await get(`${this.baseUrl}/search?q=${encodeURIComponent(query)}`, {}, null);
    return response ? JSON.parse(response) : [];
  }

  async duplicatePlaylist(playlistId: string, newName: string): Promise<Playlist | null> {
    const response = await post(`${this.baseUrl}/${playlistId}/duplicate`, JSON.stringify({ name: newName }), null);
    return response ? JSON.parse(response) : null;
  }

  async sharePlaylist(playlistId: string, userId: string): Promise<void> {
    await post(`${this.baseUrl}/${playlistId}/share`, JSON.stringify({ userId }), null);
  }
}

export default PlaylistService;
