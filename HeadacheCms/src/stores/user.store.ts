import { User } from "@/models";
import { makeAutoObservable } from "mobx";

class UserStore {
  private _users: User[] = [];
  private _loading: boolean = false;
  private _canEdit: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get users() {
    return this._users;
  }

  get loading() {
    return this._loading;
  }

  get canEdit() {
    return this._canEdit;
  }

  setUsers = (users: User[]) => {
    this._users = users;
  };

  setLoading = (loading: boolean) => {
    this._loading = loading;
  };

  setCanEdit = (canEdit: boolean) => {
    this._canEdit = canEdit;
  };
}

export default UserStore; 