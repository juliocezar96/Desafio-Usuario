using System.ComponentModel.DataAnnotations;

namespace DesafioBackend.Domain.Entities
{
    public class Endereco
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required(ErrorMessage = "Logradouro é obrigatório")]
        public string Logradouro { get; set; } = string.Empty;

        [Required(ErrorMessage = "Número é obrigatório")]
        public string Numero { get; set; } = string.Empty;

        public string? Complemento { get; set; }

        [Required(ErrorMessage = "Bairro é obrigatório")]
        public string Bairro { get; set; } = string.Empty;

        [Required(ErrorMessage = "Cidade é obrigatória")]
        public string Cidade { get; set; } = string.Empty;

        [Required(ErrorMessage = "Estado é obrigatório")]
        [StringLength(2, MinimumLength = 2, ErrorMessage = "Estado deve ter 2 caracteres")]
        public string Estado { get; set; } = string.Empty;

        [Required(ErrorMessage = "CEP é obrigatório")]
        [StringLength(8, MinimumLength = 8, ErrorMessage = "CEP deve ter 8 dígitos")]
        public string CEP { get; set; } = string.Empty;

        public Pessoa Pessoa { get; set; } = null!;
    }
}
