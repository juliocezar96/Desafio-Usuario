using System.ComponentModel.DataAnnotations;

namespace DesafioBackend.Domain.Entities
{
    public class Usuario
    {
        public Guid Id { get; set; }
        
        [Required(ErrorMessage = "Nome de usuário é obrigatório")]
        [StringLength(50, ErrorMessage = "Nome de usuário deve ter no máximo 50 caracteres")]
        public string NomeUsuario { get; set; } = string.Empty;
        
        [Required(ErrorMessage = "Senha é obrigatória")]
        [StringLength(100, ErrorMessage = "Senha deve ter no máximo 100 caracteres")]
        public string Senha { get; set; } = string.Empty;
        
        [Required(ErrorMessage = "Email é obrigatório")]
        [EmailAddress(ErrorMessage = "Email deve ter formato válido")]
        public string Email { get; set; } = string.Empty;
        
        public string? NomeCompleto { get; set; }
        
        public bool Ativo { get; set; } = true;
        
        public DateTime DataCadastro { get; set; }
        
        public DateTime? UltimoLogin { get; set; }
        
        public Usuario()
        {
            Id = Guid.NewGuid();
            DataCadastro = DateTime.UtcNow;
        }
        
        public void AtualizarUltimoLogin()
        {
            UltimoLogin = DateTime.UtcNow;
        }
    }
}
