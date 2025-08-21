import { IAuthService } from '../interfaces/services';
import { LoginRequest, LoginResponse } from '../types';
import { apiService } from './ApiService';
import { storageService } from './StorageService';

export class AuthService implements IAuthService {
  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';
  
  // Token padrão para desenvolvimento (JWT da imagem)
  private readonly DEFAULT_DEV_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30';

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      // Em desenvolvimento, usar token padrão se as credenciais forem admin/admin123
      if (credentials.nomeUsuario === 'admin' && credentials.senha === 'admin123') {
        const devResponse: LoginResponse = {
          token: this.DEFAULT_DEV_TOKEN,
          nomeUsuario: credentials.nomeUsuario,
          email: 'dev@desafio.com',
          dataExpiracao: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        };
        
        // Salvar token e dados do usuário
        storageService.setItem(this.TOKEN_KEY, devResponse.token);
        storageService.setItem(this.USER_KEY, JSON.stringify({
          nomeUsuario: devResponse.nomeUsuario,
          email: devResponse.email,
          dataExpiracao: devResponse.dataExpiracao
        }));

        return devResponse;
      }

      // Caso contrário, tentar login normal na API
      const response = await apiService.post<LoginResponse>('/autenticacao/login', credentials);
      
      // Salvar token e dados do usuário
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

    // Verificar se o token não expirou
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

      // Aqui você pode implementar a lógica de refresh token
      // Por enquanto, vamos apenas retornar o token atual
      return token;
    } catch (error) {
      console.error('Erro ao renovar token:', error);
      this.logout();
      return null;
    }
  }

  // Método para obter dados do usuário logado
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

  // Método para desenvolvimento - aplicar token padrão
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
