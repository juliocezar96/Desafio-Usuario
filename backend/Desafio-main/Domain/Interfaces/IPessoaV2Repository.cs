using DesafioBackend.Domain.Entities;

namespace DesafioBackend.Domain.Interfaces
{
    public interface IPessoaV2Repository
    {
        Task<IEnumerable<Pessoa>> ObterTodasAsync();
        Task<Pessoa?> ObterPorIdAsync(Guid id);
        Task<Pessoa?> ObterPorCPFAsync(string cpf);
        Task<Pessoa> AdicionarAsync(Pessoa pessoa);
        Task<Pessoa> AtualizarAsync(Pessoa pessoa);
        Task<bool> ExcluirAsync(Guid id);
        Task<bool> CPFExisteAsync(string cpf, Guid? idExcluir = null);
    }
}
