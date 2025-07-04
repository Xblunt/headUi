import { Chat } from "@/models";
import { makeAutoObservable } from "mobx";

class ChatStore {
  private _chats: Chat[] = [];
  private _loading: boolean = false;
  private _canEdit: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get chats() {
    return this._chats;
  }

  get loading() {
    return this._loading;
  }

  get canEdit() {
    return this._canEdit;
  }

  setChats = (chats: Chat[]) => {
    this._chats = chats;
  };

  setLoading = (loading: boolean) => {
    this._loading = loading;
  };

  setCanEdit = (canEdit: boolean) => {
    this._canEdit = canEdit;
  };
}

export default ChatStore; 