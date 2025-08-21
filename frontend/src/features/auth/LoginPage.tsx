import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { useAuth } from '../../core/contexts/AuthContext';
import { LoginRequest } from '../../core/types';

const schema = yup.object({
  nomeUsuario: yup.string().required('Nome de usuário é obrigatório'),
  senha: yup.string().required('Senha é obrigatória').min(3, 'Senha deve ter pelo menos 3 caracteres')
}).required();

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginRequest>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: LoginRequest) => {
    try {
      setIsLoading(true);
      setError('');
      await login(data);
      navigate(from, { replace: true });
    } catch (error: any) {
      setError(error.message || 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login do Sistema
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Cadastro de Pessoas
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="nomeUsuario" className="sr-only">
                Nome de Usuário
              </label>
              <input
                {...register('nomeUsuario')}
                id="nomeUsuario"
                type="text"
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.nomeUsuario ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Nome de Usuário"
              />
            </div>
            <div>
              <label htmlFor="senha" className="sr-only">
                Senha
              </label>
              <input
                {...register('senha')}
                id="senha"
                type="password"
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.senha ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Senha"
              />
            </div>
          </div>

          {errors.nomeUsuario && (
            <p className="text-red-600 text-sm">{errors.nomeUsuario.message}</p>
          )}
          
          {errors.senha && (
            <p className="text-red-600 text-sm">{errors.senha.message}</p>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Entrando...
                </div>
              ) : (
                'Entrar'
              )}
            </button>
          </div>

          {/* Credenciais padrão para desenvolvimento */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-2">
              🔑 Credenciais para Desenvolvimento
            </h3>
            <div className="space-y-1 text-sm text-blue-700">
              <p><strong>Usuário:</strong> admin</p>
              <p><strong>Senha:</strong> admin123</p>
              <p className="text-xs mt-2">
                ⚠️ Estas credenciais são apenas para desenvolvimento
              </p>
            </div>
          </div>

          {/* Informações sobre o JWT */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-green-800 mb-2">
              🎯 Sistema JWT Configurado
            </h3>
            <div className="text-sm text-green-700">
              <p>• Token padrão configurado para desenvolvimento</p>
              <p>• Validação automática de assinatura</p>
              <p>• Expiração configurada para 24 horas</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
