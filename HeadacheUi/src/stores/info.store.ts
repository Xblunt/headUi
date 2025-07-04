import { User } from "@/models";
import { makeAutoObservable } from "mobx";

class InfoStore {
  private _users: User[] = [];
  private _currentUser: User | null = null;
  private _loading: boolean = false;
  private _error: string | null = null;
  private _canEdit: boolean = false;
  private _isEditing: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get users() {
    return this._users;
  }

  get currentUser() {
    return this._currentUser;
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

  get isEditing() {
    return this._isEditing;
  }

  setUsers = (users: User[]) => {
    this._users = users;
  };

  setCurrentUser = (user: User | null) => {
    this._currentUser = user;
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

  setIsEditing = (isEditing: boolean) => {
    this._isEditing = isEditing;
  };

  addUser = (user: User) => {
    this._users.push(user);
  };

  updateUser = (userId: string, updates: Partial<User>) => {
    const index = this._users.findIndex(user => user.uuid === userId);
    if (index !== -1) {
      this._users[index] = { ...this._users[index], ...updates };
    }
    if (this._currentUser && this._currentUser.uuid === userId) {
      this._currentUser = { ...this._currentUser, ...updates };
    }
  };

  removeUser = (userId: string) => {
    this._users = this._users.filter(user => user.uuid !== userId);
  };

  getUserById = (userId: string) => {
    return this._users.find(user => user.uuid === userId) || null;
  };

  getUserByLogin = (login: string) => {
    return this._users.find(user => user.login === login) || null;
  };

  clearError = () => {
    this._error = null;
  };
}

export default InfoStore;
