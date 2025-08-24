# Desafio Backend - API .NET 8

## Arquitetura

Este projeto segue os princípios da **Clean Architecture** com separação clara de responsabilidades:

```
backend/
└── Desafio-main/
    ├── Application/          # Camada de Aplicação
    │   ├── DTOs/            # Data Transfer Objects
    │   ├── Interfaces/      # Contratos de serviços
    │   ├── Mapping/         # Mapeamento AutoMapper
    │   ├── Services/        # Lógica de negócio
    │   └── Validators/      # Validações FluentValidation
    ├── Domain/              # Camada de Domínio
    │   ├── Entities/        # Entidades do domínio
    │   ├── Factories/       # Factories para criação de objetos
    │   └── Interfaces/      # Contratos de repositórios
    ├── Infrastructure/      # Camada de Infraestrutura
    │   ├── Authentication/  # Serviços de autenticação JWT
    │   ├── Data/           # Contexto do Entity Framework
    │   └── Repositories/   # Implementação dos repositórios
    └── Presentation/        # Camada de Apresentação
        └── Controllers/     # Controllers da API REST
```

## Tecnologias Utilizadas

### Framework e Runtime
- **.NET 8** - Framework principal
- **ASP.NET Core** - Framework web
- **C# 12** - Linguagem de programação

### Banco de Dados
- **Entity Framework Core** - ORM
- **InMemoryDatabase** - Banco em memória para desenvolvimento

### Autenticação e Segurança
- **JWT Bearer Authentication** - Autenticação baseada em tokens
- **Microsoft.IdentityModel.Tokens** - Validação de tokens JWT

### Validação e Mapeamento
- **FluentValidation** - Validação de dados
- **AutoMapper** - Mapeamento entre objetos

### Documentação
- **Swagger/OpenAPI** - Documentação interativa da API
- **Swashbuckle.AspNetCore** - Geração automática de documentação

### Padrões e Princípios
- **Clean Architecture** - Separação de camadas
- **Repository Pattern** - Abstração de acesso a dados
- **Dependency Injection** - Inversão de controle
- **SOLID Principles** - Princípios de design

## Funcionalidades

### API Versioning
- **v1**: Versão básica da API de pessoas
- **v2**: Versão estendida com endereço obrigatório

### Endpoints Principais

#### Autenticação
- `POST /api/Autenticacao/login` - Login e obtenção de token JWT
- `POST /api/Autenticacao/validar-token` - Validação de token

#### Pessoas V1
- `GET /api/v1/Pessoas` - Listar todas as pessoas
- `GET /api/v1/Pessoas/{id}` - Obter pessoa por ID
- `POST /api/v1/Pessoas` - Criar nova pessoa
- `PUT /api/v1/Pessoas/{id}` - Atualizar pessoa
- `DELETE /api/v1/Pessoas/{id}` - Excluir pessoa
- `GET /api/v1/Pessoas/verificar-cpf/{cpf}` - Verificar CPF

#### Pessoas V2
- `GET /api/v2/Pessoas` - Listar todas as pessoas (com endereço)
- `GET /api/v2/Pessoas/{id}` - Obter pessoa por ID (com endereço)
- `POST /api/v2/Pessoas` - Criar nova pessoa (endereço obrigatório)
- `PUT /api/v2/Pessoas/{id}` - Atualizar pessoa (com endereço)
- `DELETE /api/v2/Pessoas/{id}` - Excluir pessoa
- `GET /api/v2/Pessoas/verificar-cpf/{cpf}` - Verificar CPF

## Configuração e Execução

### Pré-requisitos
- .NET 8 SDK
- Visual Studio 2022 ou VS Code

### Executando o Projeto
```bash
cd backend/Desafio-main
dotnet restore
dotnet run
```

### Acessando a API
- **API Base URL**: `http://localhost:5054`
- **Swagger UI**: `http://localhost:5054` (raiz)
- **Health Check**: Disponível através dos endpoints da API

### Usuário Padrão
- **Usuário**: admin
- **Senha**: admin123

## Estrutura de Dados

### Entidades Principais

#### Pessoa (V1)
- Id, Nome, Sexo, Email, DataNascimento
- Naturalidade, Nacionalidade, CPF
- DataCadastro, DataAtualizacao
- Endereco (opcional)

#### PessoaV2 (V2)
- Mesmos campos da V1
- Endereco (obrigatório)

#### Usuario
- Id, NomeUsuario, Senha, Email
- NomeCompleto, Ativo, DataCadastro, UltimoLogin

#### Endereco
- Logradouro, Numero, Complemento
- Bairro, Cidade, Estado, CEP

## Configurações

### JWT Settings (appsettings.json)
```json
{
  "Jwt": {
    "SecretKey": "a-string-secret-at-least-256-bits-long",
    "Issuer": "DesafioBackend",
    "Audience": "DesafioFrontend"
  }
}
```

### CORS
- Configurado para aceitar qualquer origem em desenvolvimento
- Permite todos os métodos HTTP e headers

## Desenvolvimento

### Padrões de Código
- Uso de DTOs para transferência de dados
- Validação com FluentValidation
- Tratamento de exceções centralizado
- Logging estruturado
- Injeção de dependência nativa do .NET

### Testes
- Estrutura preparada para testes unitários
- Banco em memória facilita testes de integração
