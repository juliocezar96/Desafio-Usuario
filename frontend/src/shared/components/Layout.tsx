import React from 'react';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-vh-100 bg-light">
      {/* Header Organizado */}
      <Header />

      {/* Conteúdo Principal */}
      <main className="container-fluid py-4">
        {children}
      </main>
    </div>
  );
};
