import { Album, Song, User } from "@/models";
import { makeAutoObservable } from "mobx";

class MainStore {
  private _promotions: any[] = [];
  private _newReleases: Song[] = [];
  private _featuredAlbums: Album[] = [];
  private _popularSongs: Song[] = [];
  private _recommendedSongs: Song[] = [];
  private _playlist: Song[] = [];
  private _currentSong: Song | null = null;
  private _isPlaying: boolean = false;
  private _loading: boolean = false;
  private _error: string | null = null;
  private _canEdit: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get promotions() {
    return this._promotions;
  }

  get newReleases() {
    return this._newReleases;
  }

  get featuredAlbums() {
    return this._featuredAlbums;
  }

  get popularSongs() {
    return this._popularSongs;
  }

  get recommendedSongs() {
    return this._recommendedSongs;
  }

  get playlist() {
    return this._playlist;
  }

  get currentSong() {
    return this._currentSong;
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

  setPromotions = (promotions: any[]) => {
    this._promotions = promotions;
  };

  setNewReleases = (songs: Song[]) => {
    this._newReleases = songs;
  };

  setFeaturedAlbums = (albums: Album[]) => {
    this._featuredAlbums = albums;
  };

  setPopularSongs = (songs: Song[]) => {
    this._popularSongs = songs;
  };

  setRecommendedSongs = (songs: Song[]) => {
    this._recommendedSongs = songs;
  };

  setPlaylist = (songs: Song[]) => {
    this._playlist = songs;
  };

  setCurrentSong = (song: Song | null) => {
    this._currentSong = song;
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

  addToPlaylist = (song: Song) => {
    if (!this._playlist.find(s => s.uuid === song.uuid)) {
      this._playlist.push(song);
    }
  };

  removeFromPlaylist = (songId: string) => {
    this._playlist = this._playlist.filter(song => song.uuid !== songId);
  };

  clearPlaylist = () => {
    this._playlist = [];
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
}

export default MainStore;
