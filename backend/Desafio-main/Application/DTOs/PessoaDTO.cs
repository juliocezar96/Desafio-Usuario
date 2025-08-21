namespace DesafioBackend.Application.DTOs
{
    public class PessoaDTO
    {
        public Guid Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string? Sexo { get; set; }
        public string? Email { get; set; }
        public DateTime DataNascimento { get; set; }
        public string? Naturalidade { get; set; }
        public string? Nacionalidade { get; set; }
        public string CPF { get; set; } = string.Empty;
        public DateTime DataCadastro { get; set; }
        public DateTime DataAtualizacao { get; set; }
    }
    
    public class CriarPessoaDTO
    {
        public string Nome { get; set; } = string.Empty;
        public string? Sexo { get; set; }
        public string? Email { get; set; }
        public DateTime DataNascimento { get; set; }
        public string? Naturalidade { get; set; }
        public string? Nacionalidade { get; set; }
        public string CPF { get; set; } = string.Empty;
    }
    
    public class AtualizarPessoaDTO
    {
        public string Nome { get; set; } = string.Empty;
        public string? Sexo { get; set; }
        public string? Email { get; set; }
        public DateTime DataNascimento { get; set; }
        public string? Naturalidade { get; set; }
        public string? Nacionalidade { get; set; }
        public string CPF { get; set; } = string.Empty;
    }
}
