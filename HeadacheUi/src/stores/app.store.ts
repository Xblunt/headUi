import { makeAutoObservable } from "mobx";

class AppStore {
  private _loading: boolean = false;
  private _error: string | null = null;
  private _config: any = null;
  private _status: any = null;
  private _canEdit: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get loading() {
    return this._loading;
  }

  get error() {
    return this._error;
  }

  get config() {
    return this._config;
  }

  get status() {
    return this._status;
  }

  get canEdit() {
    return this._canEdit;
  }

  setLoading = (loading: boolean) => {
    this._loading = loading;
  };

  setError = (error: string | null) => {
    this._error = error;
  };

  setConfig = (config: any) => {
    this._config = config;
  };

  setStatus = (status: any) => {
    this._status = status;
  };

  setCanEdit = (canEdit: boolean) => {
    this._canEdit = canEdit;
  };

  clearError = () => {
    this._error = null;
  };
}

export default AppStore;
