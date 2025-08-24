using DesafioBackend.Application.DTOs;
using DesafioBackend.Application.Interfaces;
using DesafioBackend.Infrastructure.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace DesafioBackend.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AutenticacaoController : ControllerBase
    {
        private readonly IAutenticacaoService _autenticacaoService;
        private readonly IJWtService _jwtService;

        public AutenticacaoController(IAutenticacaoService autenticacaoService, IJWtService jwtService)
        {
            _autenticacaoService = autenticacaoService;
            _jwtService = jwtService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponseDTO>> Login([FromBody] LoginDTO loginDTO)
        {
            try
            {
                Console.WriteLine($"Login attempt for user: {loginDTO?.NomeUsuario}");
                
                if (!ModelState.IsValid)
                {
                    Console.WriteLine("ModelState is invalid");
                    return BadRequest(ModelState);
                }

                var response = await _jwtService.AutenticarAsync(loginDTO);
                Console.WriteLine("Login successful");
                return Ok(response);
            }
            catch (UnauthorizedAccessException ex)
            {
                Console.WriteLine($"Unauthorized: {ex.Message}");
                return Unauthorized(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Login error: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                return StatusCode(500, new { 
                    message = "Erro interno do servidor", 
                    error = ex.Message,
                    stackTrace = ex.StackTrace
                });
            }
        }

        [HttpPost("validar-token")]
        public async Task<ActionResult<bool>> ValidarToken([FromBody] string token)
        {
            try
            {
                var isValid = await _jwtService.ValidarTokenAsync(token);
                return Ok(isValid);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro interno do servidor", error = ex.Message });
            }
        }
    }
}
