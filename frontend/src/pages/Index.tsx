import { useState, useEffect } from 'react';
import { LoginForm } from '@/components/login/LoginForm';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { authService } from '@/core/services/AuthService';
import { LoginRequest } from '@/core/types';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = async (credentials: LoginRequest) => {
    try {
      await authService.login(credentials);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Erro no login:', error);
      throw error; 
    }
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <DashboardLayout onLogout={handleLogout} />;
};

export default Index;
