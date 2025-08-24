using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DesafioBackend.Application.DTOs;
using DesafioBackend.Application.Interfaces;

namespace DesafioBackend.Presentation.Controllers
{
    [ApiController]
    [Route("api/v2/[controller]")]
    [Authorize]
    public class PessoasV2Controller : ControllerBase
    {
        private readonly IPessoaService _pessoaService;

        public PessoasV2Controller(IPessoaService pessoaService)
        {
            _pessoaService = pessoaService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PessoaV2DTO>>> ObterTodas()
        {
            try
            {
                var pessoas = await _pessoaService.ObterTodasV2Async();
                return Ok(pessoas);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro interno do servidor", error = ex.Message });
            }
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<PessoaV2DTO>> ObterPorId(Guid id)
        {
            try
            {
                var pessoa = await _pessoaService.ObterPorIdV2Async(id);
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
        public async Task<ActionResult<PessoaV2DTO>> Criar([FromBody] CriarPessoaV2DTO dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var pessoa = await _pessoaService.CriarV2Async(dto);
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
        public async Task<ActionResult<PessoaV2DTO>> Atualizar(Guid id, [FromBody] AtualizarPessoaV2DTO dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var pessoa = await _pessoaService.AtualizarV2Async(id, dto);
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
                var resultado = await _pessoaService.ExcluirV2Async(id);
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
                var existe = await _pessoaService.CPFExisteV2Async(cpf);
                return Ok(existe);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro interno do servidor", error = ex.Message });
            }
        }
    }
}
