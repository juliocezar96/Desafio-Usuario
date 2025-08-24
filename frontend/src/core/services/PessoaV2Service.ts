import { IPessoaV2Service } from '../interfaces/services';
import { PessoaV2, CriarPessoaV2, AtualizarPessoaV2 } from '../types';
import { apiService } from './ApiService';

export class PessoaV2Service implements IPessoaV2Service {
  async obterTodas(): Promise<PessoaV2[]> {
    try {
      return await apiService.get<PessoaV2[]>('/v2/PessoasV2');
    } catch (error: any) {
      console.error('Erro ao obter pessoas V2:', error);
      throw new Error('Falha ao carregar lista de pessoas.');
    }
  }

  async obterPorId(id: string): Promise<PessoaV2 | null> {
    try {
      return await apiService.get<PessoaV2>(`/v2/PessoasV2/${id}`);
    } catch (error: any) {
      console.error('Erro ao obter pessoa V2:', error);
      if (error.response?.status === 404) {
        return null;
      }
      throw new Error('Falha ao carregar dados da pessoa.');
    }
  }

  async criar(pessoa: CriarPessoaV2): Promise<PessoaV2> {
    try {
      return await apiService.post<PessoaV2>('/v2/PessoasV2', pessoa);
    } catch (error: any) {
      console.error('Erro ao criar pessoa V2:', error);
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Falha ao criar pessoa.');
    }
  }

  async atualizar(id: string, pessoa: AtualizarPessoaV2): Promise<PessoaV2> {
    try {
      return await apiService.put<PessoaV2>(`/v2/PessoasV2/${id}`, pessoa);
    } catch (error: any) {
      console.error('Erro ao atualizar pessoa V2:', error);
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Falha ao atualizar pessoa.');
    }
  }

  async excluir(id: string): Promise<boolean> {
    try {
      await apiService.delete(`/v2/PessoasV2/${id}`);
      return true;
    } catch (error: any) {
      console.error('Erro ao excluir pessoa V2:', error);
      if (error.response?.status === 404) {
        throw new Error('Pessoa não encontrada.');
      }
      throw new Error('Falha ao excluir pessoa.');
    }
  }

  async verificarCPF(cpf: string): Promise<boolean> {
    try {
      return await apiService.get<boolean>(`/v2/PessoasV2/verificar-cpf/${cpf}`);
    } catch (error: any) {
      console.error('Erro ao verificar CPF V2:', error);
      throw new Error('Falha ao verificar CPF.');
    }
  }
}

export const pessoaV2Service = new PessoaV2Service();
