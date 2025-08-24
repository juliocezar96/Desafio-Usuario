using DesafioBackend.Application.DTOs;

namespace DesafioBackend.Application.Interfaces
{
    public interface IAutenticacaoService
    {
        Task<LoginResponseDTO> Login(LoginDTO loginRequest);
    }
}
