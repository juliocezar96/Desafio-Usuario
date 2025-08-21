// ==========================================================================
// CONFIGURAÇÃO DO TOKEN DE DESENVOLVIMENTO
// ==========================================================================

// Token JWT padrão para desenvolvimento (extraído da imagem)
export const DEV_JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30';

// Credenciais padrão para desenvolvimento
export const DEV_CREDENTIALS = {
  nomeUsuario: 'admin',
  senha: 'admin123',
  email: 'dev@desafio.com'
};

// Configurações do token
export const DEV_TOKEN_CONFIG = {
  algorithm: 'HS256',
  type: 'JWT',
  payload: {
    sub: '1234567890',
    name: 'John Doe',
    admin: true,
    iat: 1516239022
  },
  secret: 'a-string-secret-at-least-256-bits-long',
  issuer: 'DesafioBackend',
  audience: 'DesafioFrontend',
  expirationHours: 24
};

// Função para verificar se estamos em desenvolvimento
export const isDevelopment = (): boolean => {
  return process.env.NODE_ENV === 'development' || 
         process.env.NODE_ENV === undefined ||
         window.location.hostname === 'localhost' ||
         window.location.hostname === '127.0.0.1';
};

// Função para aplicar token de desenvolvimento automaticamente
export const applyDevTokenIfNeeded = (): void => {
  if (isDevelopment()) {
    const token = localStorage.getItem('desafio_token');
    if (!token) {
      localStorage.setItem('desafio_token', DEV_JWT_TOKEN);
      localStorage.setItem('desafio_user', JSON.stringify({
        nomeUsuario: DEV_CREDENTIALS.nomeUsuario,
        email: DEV_CREDENTIALS.email,
        dataExpiracao: new Date(Date.now() + DEV_TOKEN_CONFIG.expirationHours * 60 * 60 * 1000).toISOString()
      }));
      console.log('🔑 Token de desenvolvimento aplicado automaticamente');
    }
  }
};
