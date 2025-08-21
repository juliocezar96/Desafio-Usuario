using DesafioBackend.Domain.Entities;

namespace DesafioBackend.Domain.Interfaces
{
    public interface IPessoaV2Repository
    {
        Task<IEnumerable<PessoaV2>> ObterTodasAsync();
        Task<PessoaV2?> ObterPorIdAsync(Guid id);
        Task<PessoaV2?> ObterPorCPFAsync(string cpf);
        Task<PessoaV2> AdicionarAsync(PessoaV2 pessoa);
        Task<PessoaV2> AtualizarAsync(PessoaV2 pessoa);
        Task<bool> ExcluirAsync(Guid id);
        Task<bool> CPFExisteAsync(string cpf, Guid? idExcluir = null);
    }
}
