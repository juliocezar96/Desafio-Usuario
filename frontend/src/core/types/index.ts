export interface Pessoa {
  id: string;
  nome: string;
  sexo?: string;
  email?: string;
  dataNascimento: string;
  naturalidade?: string;
  nacionalidade?: string;
  cpf: string;
  dataCadastro: string;
  dataAtualizacao: string;
}

export interface CriarPessoa {
  nome: string;
  sexo?: string;
  email?: string;
  dataNascimento: string;
  naturalidade?: string;
  nacionalidade?: string;
  cpf: string;
}

export interface AtualizarPessoa {
  nome: string;
  sexo?: string;
  email?: string;
  dataNascimento: string;
  naturalidade?: string;
  nacionalidade?: string;
  cpf: string;
}

// Tipos para Endereço
export interface Endereco {
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

// Tipos para PessoaV2 (com endereço)
export interface PessoaV2 {
  id: string;
  nome: string;
  sexo?: string;
  email?: string;
  dataNascimento: string;
  naturalidade?: string;
  nacionalidade?: string;
  cpf: string;
  endereco: Endereco;
  dataCadastro: string;
  dataAtualizacao: string;
}

export interface CriarPessoaV2 {
  nome: string;
  sexo?: string;
  email?: string;
  dataNascimento: string;
  naturalidade?: string;
  nacionalidade?: string;
  cpf: string;
  endereco: Endereco;
}

export interface AtualizarPessoaV2 {
  nome: string;
  sexo?: string;
  email?: string;
  dataNascimento: string;
  naturalidade?: string;
  nacionalidade?: string;
  cpf: string;
  endereco: Endereco;
}

// Tipos para Autenticação
export interface LoginRequest {
  nomeUsuario: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  nomeUsuario: string;
  email: string;
  dataExpiracao: string;
}

export interface Usuario {
  id: string;
  nomeUsuario: string;
  email: string;
  nomeCompleto?: string;
  ativo: boolean;
  dataCadastro: string;
  ultimoLogin?: string;
}

// Tipos para API
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
