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
                entity.Property(e => e.DataNascimento).IsRequired();
                entity.Property(e => e.DataCadastro);
                entity.Property(e => e.DataAtualizacao);
                entity.HasOne(p => p.Endereco)
                      .WithOne(e => e.Pessoa)
                      .HasForeignKey<Endereco>(e => e.Id) 
                      .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Endereco>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Logradouro).IsRequired();
                entity.Property(e => e.Numero).IsRequired();
                entity.Property(e => e.Bairro).IsRequired();
                entity.Property(e => e.Cidade).IsRequired();
                entity.Property(e => e.Estado).IsRequired().HasMaxLength(2);
                entity.Property(e => e.CEP).IsRequired().HasMaxLength(8);
            });

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

            SeedUsuarios(modelBuilder);
        }

        private void SeedUsuarios(ModelBuilder modelBuilder)
        {
            var usuarioAdmin = new Usuario
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                NomeUsuario = "admin",
                Senha = "admin123",
                Email = "admin@desafio.com",
                NomeCompleto = "Administrador",
                Ativo = true,
                DataCadastro = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc)
            };

            modelBuilder.Entity<Usuario>().HasData(usuarioAdmin);
        }
    }
}
