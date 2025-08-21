using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using DesafioBackend.Application.DTOs;
using DesafioBackend.Application.Interfaces;
using DesafioBackend.Domain.Interfaces;

namespace DesafioBackend.Infrastructure.Authentication
{
    public class JwtService : IAutenticacaoService
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IConfiguration _configuration;

        public JwtService(IUsuarioRepository usuarioRepository, IConfiguration configuration)
        {
            _usuarioRepository = usuarioRepository;
            _configuration = configuration;
        }

        public async Task<LoginResponseDTO> AutenticarAsync(LoginDTO loginDTO)
        {
            var usuario = await _usuarioRepository.ObterPorNomeUsuarioAsync(loginDTO.NomeUsuario);
            
            if (usuario == null || usuario.Senha != loginDTO.Senha) // Em produção, usar hash da senha
            {
                throw new UnauthorizedAccessException("Credenciais inválidas");
            }

            if (!usuario.Ativo)
            {
                throw new UnauthorizedAccessException("Usuário inativo");
            }

            usuario.AtualizarUltimoLogin();
            
            var token = GerarToken(usuario.NomeUsuario, usuario.Email);
            var dataExpiracao = DateTime.UtcNow.AddHours(24); // Token válido por 24 horas

            return new LoginResponseDTO
            {
                Token = token,
                NomeUsuario = usuario.NomeUsuario,
                Email = usuario.Email,
                DataExpiracao = dataExpiracao
            };
        }

        public string GerarToken(string nomeUsuario, string email)
        {
            var secretKey = _configuration["Jwt:SecretKey"] ?? "ChaveSecretaPadraoParaDesenvolvimento";
            var issuer = _configuration["Jwt:Issuer"] ?? "DesafioBackend";
            var audience = _configuration["Jwt:Audience"] ?? "DesafioFrontend";

            var key = Encoding.ASCII.GetBytes(secretKey);
            var tokenHandler = new JwtSecurityTokenHandler();

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, nomeUsuario),
                new Claim(ClaimTypes.Email, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(24),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public async Task<bool> ValidarTokenAsync(string token)
        {
            try
            {
                var secretKey = _configuration["Jwt:SecretKey"] ?? "ChaveSecretaPadraoParaDesenvolvimento";
                var key = Encoding.ASCII.GetBytes(secretKey);
                
                var tokenHandler = new JwtSecurityTokenHandler();
                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidIssuer = _configuration["Jwt:Issuer"] ?? "DesafioBackend",
                    ValidateAudience = true,
                    ValidAudience = _configuration["Jwt:Audience"] ?? "DesafioFrontend",
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };

                var principal = tokenHandler.ValidateToken(token, validationParameters, out _);
                return principal != null;
            }
            catch
            {
                return false;
            }
        }
    }
}
