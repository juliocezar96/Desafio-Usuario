using DesafioBackend.Domain.Entities;

namespace DesafioBackend.Domain.Interfaces
{
    public interface IUsuarioRepository
    {
        Task<Usuario?> ObterPorNomeUsuarioAsync(string nomeUsuario);
        Task<Usuario?> ObterPorEmailAsync(string email);
        Task<Usuario> AdicionarAsync(Usuario usuario);
        Task<bool> NomeUsuarioExisteAsync(string nomeUsuario);
        Task<bool> EmailExisteAsync(string email);
    }
}
