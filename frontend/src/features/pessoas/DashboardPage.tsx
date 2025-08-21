import React from 'react';
import { useAuth } from '../../core/contexts/AuthContext';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      
      {/* Título da Página */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex align-items-center">
            <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
              <i className="bi bi-speedometer2 text-primary fs-3"></i>
            </div>
            <div>
              <h2 className="h3 fw-bold text-dark mb-1">Dashboard</h2>
              <p className="text-muted mb-0">Visão geral do sistema</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="row g-4 mb-4">
        
        {/* Card Usuário Logado */}
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center p-4">
              <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px'}}>
                <i className="bi bi-person-fill text-primary fs-3"></i>
              </div>
              <h6 className="card-title text-muted mb-2">Usuário Logado</h6>
              <h4 className="fw-bold text-dark mb-0">{user?.nomeUsuario}</h4>
              <small className="text-success">
                <i className="bi bi-check-circle me-1"></i>
                Ativo
              </small>
            </div>
          </div>
        </div>

        {/* Card Funcionalidades */}
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center p-4">
              <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px'}}>
                <i className="bi bi-gear-fill text-success fs-3"></i>
              </div>
              <h6 className="card-title text-muted mb-2">Funcionalidades</h6>
              <h4 className="fw-bold text-dark mb-0">CRUD</h4>
              <small className="text-success">
                <i className="bi bi-check-circle me-1"></i>
                Completo
              </small>
            </div>
          </div>
        </div>

        {/* Card Versões API */}
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center p-4">
              <div className="bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px'}}>
                <i className="bi bi-code-slash text-info fs-3"></i>
              </div>
              <h6 className="card-title text-muted mb-2">Versões API</h6>
              <h4 className="fw-bold text-dark mb-0">V1 & V2</h4>
              <small className="text-info">
                <i className="bi bi-arrow-up-circle me-1"></i>
                Atualizadas
              </small>
            </div>
          </div>
        </div>

        {/* Card Status Sistema */}
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center p-4">
              <div className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px'}}>
                <i className="bi bi-server text-warning fs-3"></i>
              </div>
              <h6 className="card-title text-muted mb-2">Status Sistema</h6>
              <h4 className="fw-bold text-dark mb-0">Online</h4>
              <small className="text-warning">
                <i className="bi bi-wifi me-1"></i>
                Conectado
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Navegação Rápida */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-transparent border-0 pb-0">
              <h5 className="card-title mb-0">
                <i className="bi bi-compass me-2 text-primary"></i>
                Navegação Rápida
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-6 col-md-3">
                  <a href="/pessoas" className="btn btn-outline-primary w-100 py-3">
                    <i className="bi bi-people-fill me-2"></i>
                    <div className="d-block">
                      <strong>Pessoas</strong>
                      <small className="d-block text-muted">Gerenciar cadastros</small>
                    </div>
                  </a>
                </div>
                <div className="col-6 col-md-3">
                  <a href="/pessoas-v2" className="btn btn-outline-success w-100 py-3">
                    <i className="bi bi-house-fill me-2"></i>
                    <div className="d-block">
                      <strong>Pessoas V2</strong>
                      <small className="d-block text-muted">Com endereços</small>
                    </div>
                  </a>
                </div>
                <div className="col-6 col-md-3">
                  <a href="/dashboard" className="btn btn-outline-info w-100 py-3">
                    <i className="bi bi-graph-up me-2"></i>
                    <div className="d-block">
                      <strong>Dashboard</strong>
                      <small className="d-block text-muted">Visão geral</small>
                    </div>
                  </a>
                </div>
                <div className="col-6 col-md-3">
                  <a href="/configuracoes" className="btn btn-outline-secondary w-100 py-3">
                    <i className="bi bi-gear-fill me-2"></i>
                    <div className="d-block">
                      <strong>Configurações</strong>
                      <small className="d-block text-muted">Sistema</small>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Informações do Sistema */}
      <div className="row g-4">
        
        {/* Funcionalidades Principais */}
        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-transparent border-0">
              <h5 className="card-title mb-0">
                <i className="bi bi-star-fill me-2 text-warning"></i>
                Funcionalidades Principais
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-6">
                  <div className="d-flex align-items-center p-2 rounded bg-light">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    <small>Cadastro de pessoas</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center p-2 rounded bg-light">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    <small>Validações CPF</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center p-2 rounded bg-light">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    <small>Edição e exclusão</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center p-2 rounded bg-light">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    <small>Consulta avançada</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center p-2 rounded bg-light">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    <small>Autenticação JWT</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center p-2 rounded bg-light">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    <small>API RESTful</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tecnologias Utilizadas */}
        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-transparent border-0">
              <h5 className="card-title mb-0">
                <i className="bi bi-code-square me-2 text-info"></i>
                Tecnologias Utilizadas
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-6">
                  <div className="d-flex align-items-center p-2 rounded bg-primary bg-opacity-10">
                    <i className="bi bi-microsoft text-primary me-2"></i>
                    <small>.NET 8 + EF</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center p-2 rounded bg-info bg-opacity-10">
                    <i className="bi bi-braces text-info me-2"></i>
                    <small>React + TS</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center p-2 rounded bg-success bg-opacity-10">
                    <i className="bi bi-shield-lock text-success me-2"></i>
                    <small>JWT Auth</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center p-2 rounded bg-warning bg-opacity-10">
                    <i className="bi bi-patch-check text-warning me-2"></i>
                    <small>FluentValidation</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center p-2 rounded bg-danger bg-opacity-10">
                    <i className="bi bi-layers text-danger me-2"></i>
                    <small>Clean Architecture</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center p-2 rounded bg-secondary bg-opacity-10">
                    <i className="bi bi-bootstrap text-secondary me-2"></i>
                    <small>Bootstrap 5</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer do Dashboard */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="text-center">
            <hr className="my-4" />
            <small className="text-muted">
              <i className="bi bi-heart-fill text-danger me-1"></i>
              Sistema desenvolvido com as melhores práticas • 
              <i className="bi bi-clock me-1 ms-2"></i>
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </small>
          </div>
        </div>
      </div>

    </div>
  );
};
