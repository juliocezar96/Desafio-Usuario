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
    <div className="login-page d-flex align-items-center justify-content-center min-vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
            
            {/* Card Principal */}
            <div className="login-page__container shadow-lg p-4 p-md-5">
              
              {/* Header */}
              <div className="text-center mb-5">
                <div className="login-page__header-logo mx-auto mb-4">
                  <i className="bi bi-people-fill"></i>
                </div>
                <h1 className="h2 fw-bold text-dark mb-2">Sistema de Cadastro</h1>
                <p className="text-muted mb-0">Faça login para acessar o sistema</p>
              </div>

              {/* Formulário */}
              <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
                
                {/* Campo Usuário */}
                <div className="mb-3">
                  <label htmlFor="nomeUsuario" className="form-label fw-semibold">
                    <i className="bi bi-person me-2"></i>Usuário
                  </label>
                  <input
                    {...register('nomeUsuario')}
                    id="nomeUsuario"
                    type="text"
                    className={`form-control form-control-lg ${
                      errors.nomeUsuario ? 'is-invalid' : ''
                    }`}
                    placeholder="Digite seu usuário"
                  />
                  {errors.nomeUsuario && (
                    <div className="invalid-feedback">
                      {errors.nomeUsuario.message}
                    </div>
                  )}
                </div>

                {/* Campo Senha */}
                <div className="mb-4">
                  <label htmlFor="senha" className="form-label fw-semibold">
                    <i className="bi bi-lock me-2"></i>Senha
                  </label>
                  <input
                    {...register('senha')}
                    id="senha"
                    type="password"
                    className={`form-control form-control-lg ${
                      errors.senha ? 'is-invalid' : ''
                    }`}
                    placeholder="Digite sua senha"
                  />
                  {errors.senha && (
                    <div className="invalid-feedback">
                      {errors.senha.message}
                    </div>
                  )}
                </div>

                {/* Botão de Login */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary btn-lg w-100 fw-semibold py-3"
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Entrando...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Entrar no Sistema
                    </>
                  )}
                </button>
              </form>

              {/* Mensagem de Erro */}
              {error && (
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <div>{error}</div>
                </div>
              )}

              {/* Informações de Desenvolvimento */}
              <div className="row g-3 mt-4">
                
                {/* Credenciais */}
                <div className="col-12">
                  <div className="card border-0 bg-light">
                    <div className="card-body p-3">
                      <h6 className="card-title text-primary mb-2">
                        <i className="bi bi-key me-2"></i>
                        Credenciais para Desenvolvimento
                      </h6>
                      <div className="row text-center">
                        <div className="col-6">
                          <small className="text-muted d-block">Usuário</small>
                          <code className="text-primary">admin</code>
                        </div>
                        <div className="col-6">
                          <small className="text-muted d-block">Senha</small>
                          <code className="text-primary">admin123</code>
                        </div>
                      </div>
                      <div className="alert alert-warning alert-sm mt-2 mb-0 py-1">
                        <small>
                          <i className="bi bi-exclamation-triangle me-1"></i>
                          Apenas para desenvolvimento
                        </small>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status do Sistema */}
                <div className="col-12">
                  <div className="card border-0 bg-success bg-opacity-10">
                    <div className="card-body p-3">
                      <h6 className="card-title text-success mb-2">
                        <i className="bi bi-check-circle me-2"></i>
                        Sistema JWT Configurado
                      </h6>
                      <ul className="list-unstyled mb-0 small">
                        <li className="text-success">
                          <i className="bi bi-dot me-1"></i>
                          Token padrão para desenvolvimento
                        </li>
                        <li className="text-success">
                          <i className="bi bi-dot me-1"></i>
                          Validação automática ativa
                        </li>
                        <li className="text-success">
                          <i className="bi bi-dot me-1"></i>
                          Expiração: 24 horas
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="text-center mt-4">
              <small className="text-muted">
                <i className="bi bi-shield-check me-1"></i>
                Desafio
              </small>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
