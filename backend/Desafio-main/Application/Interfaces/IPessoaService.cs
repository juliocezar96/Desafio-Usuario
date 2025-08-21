using DesafioBackend.Application.DTOs;

namespace DesafioBackend.Application.Interfaces
{
    public interface IPessoaService
    {
        Task<IEnumerable<PessoaDTO>> ObterTodasAsync();
        Task<PessoaDTO?> ObterPorIdAsync(Guid id);
        Task<PessoaDTO> CriarAsync(CriarPessoaDTO dto);
        Task<PessoaDTO> AtualizarAsync(Guid id, AtualizarPessoaDTO dto);
        Task<bool> ExcluirAsync(Guid id);
        Task<bool> CPFExisteAsync(string cpf, Guid? idExcluir = null);
    }
}
