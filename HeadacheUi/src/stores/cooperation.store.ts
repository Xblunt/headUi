
import { makeAutoObservable } from "mobx";

class AllStore {
  private _data: any | null = null;
  private _loading: boolean = false;
  private _canEdit: boolean = false;
  
  constructor() {
    makeAutoObservable(this);
  };

  get data() {
    return this._data;
  };

  get loading() {
    return this._loading;
  };

  get canEdit() {
    return this._canEdit;
  };

  setData = (data: any) => {
    this._data = data;
  };

  setLoading = (loading: boolean) => {
    this._loading = loading;
  };

  setCanEdit = (canEdit: boolean) => {
    this._canEdit = canEdit;
  };
}

export default AllStore;
