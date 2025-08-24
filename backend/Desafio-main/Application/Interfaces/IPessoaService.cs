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


        Task<IEnumerable<PessoaV2DTO>> ObterTodasV2Async();
        Task<PessoaV2DTO?> ObterPorIdV2Async(Guid id);
        Task<PessoaV2DTO> CriarV2Async(CriarPessoaV2DTO dto);
        Task<PessoaV2DTO> AtualizarV2Async(Guid id, AtualizarPessoaV2DTO dto);
        Task<bool> ExcluirV2Async(Guid id);
        Task<bool> CPFExisteV2Async(string cpf, Guid? idExcluir = null);
    }
}
