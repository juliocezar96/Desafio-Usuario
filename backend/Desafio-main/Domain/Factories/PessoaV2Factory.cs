using DesafioBackend.Application.DTOs;
using DesafioBackend.Domain.Entities;

namespace DesafioBackend.Domain.Factories
{
    public static class PessoaV2Factory
    {
        public static Pessoa Criar(CriarPessoaV2DTO dto)
        {
            return new Pessoa
            {
                Nome = dto.Nome,
                Sexo = dto.Sexo,
                Email = dto.Email,
                DataNascimento = dto.DataNascimento,
                Naturalidade = dto.Naturalidade,
                Nacionalidade = dto.Nacionalidade,
                CPF = dto.CPF,
                Endereco = new Endereco
                {
                    Logradouro = dto.Endereco.Logradouro,
                    Numero = dto.Endereco.Numero,
                    Complemento = dto.Endereco.Complemento,
                    Bairro = dto.Endereco.Bairro,
                    Cidade = dto.Endereco.Cidade,
                    Estado = dto.Endereco.Estado,
                    CEP = dto.Endereco.CEP
                }
            };
        }

        public static void Atualizar(Pessoa pessoa, AtualizarPessoaV2DTO dto)
        {
            pessoa.Nome = dto.Nome;
            pessoa.Sexo = dto.Sexo;
            pessoa.Email = dto.Email;
            pessoa.DataNascimento = dto.DataNascimento;
            pessoa.Naturalidade = dto.Naturalidade;
            pessoa.Nacionalidade = dto.Nacionalidade;
            pessoa.CPF = dto.CPF;

            if (pessoa.Endereco == null)
                pessoa.Endereco = new Endereco();

            pessoa.Endereco.Logradouro = dto.Endereco.Logradouro;
            pessoa.Endereco.Numero = dto.Endereco.Numero;
            pessoa.Endereco.Complemento = dto.Endereco.Complemento;
            pessoa.Endereco.Bairro = dto.Endereco.Bairro;
            pessoa.Endereco.Cidade = dto.Endereco.Cidade;
            pessoa.Endereco.Estado = dto.Endereco.Estado;
            pessoa.Endereco.CEP = dto.Endereco.CEP;

            pessoa.Atualizar();
        }
    }
}
