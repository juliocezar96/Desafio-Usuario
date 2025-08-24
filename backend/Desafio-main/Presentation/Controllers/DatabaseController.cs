using Microsoft.AspNetCore.Mvc;
using DesafioBackend.Infrastructure.Data;
using DesafioBackend.Domain.Entities;

namespace DesafioBackend.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DatabaseController : ControllerBase
    {
        private readonly DesafioDbContext _context;

        public DatabaseController(DesafioDbContext context)
        {
            _context = context;
        }

        [HttpGet("status")]
        public async Task<IActionResult> GetDatabaseStatus()
        {
            try
            {
                // Check if database can be accessed
                var canConnect = await _context.Database.CanConnectAsync();
                
                // Count users
                var userCount = _context.Usuarios.Count();
                
                // Check if admin user exists
                var adminExists = _context.Usuarios.Any(u => u.NomeUsuario == "admin");
                
                // Get admin user details if exists
                var adminUser = _context.Usuarios.FirstOrDefault(u => u.NomeUsuario == "admin");

                return Ok(new
                {
                    canConnect,
                    userCount,
                    adminExists,
                    adminUser = adminUser != null ? new
                    {
                        id = adminUser.Id,
                        nomeUsuario = adminUser.NomeUsuario,
                        email = adminUser.Email,
                        ativo = adminUser.Ativo,
                        dataCadastro = adminUser.DataCadastro
                    } : null,
                    timestamp = DateTime.UtcNow
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    error = ex.Message,
                    stackTrace = ex.StackTrace,
                    timestamp = DateTime.UtcNow
                });
            }
        }

        [HttpPost("init")]
        public async Task<IActionResult> InitializeDatabase()
        {
            try
            {
                // Ensure database is created
                await _context.Database.EnsureCreatedAsync();
                
                // Check if admin user exists
                if (!_context.Usuarios.Any(u => u.NomeUsuario == "admin"))
                {
                    var adminUser = new Usuario
                    {
                        Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                        NomeUsuario = "admin",
                        Senha = "admin123",
                        Email = "admin@desafio.com",
                        NomeCompleto = "Administrador",
                        Ativo = true,
                        DataCadastro = DateTime.UtcNow
                    };
                    
                    _context.Usuarios.Add(adminUser);
                    await _context.SaveChangesAsync();
                    
                    return Ok(new
                    {
                        message = "Database initialized and admin user created",
                        adminUser = new
                        {
                            id = adminUser.Id,
                            nomeUsuario = adminUser.NomeUsuario,
                            email = adminUser.Email
                        }
                    });
                }
                
                return Ok(new { message = "Database already initialized" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    error = ex.Message,
                    stackTrace = ex.StackTrace
                });
            }
        }
    }
}
