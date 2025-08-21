namespace DesafioBackend.Application.DTOs
{
    public class PessoaV2DTO
    {
        public Guid Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string? Sexo { get; set; }
        public string? Email { get; set; }
        public DateTime DataNascimento { get; set; }
        public string? Naturalidade { get; set; }
        public string? Nacionalidade { get; set; }
        public string CPF { get; set; } = string.Empty;
        public EnderecoDTO Endereco { get; set; } = new EnderecoDTO();
        public DateTime DataCadastro { get; set; }
        public DateTime DataAtualizacao { get; set; }
    }
    
    public class CriarPessoaV2DTO
    {
        public string Nome { get; set; } = string.Empty;
        public string? Sexo { get; set; }
        public string? Email { get; set; }
        public DateTime DataNascimento { get; set; }
        public string? Naturalidade { get; set; }
        public string? Nacionalidade { get; set; }
        public string CPF { get; set; } = string.Empty;
        public EnderecoDTO Endereco { get; set; } = new EnderecoDTO();
    }
    
    public class AtualizarPessoaV2DTO
    {
        public string Nome { get; set; } = string.Empty;
        public string? Sexo { get; set; }
        public string? Email { get; set; }
        public DateTime DataNascimento { get; set; }
        public string? Naturalidade { get; set; }
        public string? Nacionalidade { get; set; }
        public string CPF { get; set; } = string.Empty;
        public EnderecoDTO Endereco { get; set; } = new EnderecoDTO();
    }
    
    public class EnderecoDTO
    {
        public string Logradouro { get; set; } = string.Empty;
        public string Numero { get; set; } = string.Empty;
        public string? Complemento { get; set; }
        public string Bairro { get; set; } = string.Empty;
        public string Cidade { get; set; } = string.Empty;
        public string Estado { get; set; } = string.Empty;
        public string CEP { get; set; } = string.Empty;
    }
}
