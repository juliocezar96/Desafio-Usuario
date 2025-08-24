import { IAuthService } from '../interfaces/services';
import { LoginRequest, LoginResponse } from '../types';
import { apiService } from './ApiService';
import { storageService } from './StorageService';

export class AuthService implements IAuthService {
  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';
  
  private readonly DEFAULT_DEV_TOKEN='';
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiService.post<LoginResponse>('/Autenticacao/login', credentials);
      console.log(response);
      storageService.setItem(this.TOKEN_KEY, response.token);
      storageService.setItem(this.USER_KEY, JSON.stringify({
        nomeUsuario: response.nomeUsuario,
        email: response.email,
        dataExpiracao: response.dataExpiracao
      }));

      return response;
    } catch (error) {
      console.error('Erro no login:', error);
      throw new Error('Falha na autenticação. Verifique suas credenciais.');
    }
  }

  logout(): void {
    storageService.removeItem(this.TOKEN_KEY);
    storageService.removeItem(this.USER_KEY);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const userStr = storageService.getItem(this.USER_KEY);
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        const expiracao = new Date(user.dataExpiracao);
        if (expiracao <= new Date()) {
          this.logout();
          return false;
        }
      } catch (error) {
        console.error('Erro ao verificar expiração do token:', error);
        this.logout();
        return false;
      }
    }

    return true;
  }

  getToken(): string | null {
    return storageService.getItem(this.TOKEN_KEY);
  }

  async refreshToken(): Promise<string | null> {
    try {
      const token = this.getToken();
      if (!token) return null;

      return token;
    } catch (error) {
      console.error('Erro ao renovar token:', error);
      this.logout();
      return null;
    }
  }

  getCurrentUser() {
    const userStr = storageService.getItem(this.USER_KEY);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Erro ao obter usuário atual:', error);
        return null;
      }
    }
    return null;
  }

  applyDevToken(): void {
    if (process.env.NODE_ENV === 'development') {
      storageService.setItem(this.TOKEN_KEY, this.DEFAULT_DEV_TOKEN);
      storageService.setItem(this.USER_KEY, JSON.stringify({
        nomeUsuario: 'admin',
        email: 'dev@desafio.com',
        dataExpiracao: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      }));
    }
  }
}

export const authService = new AuthService();
