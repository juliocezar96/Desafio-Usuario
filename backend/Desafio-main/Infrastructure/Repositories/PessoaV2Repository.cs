using Microsoft.EntityFrameworkCore;
using DesafioBackend.Domain.Entities;
using DesafioBackend.Domain.Interfaces;
using DesafioBackend.Infrastructure.Data;

namespace DesafioBackend.Infrastructure.Repositories
{
    public class PessoaRepository : IPessoaRepository
    {
        private readonly DesafioDbContext _context;

        public PessoaRepository(DesafioDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Pessoa>> ObterTodasAsync()
        {
            return await _context.Pessoas.ToListAsync();
        }

        public async Task<Pessoa?> ObterPorIdAsync(Guid id)
        {
            return await _context.Pessoas.FindAsync(id);
        }

        public async Task<Pessoa?> ObterPorCPFAsync(string cpf)
        {
            return await _context.Pessoas.FirstOrDefaultAsync(p => p.CPF == cpf);
        }

        public async Task<Pessoa> AdicionarAsync(Pessoa pessoa)
        {
            _context.Pessoas.Add(pessoa);
            await _context.SaveChangesAsync();
            return pessoa;
        }

        public async Task<Pessoa> AtualizarAsync(Pessoa pessoa)
        {
            _context.Pessoas.Update(pessoa);
            await _context.SaveChangesAsync();
            return pessoa;
        }

        public async Task<bool> ExcluirAsync(Guid id)
        {
            var pessoa = await _context.Pessoas.FindAsync(id);
            if (pessoa == null)
                return false;

            _context.Pessoas.Remove(pessoa);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> CPFExisteAsync(string cpf, Guid? idExcluir = null)
        {
            if (idExcluir.HasValue)
            {
                return await _context.Pessoas.AnyAsync(p => p.CPF == cpf && p.Id != idExcluir.Value);
            }
            return await _context.Pessoas.AnyAsync(p => p.CPF == cpf);
        }
    }
}
