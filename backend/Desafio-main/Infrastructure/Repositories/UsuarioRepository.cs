using Microsoft.EntityFrameworkCore;
using DesafioBackend.Domain.Entities;
using DesafioBackend.Domain.Interfaces;
using DesafioBackend.Infrastructure.Data;

namespace DesafioBackend.Infrastructure.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly DesafioDbContext _context;

        public UsuarioRepository(DesafioDbContext context)
        {
            _context = context;
        }

        public async Task<Usuario?> ObterPorNomeUsuarioAsync(string nomeUsuario)
        {
            return await _context.Usuarios.FirstOrDefaultAsync(u => u.NomeUsuario == nomeUsuario);
        }

        public async Task<Usuario?> ObterPorEmailAsync(string email)
        {
            return await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<Usuario> AdicionarAsync(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
            return usuario;
        }

        public async Task<bool> NomeUsuarioExisteAsync(string nomeUsuario)
        {
            return await _context.Usuarios.AnyAsync(u => u.NomeUsuario == nomeUsuario);
        }

        public async Task<bool> EmailExisteAsync(string email)
        {
            return await _context.Usuarios.AnyAsync(u => u.Email == email);
        }
    }
}
