import React from 'react';
import { useAuth } from '../../core/contexts/AuthContext';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Bem-vindo ao sistema de cadastro de pessoas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card de Boas-vindas */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {user?.nomeUsuario?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Usuário Logado
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {user?.nomeUsuario}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Card de Funcionalidades */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Funcionalidades
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    CRUD Completo
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Card de Versões */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Versões da API
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    V1 e V2
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Informações */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Sobre o Sistema
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Funcionalidades Principais</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Cadastro de pessoas com validações</li>
                <li>• Edição e exclusão de registros</li>
                <li>• Consulta e listagem de pessoas</li>
                <li>• Validação de CPF único</li>
                <li>• Autenticação JWT</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Tecnologias Utilizadas</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Backend: .NET 8 + Entity Framework</li>
                <li>• Frontend: React + TypeScript</li>
                <li>• Autenticação: JWT</li>
                <li>• Validação: FluentValidation + Yup</li>
                <li>• Arquitetura: Clean Architecture</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
