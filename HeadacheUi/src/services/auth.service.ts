import { AuthData, Token } from "@/models";
import { AuthStore } from "@/stores";
import { AUTH_STORE } from "@/stores/identifiers";
import { setToken } from "@/utils/authToken";
import { postLogin } from "@/utils/fetchWrapper";

import Injector from "@/utils/injector";

class AuthService {
  private static instance: AuthService;
  private authStore: AuthStore;

  private constructor() {
    this.authStore = Injector.get<AuthStore>(AUTH_STORE);
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async singIn(auth: AuthData): Promise<Token> {
    try {
      const response = await postLogin(`auth/sign-in`, JSON.stringify(auth));
      if (response) {
        const res = JSON.parse(response);
        setToken(res.token);
        
        return res;
      } else {
        console.error('Ошибка авторизации');
      }
      throw new Error("Failed to login");
    } finally { }
  };
  
}

export default AuthService;
