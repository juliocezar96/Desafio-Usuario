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
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var response = await _jwtService.AutenticarAsync(loginDTO);
                return Ok(response);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro interno do servidor", error = ex.Message });
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
