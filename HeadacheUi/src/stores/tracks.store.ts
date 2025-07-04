import { Song, SongStatus } from "@/models";
import { makeAutoObservable } from "mobx";

class TracksStore {
  private _tracks: Song[] = [];
  private _currentTrack: Song | null = null;
  private _isPlaying: boolean = false;
  private _loading: boolean = false;
  private _error: string | null = null;
  private _canEdit: boolean = false;
  private _searchQuery: string = '';
  private _filterStatus: SongStatus | 'all' = 'all';

  constructor() {
    makeAutoObservable(this);
  }

  get tracks() {
    return this._tracks;
  }

  get currentTrack() {
    return this._currentTrack;
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

  get filterStatus() {
    return this._filterStatus;
  }

  get filteredTracks() {
    let filtered = this._tracks;

    if (this._filterStatus !== 'all') {
      filtered = filtered.filter(track => track.status === this._filterStatus);
    }

    if (this._searchQuery) {
      filtered = filtered.filter(track => 
        track.name.toLowerCase().includes(this._searchQuery.toLowerCase())
      );
    }

    return filtered;
  }

  get approvedTracks() {
    return this._tracks.filter(track => track.status === SongStatus.APPROVED);
  }

  get awaitingTracks() {
    return this._tracks.filter(track => track.status === SongStatus.AWAITING);
  }

  get disapprovedTracks() {
    return this._tracks.filter(track => track.status === SongStatus.DISAPPROVED);
  }

  get popularTracks() {
    return this._tracks
      .sort((a, b) => b.avgRating - a.avgRating)
      .slice(0, 10);
  }

  setTracks = (tracks: Song[]) => {
    this._tracks = tracks;
  };

  setCurrentTrack = (track: Song | null) => {
    this._currentTrack = track;
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

  setFilterStatus = (status: SongStatus | 'all') => {
    this._filterStatus = status;
  };

  addTrack = (track: Song) => {
    this._tracks.push(track);
  };

  updateTrack = (trackId: string, updates: Partial<Song>) => {
    const index = this._tracks.findIndex(track => track.uuid === trackId);
    if (index !== -1) {
      this._tracks[index] = { ...this._tracks[index], ...updates };
    }
    if (this._currentTrack && this._currentTrack.uuid === trackId) {
      this._currentTrack = { ...this._currentTrack, ...updates };
    }
  };

  removeTrack = (trackId: string) => {
    this._tracks = this._tracks.filter(track => track.uuid !== trackId);
  };

  getTrackById = (trackId: string) => {
    return this._tracks.find(track => track.uuid === trackId) || null;
  };

  getTracksByAuthor = (authorId: string) => {
    return this._tracks.filter(track => track.authorUUID === authorId);
  };

  getTracksByStatus = (status: SongStatus) => {
    return this._tracks.filter(track => track.status === status);
  };

  approveTrack = (trackId: string) => {
    this.updateTrack(trackId, { status: SongStatus.APPROVED });
  };

  disapproveTrack = (trackId: string) => {
    this.updateTrack(trackId, { status: SongStatus.DISAPPROVED });
  };

  rateTrack = (trackId: string, rating: number) => {
    const track = this.getTrackById(trackId);
    if (track) {
      this.updateTrack(trackId, { avgRating: rating });
    }
  };

  playTrack = (track: Song) => {
    this._currentTrack = track;
    this._isPlaying = true;
  };

  pauseTrack = () => {
    this._isPlaying = false;
  };

  stopTrack = () => {
    this._currentTrack = null;
    this._isPlaying = false;
  };

  clearError = () => {
    this._error = null;
  };

  clearSearch = () => {
    this._searchQuery = '';
  };

  clearFilters = () => {
    this._filterStatus = 'all';
    this._searchQuery = '';
  };
}

export default TracksStore;
