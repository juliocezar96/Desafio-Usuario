using Microsoft.EntityFrameworkCore;
using DesafioBackend.Domain.Entities;

namespace DesafioBackend.Infrastructure.Data
{
    public class DesafioDbContext : DbContext
    {
        public DesafioDbContext(DbContextOptions<DesafioDbContext> options) : base(options)
        {
        }

        public DbSet<Pessoa> Pessoas { get; set; }
        public DbSet<PessoaV2> PessoasV2 { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuração da entidade Pessoa
            modelBuilder.Entity<Pessoa>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.CPF).IsRequired().HasMaxLength(11);
                entity.HasIndex(e => e.CPF).IsUnique();
                entity.Property(e => e.Nome).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Email).HasMaxLength(100);
                entity.Property(e => e.Sexo).HasMaxLength(20);
                entity.Property(e => e.Naturalidade).HasMaxLength(100);
                entity.Property(e => e.Nacionalidade).HasMaxLength(100);
            });

            // Configuração da entidade PessoaV2
            modelBuilder.Entity<PessoaV2>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.CPF).IsRequired().HasMaxLength(11);
                entity.HasIndex(e => e.CPF).IsUnique();
                entity.Property(e => e.Nome).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Email).HasMaxLength(100);
                entity.Property(e => e.Sexo).HasMaxLength(20);
                entity.Property(e => e.Naturalidade).HasMaxLength(100);
                entity.Property(e => e.Nacionalidade).HasMaxLength(100);
                
                // Configuração do endereço como propriedade complexa
                entity.OwnsOne(e => e.Endereco, endereco =>
                {
                    endereco.Property(e => e.Logradouro).IsRequired().HasMaxLength(200);
                    endereco.Property(e => e.Numero).IsRequired().HasMaxLength(20);
                    endereco.Property(e => e.Complemento).HasMaxLength(100);
                    endereco.Property(e => e.Bairro).IsRequired().HasMaxLength(100);
                    endereco.Property(e => e.Cidade).IsRequired().HasMaxLength(100);
                    endereco.Property(e => e.Estado).IsRequired().HasMaxLength(2);
                    endereco.Property(e => e.CEP).IsRequired().HasMaxLength(8);
                });
            });

            // Configuração da entidade Usuario
            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.NomeUsuario).IsRequired().HasMaxLength(50);
                entity.HasIndex(e => e.NomeUsuario).IsUnique();
                entity.Property(e => e.Email).IsRequired().HasMaxLength(100);
                entity.HasIndex(e => e.Email).IsUnique();
                entity.Property(e => e.Senha).IsRequired().HasMaxLength(100);
                entity.Property(e => e.NomeCompleto).HasMaxLength(100);
            });

            // Seed de usuários para autenticação
            SeedUsuarios(modelBuilder);
        }

        private void SeedUsuarios(ModelBuilder modelBuilder)
        {
            // Usuário padrão para testes (senha: admin123)
            var usuarioAdmin = new Usuario
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                NomeUsuario = "admin",
                Senha = "admin123", // Em produção, deve ser hash da senha
                Email = "admin@desafio.com",
                NomeCompleto = "Administrador",
                Ativo = true,
                DataCadastro = DateTime.UtcNow
            };

            modelBuilder.Entity<Usuario>().HasData(usuarioAdmin);
        }
    }
}
