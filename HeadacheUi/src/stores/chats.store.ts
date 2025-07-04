
import { makeAutoObservable } from "mobx";

interface Message {
  id: string;
  text?: string;
  sender: any;
  timestamp: string;
  isCurrentUser: boolean;
  song?: any;
}

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  participants: any[];
  lastMessageTime: string;
  unread: number;
}

class ChatsStore {
  private _chats: Chat[] = [];
  private _messages: Record<string, Message[]> = {};
  private _activeChat: string | null = null;
  private _loading: boolean = false;
  private _error: string | null = null;
  private _canEdit: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get chats() {
    return this._chats;
  }

  get messages() {
    return this._messages;
  }

  get activeChat() {
    return this._activeChat;
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

  get currentMessages() {
    return this._activeChat ? this._messages[this._activeChat] || [] : [];
  }

  setChats = (chats: Chat[]) => {
    this._chats = chats;
  };

  setMessages = (messages: Record<string, Message[]>) => {
    this._messages = messages;
  };

  setActiveChat = (chatId: string | null) => {
    this._activeChat = chatId;
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

  addChat = (chat: Chat) => {
    this._chats.unshift(chat);
  };

  updateChat = (chatId: string, updates: Partial<Chat>) => {
    const index = this._chats.findIndex(chat => chat.id === chatId);
    if (index !== -1) {
      this._chats[index] = { ...this._chats[index], ...updates };
    }
  };

  removeChat = (chatId: string) => {
    this._chats = this._chats.filter(chat => chat.id !== chatId);
    delete this._messages[chatId];
  };

  addMessage = (chatId: string, message: Message) => {
    if (!this._messages[chatId]) {
      this._messages[chatId] = [];
    }
    this._messages[chatId].push(message);
  };

  clearMessages = (chatId: string) => {
    this._messages[chatId] = [];
  };

  clearError = () => {
    this._error = null;
  };
}

export default ChatsStore;
