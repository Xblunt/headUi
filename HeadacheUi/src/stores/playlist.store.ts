import { Song } from "@/models";
import { makeAutoObservable } from "mobx";

interface Playlist {
  id: string;
  name: string;
  description?: string;
  songs: Song[];
  createdAt: string;
  updatedAt: string;
  userId: string;
}

class PlaylistStore {
  private _playlists: Playlist[] = [];
  private _currentPlaylist: Playlist | null = null;
  private _loading: boolean = false;
  private _error: string | null = null;
  private _canEdit: boolean = false;
  private _isEditing: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get playlists() {
    return this._playlists;
  }

  get currentPlaylist() {
    return this._currentPlaylist;
  }

  get loading() {
    return this._loading;
  }

  get error() {
    return this._error;
  }

  get canEdit() {
    return this._canEdit;
  }

  get isEditing() {
    return this._isEditing;
  }

  setPlaylists = (playlists: Playlist[]) => {
    this._playlists = playlists;
  };

  setCurrentPlaylist = (playlist: Playlist | null) => {
    this._currentPlaylist = playlist;
  };

  setLoading = (loading: boolean) => {
    this._loading = loading;
  };

  setError = (error: string | null) => {
    this._error = error;
  };

  setCanEdit = (canEdit: boolean) => {
    this._canEdit = canEdit;
  };

  setIsEditing = (isEditing: boolean) => {
    this._isEditing = isEditing;
  };

  addPlaylist = (playlist: Playlist) => {
    this._playlists.push(playlist);
  };

  updatePlaylist = (playlistId: string, updates: Partial<Playlist>) => {
    const index = this._playlists.findIndex(playlist => playlist.id === playlistId);
    if (index !== -1) {
      this._playlists[index] = { ...this._playlists[index], ...updates };
    }
    if (this._currentPlaylist && this._currentPlaylist.id === playlistId) {
      this._currentPlaylist = { ...this._currentPlaylist, ...updates };
    }
  };

  removePlaylist = (playlistId: string) => {
    this._playlists = this._playlists.filter(playlist => playlist.id !== playlistId);
    if (this._currentPlaylist && this._currentPlaylist.id === playlistId) {
      this._currentPlaylist = null;
    }
  };

  getPlaylistById = (playlistId: string) => {
    return this._playlists.find(playlist => playlist.id === playlistId) || null;
  };

  addSongToPlaylist = (playlistId: string, song: Song) => {
    const playlist = this.getPlaylistById(playlistId);
    if (playlist && !playlist.songs.find(s => s.uuid === song.uuid)) {
      playlist.songs.push(song);
      this.updatePlaylist(playlistId, { songs: playlist.songs });
    }
  };

  removeSongFromPlaylist = (playlistId: string, songId: string) => {
    const playlist = this.getPlaylistById(playlistId);
    if (playlist) {
      playlist.songs = playlist.songs.filter(song => song.uuid !== songId);
      this.updatePlaylist(playlistId, { songs: playlist.songs });
    }
  };

  reorderPlaylistSongs = (playlistId: string, songIds: string[]) => {
    const playlist = this.getPlaylistById(playlistId);
    if (playlist) {
      const reorderedSongs = songIds.map(id => 
        playlist.songs.find(song => song.uuid === id)
      ).filter(Boolean) as Song[];
      this.updatePlaylist(playlistId, { songs: reorderedSongs });
    }
  };

  getPlaylistsByUser = (userId: string) => {
    return this._playlists.filter(playlist => playlist.userId === userId);
  };

  clearError = () => {
    this._error = null;
  };
}

export default PlaylistStore;
