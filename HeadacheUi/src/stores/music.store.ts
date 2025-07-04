import { Album, Song, User } from "@/models";
import { makeAutoObservable } from "mobx";

class MusicStore {
  private _songs: Song[] = [];
  private _albums: Album[] = [];
  private _currentSong: Song | null = null;
  private _currentAlbum: Album | null = null;
  private _isPlaying: boolean = false;
  private _loading: boolean = false;
  private _error: string | null = null;
  private _canEdit: boolean = false;
  private _searchQuery: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  get songs() {
    return this._songs;
  }

  get albums() {
    return this._albums;
  }

  get currentSong() {
    return this._currentSong;
  }

  get currentAlbum() {
    return this._currentAlbum;
  }

  get isPlaying() {
    return this._isPlaying;
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

  get searchQuery() {
    return this._searchQuery;
  }

  get filteredSongs() {
    if (!this._searchQuery) return this._songs;
    return this._songs.filter(song => 
      song.name.toLowerCase().includes(this._searchQuery.toLowerCase())
    );
  }

  get filteredAlbums() {
    if (!this._searchQuery) return this._albums;
    return this._albums.filter(album => 
      album.name.toLowerCase().includes(this._searchQuery.toLowerCase())
    );
  }

  setSongs = (songs: Song[]) => {
    this._songs = songs;
  };

  setAlbums = (albums: Album[]) => {
    this._albums = albums;
  };

  setCurrentSong = (song: Song | null) => {
    this._currentSong = song;
  };

  setCurrentAlbum = (album: Album | null) => {
    this._currentAlbum = album;
  };

  setIsPlaying = (isPlaying: boolean) => {
    this._isPlaying = isPlaying;
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

  setSearchQuery = (query: string) => {
    this._searchQuery = query;
  };

  addSong = (song: Song) => {
    this._songs.push(song);
  };

  updateSong = (songId: string, updates: Partial<Song>) => {
    const index = this._songs.findIndex(song => song.uuid === songId);
    if (index !== -1) {
      this._songs[index] = { ...this._songs[index], ...updates };
    }
  };

  removeSong = (songId: string) => {
    this._songs = this._songs.filter(song => song.uuid !== songId);
  };

  addAlbum = (album: Album) => {
    this._albums.push(album);
  };

  updateAlbum = (albumId: string, updates: Partial<Album>) => {
    const index = this._albums.findIndex(album => album.uuid === albumId);
    if (index !== -1) {
      this._albums[index] = { ...this._albums[index], ...updates };
    }
  };

  removeAlbum = (albumId: string) => {
    this._albums = this._albums.filter(album => album.uuid !== albumId);
  };

  getSongById = (songId: string) => {
    return this._songs.find(song => song.uuid === songId) || null;
  };

  getAlbumById = (albumId: string) => {
    return this._albums.find(album => album.uuid === albumId) || null;
  };

  getSongsByAuthor = (authorId: string) => {
    return this._songs.filter(song => song.authorUUID === authorId);
  };

  getAlbumsByAuthor = (authorId: string) => {
    return this._albums.filter(album => album.authorUUID === authorId);
  };

  playSong = (song: Song) => {
    this._currentSong = song;
    this._isPlaying = true;
  };

  pauseSong = () => {
    this._isPlaying = false;
  };

  stopSong = () => {
    this._currentSong = null;
    this._isPlaying = false;
  };

  clearError = () => {
    this._error = null;
  };

  clearSearch = () => {
    this._searchQuery = '';
  };
}

export default MusicStore;
