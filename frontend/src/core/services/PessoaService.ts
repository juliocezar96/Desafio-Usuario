import { IPessoaService } from '../interfaces/services';
import { Pessoa, CriarPessoa, AtualizarPessoa } from '../types';
import { apiService } from './ApiService';

export class PessoaService implements IPessoaService {
  async obterTodas(): Promise<Pessoa[]> {
    try {
      return await apiService.get<Pessoa[]>('/v1/pessoas');
    } catch (error: any) {
      console.error('Erro ao obter pessoas:', error);
      throw new Error('Falha ao carregar lista de pessoas.');
    }
  }

  async obterPorId(id: string): Promise<Pessoa | null> {
    try {
      return await apiService.get<Pessoa>(`/v1/pessoas/${id}`);
    } catch (error: any) {
      console.error('Erro ao obter pessoa:', error);
      if (error.response?.status === 404) {
        return null;
      }
      throw new Error('Falha ao carregar dados da pessoa.');
    }
  }

  async criar(pessoa: CriarPessoa): Promise<Pessoa> {
    try {
      return await apiService.post<Pessoa>('/v1/pessoas', pessoa);
    } catch (error: any) {
      console.error('Erro ao criar pessoa:', error);
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Falha ao criar pessoa.');
    }
  }

  async atualizar(id: string, pessoa: AtualizarPessoa): Promise<Pessoa> {
    try {
      return await apiService.put<Pessoa>(`/v1/pessoas/${id}`, pessoa);
    } catch (error: any) {
      console.error('Erro ao atualizar pessoa:', error);
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Falha ao atualizar pessoa.');
    }
  }

  async excluir(id: string): Promise<boolean> {
    try {
      await apiService.delete(`/v1/pessoas/${id}`);
      return true;
    } catch (error: any) {
      console.error('Erro ao excluir pessoa:', error);
      if (error.response?.status === 404) {
        throw new Error('Pessoa não encontrada.');
      }
      throw new Error('Falha ao excluir pessoa.');
    }
  }

  async verificarCPF(cpf: string): Promise<boolean> {
    try {
      return await apiService.get<boolean>(`/v1/pessoas/verificar-cpf/${cpf}`);
    } catch (error: any) {
      console.error('Erro ao verificar CPF:', error);
      throw new Error('Falha ao verificar CPF.');
    }
  }
}

export const pessoaService = new PessoaService();
