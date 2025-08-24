using DesafioBackend.Application.DTOs;
using DesafioBackend.Domain.Entities;

namespace DesafioBackend.Domain.Factories
{
    public static class PessoaFactory
    {
        public static Pessoa Criar(CriarPessoaDTO dto)
        {
            return new Pessoa
            {
                Nome = dto.Nome,
                Sexo = dto.Sexo,
                Email = dto.Email,
                DataNascimento = dto.DataNascimento,
                Naturalidade = dto.Naturalidade,
                Nacionalidade = dto.Nacionalidade,
                CPF = dto.CPF
            };
        }

        public static void Atualizar(Pessoa pessoa, AtualizarPessoaDTO dto)
        {
            pessoa.Nome = dto.Nome;
            pessoa.Sexo = dto.Sexo;
            pessoa.Email = dto.Email;
            pessoa.DataNascimento = dto.DataNascimento;
            pessoa.Naturalidade = dto.Naturalidade;
            pessoa.Nacionalidade = dto.Nacionalidade;
            pessoa.CPF = dto.CPF;
            pessoa.Atualizar();
        }
    }
}
