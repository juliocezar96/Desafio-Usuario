# Desafio - Sistema de Gerenciamento de Pessoas

Este projeto é uma aplicação full-stack para gerenciamento de pessoas, desenvolvida com **ASP.NET Core 8** no backend e **React + TypeScript** no frontend, seguindo princípios de Clean Architecture.

## 📋 Visão Geral

O sistema oferece duas versões da API para gerenciamento de pessoas:
- **V1**: CRUD básico com endereço opcional
- **V2**: CRUD completo com endereço obrigatório

### Funcionalidades Principais
- ✅ Autenticação JWT
- ✅ CRUD completo de pessoas
- ✅ Validação de CPF
- ✅ Versionamento de API (V1/V2)
- ✅ Interface responsiva
- ✅ Documentação Swagger
- ✅ Arquitetura limpa e modular

## 🏗️ Arquitetura do Projeto

```
Desafio-Usuario/
├── backend/                 # API .NET 8
│   └── Desafio-main/
│       ├── Application/     # Camada de Aplicação
│       ├── Domain/          # Camada de Domínio
│       ├── Infrastructure/  # Camada de Infraestrutura
│       └── Presentation/    # Camada de Apresentação
└── frontend/               # React + TypeScript
    ├── public/             # Arquivos estáticos
    └── src/
        ├── components/     # Componentes React
        ├── core/          # Núcleo da aplicação
        ├── hooks/         # Custom hooks
        └── types/         # Tipos TypeScript
```

## 🚀 Tecnologias Utilizadas

### Backend (.NET 8)
- **ASP.NET Core 8** - Framework web
- **Entity Framework Core** - ORM com InMemoryDatabase
- **JWT Bearer Authentication** - Autenticação
- **FluentValidation** - Validação de dados
- **AutoMapper** - Mapeamento de objetos
- **Swagger/OpenAPI** - Documentação da API

### Frontend (React + TypeScript)
- **React 18** - Biblioteca de UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS
- **shadcn/ui** - Componentes de UI
- **React Hook Form + Zod** - Formulários e validação
- **TanStack Query** - Gerenciamento de estado servidor
- **Axios** - Cliente HTTP

## ⚡ Execução Rápida

### Pré-requisitos
- .NET 8 SDK
- Node.js 18+
- Visual Studio 2022 ou VS Code

### 1. Backend
```bash
cd backend/Desafio-main
dotnet restore
dotnet run
```
**API disponível em:** `http://localhost:5054`
**Swagger UI:** `http://localhost:5054`

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
**Aplicação disponível em:** `http://localhost:8080`

### Credenciais de Acesso
- **Usuário:** admin
- **Senha:** admin123

## 📚 Documentação Detalhada

### Backend
Consulte o [README do Backend](./backend/README.md) para informações detalhadas sobre:
- Arquitetura Clean Architecture
- Endpoints da API (V1 e V2)
- Configurações JWT
- Estrutura de dados
- Padrões de desenvolvimento

### Frontend
Consulte o [README do Frontend](./frontend/README.md) para informações detalhadas sobre:
- Arquitetura de componentes
- Gerenciamento de estado
- Validações e formulários
- Configurações do ambiente
- Padrões de código

## 🔗 Endpoints Principais

### Autenticação
- `POST /api/Autenticacao/login` - Login e obtenção de token
- `POST /api/Autenticacao/validar-token` - Validação de token

### Pessoas V1 (Endereço Opcional)
- `GET /api/v1/Pessoas` - Listar pessoas
- `POST /api/v1/Pessoas` - Criar pessoa
- `PUT /api/v1/Pessoas/{id}` - Atualizar pessoa
- `DELETE /api/v1/Pessoas/{id}` - Excluir pessoa
- `GET /api/v1/Pessoas/verificar-cpf/{cpf}` - Verificar CPF

### Pessoas V2 (Endereço Obrigatório)
- `GET /api/v2/Pessoas` - Listar pessoas com endereço
- `POST /api/v2/Pessoas` - Criar pessoa (endereço obrigatório)
- `PUT /api/v2/Pessoas/{id}` - Atualizar pessoa
- `DELETE /api/v2/Pessoas/{id}` - Excluir pessoa
- `GET /api/v2/Pessoas/verificar-cpf/{cpf}` - Verificar CPF

## 🎯 Funcionalidades por Versão

| Funcionalidade | V1 | V2 |
|---|---|---|
| CRUD de Pessoas | ✅ | ✅ |
| Validação de CPF | ✅ | ✅ |
| Endereço | Opcional | Obrigatório |
| Autenticação JWT | ✅ | ✅ |
| Documentação Swagger | ✅ | ✅ |

## 🛠️ Desenvolvimento

### Estrutura de Dados

#### Pessoa
- **Campos básicos:** Nome, Sexo, Email, CPF, Data de Nascimento
- **Localização:** Naturalidade, Nacionalidade
- **Endereço:** Logradouro, Número, Bairro, Cidade, Estado, CEP
- **Auditoria:** Data de Cadastro, Data de Atualização

#### Usuário
- **Autenticação:** Nome de usuário, senha, email
- **Perfil:** Nome completo, status ativo
- **Auditoria:** Data de cadastro, último login

### Validações Implementadas
- **CPF:** Validação de dígitos verificadores
- **Email:** Formato válido
- **Campos obrigatórios:** Conforme versão da API
- **Endereço:** Validação de CEP e campos obrigatórios (V2)

## 🔒 Segurança

- **JWT Authentication** com chave secreta configurável
- **CORS** configurado para desenvolvimento
- **Validação de entrada** em todas as camadas
- **Tratamento de exceções** centralizado
- **Armazenamento seguro** de tokens no frontend

## 📱 Interface de Usuário

- **Design responsivo** para desktop e mobile
- **Tema escuro/claro** disponível
- **Componentes acessíveis** com Radix UI
- **Feedback visual** com toasts e loading states
- **Formulários intuitivos** com validação em tempo real

## 🧪 Testes

O projeto está estruturado para suportar:
- **Testes unitários** no backend
- **Testes de integração** com banco em memória
- **Testes de componentes** no frontend (estrutura preparada)

## 📝 Notas para o Revisor

### Pontos de Destaque
1. **Arquitetura Limpa:** Separação clara de responsabilidades
2. **Versionamento:** API V1 e V2 com diferentes regras de negócio
3. **Validações:** CPF, email e campos obrigatórios
4. **UI/UX:** Interface moderna e responsiva
5. **Documentação:** Swagger integrado para testes da API

### Melhorias Futuras
- Implementação de testes automatizados
- Integração com banco de dados real
- Cache de dados no frontend
- Paginação avançada
- Logs estruturados

---

**Desenvolvido como parte do desafio técnico - Sistema de Gerenciamento de Pessoas**
