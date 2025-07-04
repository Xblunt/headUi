import { Main } from "@/models";
import { makeAutoObservable } from "mobx";

class MainStore {
  private _main: Main | null = null;
  private _loading: boolean = false;
  private _canEdit: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get main() {
    return this._main;
  }

  get loading() {
    return this._loading;
  }

  get canEdit() {
    return this._canEdit;
  }

  setMain = (main: Main | null) => {
    this._main = main;
  };

  setLoading = (loading: boolean) => {
    this._loading = loading;
  };

  setCanEdit = (canEdit: boolean) => {
    this._canEdit = canEdit;
  };
}

export default MainStore; 