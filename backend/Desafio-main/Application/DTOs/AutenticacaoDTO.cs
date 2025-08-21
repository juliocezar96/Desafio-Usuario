namespace DesafioBackend.Application.DTOs
{
    public class LoginDTO
    {
        public string NomeUsuario { get; set; } = string.Empty;
        public string Senha { get; set; } = string.Empty;
    }
    
    public class LoginResponseDTO
    {
        public string Token { get; set; } = string.Empty;
        public string NomeUsuario { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime DataExpiracao { get; set; }
    }
    
    public class CriarUsuarioDTO
    {
        public string NomeUsuario { get; set; } = string.Empty;
        public string Senha { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? NomeCompleto { get; set; }
    }
}
