using DesafioBackend.Application.DTOs;

namespace DesafioBackend.Application.Interfaces
{
    public interface IAutenticacaoService
    {
        Task<LoginResponseDTO> AutenticarAsync(LoginDTO loginDTO);
        Task<bool> ValidarTokenAsync(string token);
        string GerarToken(string nomeUsuario, string email);
    }
}
