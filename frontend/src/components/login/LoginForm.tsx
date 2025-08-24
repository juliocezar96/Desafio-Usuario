import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { useToast } from '@/hooks/use-toast';
import { LoginRequest } from '@/core/types';
import { validateEmail } from '@/lib/validations';
import { Eye, EyeOff, User, Lock } from 'lucide-react';

interface LoginFormProps {
  onLogin: (credentials: LoginRequest) => Promise<void>;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [credentials, setCredentials] = useState<LoginRequest>({
    nomeUsuario: '',
    senha: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.nomeUsuario || !credentials.senha) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await onLogin(credentials);
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao sistema de gestão de pessoas",
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Erro no login",
        description: error instanceof Error ? error.message : "Falha na autenticação",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-card border-0">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
              <User className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Sistema de Gestão
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Faça login para acessar o sistema
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nomeUsuario" className="text-foreground font-medium">
                  Nome de Usuário
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="nomeUsuario"
                    type="text"
                    placeholder="Digite seu nome de usuário"
                    value={credentials.nomeUsuario}
                    onChange={(e) => setCredentials(prev => ({ ...prev, nomeUsuario: e.target.value }))}
                    className="pl-10 h-12 border-border focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="senha" className="text-foreground font-medium">
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="senha"
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    value={credentials.senha}
                    onChange={(e) => setCredentials(prev => ({ ...prev, senha: e.target.value }))}
                    className="pl-10 pr-10 h-12 border-border focus:ring-primary"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full h-12 mt-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <Spinner size="sm" className="text-white" />
                    <span>Entrando...</span>
                  </div>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};