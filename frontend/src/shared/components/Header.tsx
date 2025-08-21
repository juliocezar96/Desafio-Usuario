import React from 'react';
import { useAuth } from '../../core/contexts/AuthContext';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-bottom">
      <div className="container-fluid">
        
        {/* Header Principal - Uma única linha */}
        <div className="row align-items-center py-3">
          
          {/* Logo e Título */}
          <div className="col-md-8">
            <div className="d-flex align-items-center">
              <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '45px', height: '45px'}}>
                <i className="bi bi-people-fill text-primary fs-4"></i>
              </div>
              <div>
                <h1 className="h5 fw-bold text-dark mb-0">Sistema de Cadastro de Pessoas</h1>
                <small className="text-muted">Gestão completa de cadastros</small>
              </div>
            </div>
          </div>

          {/* Informações do Usuário */}
          <div className="col-md-4">
            <div className="d-flex justify-content-end align-items-center">
              <div className="d-flex align-items-center me-3">
                <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: '32px', height: '32px'}}>
                  <i className="bi bi-person-fill text-primary"></i>
                </div>
                <div className="text-end">
                  <small className="text-muted d-block">Olá,</small>
                  <strong className="text-dark">{user?.nomeUsuario}</strong>
                </div>
              </div>
              <button 
                onClick={logout}
                className="btn btn-outline-danger btn-sm"
                title="Sair do sistema"
              >
                <i className="bi bi-box-arrow-right me-1"></i>
                Sair
              </button>
            </div>
          </div>
        </div>

        {/* Navegação Principal - Mais limpa */}
        <div className="row">
          <div className="col-12">
            <nav className="navbar navbar-expand-lg navbar-light bg-light rounded">
              <div className="container-fluid px-0">
                
                {/* Botão Mobile */}
                <button 
                  className="navbar-toggler" 
                  type="button" 
                  data-bs-toggle="collapse" 
                  data-bs-target="#navbarNav"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>

                {/* Menu de Navegação */}
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                      <a className="nav-link active fw-semibold" href="/dashboard">
                        <i className="bi bi-speedometer2 me-2"></i>
                        Dashboard
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link fw-semibold" href="/pessoas">
                        <i className="bi bi-people me-2"></i>
                        Pessoas
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link fw-semibold" href="/pessoas-v2">
                        <i className="bi bi-house me-2"></i>
                        Pessoas V2
                      </a>
                    </li>
                  </ul>

                  {/* Indicador de Página Ativa */}
                  <div className="navbar-text d-none d-lg-block">
                    <small className="text-muted">
                      <i className="bi bi-geo-alt me-1"></i>
                      Página atual: <strong>Dashboard</strong>
                    </small>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>

      </div>
    </header>
  );
};
