import { Album } from "@/models";
import { makeAutoObservable } from "mobx";

class AlbumStore {
  private _albums: Album[] = [];
  private _loading: boolean = false;
  private _canEdit: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get albums() {
    return this._albums;
  }

  get loading() {
    return this._loading;
  }

  get canEdit() {
    return this._canEdit;
  }

  setAlbums = (albums: Album[]) => {
    this._albums = albums;
  };

  setLoading = (loading: boolean) => {
    this._loading = loading;
  };

  setCanEdit = (canEdit: boolean) => {
    this._canEdit = canEdit;
  };
}

export default AlbumStore; 