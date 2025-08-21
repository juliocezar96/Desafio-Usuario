using System.ComponentModel.DataAnnotations;

namespace DesafioBackend.Domain.Entities
{
    public class Pessoa
    {
        public Guid Id { get; set; }
        
        [Required(ErrorMessage = "Nome é obrigatório")]
        [StringLength(100, ErrorMessage = "Nome deve ter no máximo 100 caracteres")]
        public string Nome { get; set; } = string.Empty;
        
        public string? Sexo { get; set; }
        
        [EmailAddress(ErrorMessage = "E-mail deve ter formato válido")]
        public string? Email { get; set; }
        
        [Required(ErrorMessage = "Data de Nascimento é obrigatória")]
        public DateTime DataNascimento { get; set; }
        
        public string? Naturalidade { get; set; }
        
        public string? Nacionalidade { get; set; }
        
        [Required(ErrorMessage = "CPF é obrigatório")]
        [StringLength(11, MinimumLength = 11, ErrorMessage = "CPF deve ter 11 dígitos")]
        public string CPF { get; set; } = string.Empty;
        
        public DateTime DataCadastro { get; set; }
        
        public DateTime DataAtualizacao { get; set; }
        
        // Construtor para inicializar datas
        public Pessoa()
        {
            Id = Guid.NewGuid();
            DataCadastro = DateTime.UtcNow;
            DataAtualizacao = DateTime.UtcNow;
        }
        
        // Método para atualizar data de modificação
        public void Atualizar()
        {
            DataAtualizacao = DateTime.UtcNow;
        }
    }
}
