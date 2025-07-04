import { Song } from "@/models";
import { makeAutoObservable } from "mobx";

class SongStore {
  private _songs: Song[] = [];
  private _loading: boolean = false;
  private _canEdit: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get songs() {
    return this._songs;
  }

  get loading() {
    return this._loading;
  }

  get canEdit() {
    return this._canEdit;
  }

  setSongs = (songs: Song[]) => {
    this._songs = songs;
  };

  setLoading = (loading: boolean) => {
    this._loading = loading;
  };

  setCanEdit = (canEdit: boolean) => {
    this._canEdit = canEdit;
  };
}

export default SongStore; 