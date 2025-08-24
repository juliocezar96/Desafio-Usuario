// TypeScript types for the person management system

export interface Address {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

export interface Person {
  id?: string;
  nome: string;
  sexo?: 'M' | 'F' | 'Outro' | '';
  email?: string;
  dataNascimento: string;
  naturalidade?: string;
  nacionalidade?: string;
  cpf: string;
  endereco?: Address;
  dataCadastro?: string;
  dataAtualizacao?: string;
}

export interface PersonFormData {
  nome: string;
  sexo: string;
  email: string;
  dataNascimento: string;
  naturalidade: string;
  nacionalidade: string;
  cpf: string;
  endereco: Address;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  token?: string;
}