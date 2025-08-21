using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DesafioBackend.Application.DTOs;
using DesafioBackend.Application.Interfaces;

namespace DesafioBackend.Infrastructure.Authentication
{
    public class DevelopmentJwtService : IAutenticacaoService
    {
        private readonly IConfiguration _configuration;

        public DevelopmentJwtService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<LoginResponseDTO> Login(LoginDTO loginRequest)
        {
            // Para desenvolvimento, aceitar qualquer usuário/senha
            // Em produção, isso deve ser validado contra o banco
            
            var token = GenerateJwtToken(loginRequest.NomeUsuario);
            
            return new LoginResponseDTO
            {
                Token = token,
                NomeUsuario = loginRequest.NomeUsuario,
                Email = "dev@desafio.com",
                DataExpiracao = DateTime.UtcNow.AddHours(24).ToString("yyyy-MM-ddTHH:mm:ssZ")
            };
        }

        private string GenerateJwtToken(string nomeUsuario)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var key = Encoding.ASCII.GetBytes(jwtSettings["SecretKey"] ?? "a-string-secret-at-least-256-bits-long");

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.Name, nomeUsuario),
                    new Claim(ClaimTypes.Email, "dev@desafio.com"),
                    new Claim(ClaimTypes.Role, "Admin"),
                    new Claim("admin", "true")
                }),
                Expires = DateTime.UtcNow.AddHours(24),
                Issuer = jwtSettings["Issuer"] ?? "DesafioBackend",
                Audience = jwtSettings["Audience"] ?? "DesafioFrontend",
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public bool ValidarToken(string token)
        {
            try
            {
                var jwtSettings = _configuration.GetSection("Jwt");
                var key = Encoding.ASCII.GetBytes(jwtSettings["SecretKey"] ?? "a-string-secret-at-least-256-bits-long");

                var tokenHandler = new JwtSecurityTokenHandler();
                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidIssuer = jwtSettings["Issuer"] ?? "DesafioBackend",
                    ValidateAudience = true,
                    ValidAudience = jwtSettings["Audience"] ?? "DesafioFrontend",
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
