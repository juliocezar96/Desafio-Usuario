import { Pessoa, CriarPessoa, AtualizarPessoa, PessoaV2, CriarPessoaV2, AtualizarPessoaV2, LoginRequest, LoginResponse } from '../types';

// Interface para serviço de pessoas
export interface IPessoaService {
  obterTodas(): Promise<Pessoa[]>;
  obterPorId(id: string): Promise<Pessoa | null>;
  criar(pessoa: CriarPessoa): Promise<Pessoa>;
  atualizar(id: string, pessoa: AtualizarPessoa): Promise<Pessoa>;
  excluir(id: string): Promise<boolean>;
  verificarCPF(cpf: string): Promise<boolean>;
}

// Interface para serviço de pessoas versão 2
export interface IPessoaV2Service {
  obterTodas(): Promise<PessoaV2[]>;
  obterPorId(id: string): Promise<PessoaV2 | null>;
  criar(pessoa: CriarPessoaV2): Promise<PessoaV2>;
  atualizar(id: string, pessoa: AtualizarPessoaV2): Promise<PessoaV2>;
  excluir(id: string): Promise<boolean>;
  verificarCPF(cpf: string): Promise<boolean>;
}

// Interface para serviço de autenticação
export interface IAuthService {
  login(credentials: LoginRequest): Promise<LoginResponse>;
  logout(): void;
  isAuthenticated(): boolean;
  getToken(): string | null;
  refreshToken(): Promise<string | null>;
}

// Interface para serviço de armazenamento local
export interface IStorageService {
  setItem(key: string, value: string): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
  clear(): void;
}
