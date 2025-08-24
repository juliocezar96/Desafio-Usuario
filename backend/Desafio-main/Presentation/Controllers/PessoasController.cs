using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DesafioBackend.Application.DTOs;
using DesafioBackend.Application.Interfaces;

namespace DesafioBackend.Presentation.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    [Authorize]
    public class PessoasController : ControllerBase
    {
        private readonly IPessoaService _pessoaService;

        public PessoasController(IPessoaService pessoaService)
        {
            _pessoaService = pessoaService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PessoaDTO>>> ObterTodas()
        {
            try
            {
                var pessoas = await _pessoaService.ObterTodasAsync();
                return Ok(pessoas);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro interno do servidor", error = ex.Message });
            }
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<PessoaDTO>> ObterPorId(Guid id)
        {
            try
            {
                var pessoa = await _pessoaService.ObterPorIdAsync(id);
                if (pessoa == null)
                    return NotFound(new { message = "Pessoa não encontrada" });

                return Ok(pessoa);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro interno do servidor", error = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult<PessoaDTO>> Criar([FromBody] CriarPessoaDTO dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var pessoa = await _pessoaService.CriarAsync(dto);
                return CreatedAtAction(nameof(ObterPorId), new { id = pessoa.Id }, pessoa);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro interno do servidor", error = ex.Message });
            }
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<PessoaDTO>> Atualizar(Guid id, [FromBody] AtualizarPessoaDTO dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var pessoa = await _pessoaService.AtualizarAsync(id, dto);
                return Ok(pessoa);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro interno do servidor", error = ex.Message });
            }
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult> Excluir(Guid id)
        {
            try
            {
                var resultado = await _pessoaService.ExcluirAsync(id);
                if (!resultado)
                    return NotFound(new { message = "Pessoa não encontrada" });

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro interno do servidor", error = ex.Message });
            }
        }

        [HttpGet("verificar-cpf/{cpf}")]
        public async Task<ActionResult<bool>> VerificarCPF(string cpf)
        {
            try
            {
                var existe = await _pessoaService.CPFExisteAsync(cpf);
                return Ok(existe);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro interno do servidor", error = ex.Message });
            }
        }
    }
}
