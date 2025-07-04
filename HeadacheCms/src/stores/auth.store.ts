import { makeAutoObservable } from "mobx";

class AuthStore {
  private _notHaveToken: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get notHaveToken() {
    return this._notHaveToken;
  }

  setNotHaveToken = (flag: boolean) => {
    this._notHaveToken = flag;
  };
}

export default AuthStore;
