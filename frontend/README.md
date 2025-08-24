# Desafio Frontend - React + TypeScript

## Arquitetura

Este projeto segue uma arquitetura modular baseada em **Clean Architecture** e **Feature-Based Structure**:

```
frontend/
├── public/                  # Arquivos estáticos
├── src/
│   ├── components/         # Componentes React
│   │   ├── dashboard/     # Componentes do dashboard
│   │   ├── login/         # Componentes de login
│   │   └── ui/           # Componentes de UI (shadcn/ui)
│   ├── core/              # Núcleo da aplicação
│   │   ├── contexts/      # Contextos React
│   │   ├── interfaces/    # Interfaces TypeScript
│   │   ├── services/      # Serviços de API e negócio
│   │   └── types/         # Tipos TypeScript
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utilitários e configurações
│   └── types/             # Tipos específicos
├── package.json
└── README.md
```

## Tecnologias Utilizadas

### Framework e Runtime
- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset tipado do JavaScript
- **Vite** - Build tool e dev server

### UI e Styling
- **Tailwind CSS** - Framework CSS utility-first
- **shadcn/ui** - Componentes de UI reutilizáveis
- **Lucide React** - Ícones
- **Radix UI** - Primitivos de UI acessíveis

### Roteamento e Estado
- **React Router DOM** - Roteamento client-side
- **React Context** - Gerenciamento de estado global

### Formulários e Validação
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schema TypeScript-first

### HTTP e API
- **Axios** - Cliente HTTP
- **React Query/TanStack Query** - Gerenciamento de estado servidor

### Utilitários
- **date-fns** - Manipulação de datas
- **clsx** - Utilitário para classes condicionais
- **class-variance-authority** - Variantes de componentes

## Funcionalidades

### Autenticação
- Login com JWT
- Proteção de rotas
- Gerenciamento de sessão
- Logout automático em caso de token expirado

### Gerenciamento de Pessoas
- **Versão 1**: CRUD básico de pessoas
- **Versão 2**: CRUD com endereço obrigatório
- Validação de CPF
- Formatação automática de campos
- Busca e filtros

### Interface de Usuário
- Design responsivo
- Tema escuro/claro
- Componentes acessíveis
- Feedback visual (toasts, loading states)
- Formulários com validação em tempo real

## Configuração e Execução

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn ou bun

### Instalação
```bash
cd frontend
npm install
```

### Desenvolvimento
```bash
npm run dev
```

### Build para Produção
```bash
npm run build
```

### Preview da Build
```bash
npm run preview
```

## Estrutura de Componentes

### Dashboard Layout
- Sidebar responsiva
- Header com informações do usuário
- Navegação entre versões da API
- Área de conteúdo principal

### Formulários
- **PersonForm**: Formulário V1 (endereço opcional)
- **PersonFormV2**: Formulário V2 (endereço obrigatório)
- Validação em tempo real
- Máscaras para CPF e CEP

### Listas e Tabelas
- Tabelas responsivas
- Paginação
- Ordenação
- Ações inline (editar, excluir)

## Serviços e APIs

### AuthService
- Gerenciamento de autenticação
- Armazenamento seguro de tokens
- Renovação automática de tokens

### ApiService
- Cliente HTTP configurado
- Interceptors para autenticação
- Tratamento de erros centralizado

### StorageService
- Abstração do localStorage
- Prefixos para organização
- Tratamento de erros

## Validações

### CPF
- Validação de dígitos verificadores
- Formatação automática
- Verificação de sequências inválidas

### CEP
- Validação de formato
- Integração com APIs de CEP (preparado)

### Formulários
- Validação com Zod schemas
- Mensagens de erro personalizadas
- Validação em tempo real

## Configurações

### Variáveis de Ambiente
```env
VITE_API_BASE_URL=http://localhost:5054/api
```

### Tailwind CSS
- Configuração customizada
- Tema personalizado
- Componentes shadcn/ui integrados

## Desenvolvimento

### Padrões de Código
- Componentes funcionais com hooks
- TypeScript strict mode
- Props tipadas
- Custom hooks para lógica reutilizável

### Estrutura de Pastas
- Separação por feature
- Componentes reutilizáveis em `/ui`
- Serviços centralizados em `/core`
- Types organizados por domínio

### Responsividade
- Mobile-first approach
- Breakpoints do Tailwind CSS
- Componentes adaptativos
