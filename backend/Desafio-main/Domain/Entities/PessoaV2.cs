using System.ComponentModel.DataAnnotations;

namespace DesafioBackend.Domain.Entities
{
    public class PessoaV2
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
        
        [Required(ErrorMessage = "Endereço é obrigatório na versão 2")]
        public Endereco Endereco { get; set; } = new Endereco();
        
        public DateTime DataCadastro { get; set; }
        
        public DateTime DataAtualizacao { get; set; }
        
        public PessoaV2()
        {
            Id = Guid.NewGuid();
            DataCadastro = DateTime.UtcNow;
            DataAtualizacao = DateTime.UtcNow;
        }
        
        public void Atualizar()
        {
            DataAtualizacao = DateTime.UtcNow;
        }
    }
    
}
