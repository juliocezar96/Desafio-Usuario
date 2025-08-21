using FluentValidation;
using DesafioBackend.Application.DTOs;

namespace DesafioBackend.Application.Validators
{
    public class CriarPessoaValidator : AbstractValidator<CriarPessoaDTO>
    {
        public CriarPessoaValidator()
        {
            RuleFor(x => x.Nome)
                .NotEmpty().WithMessage("Nome é obrigatório")
                .MaximumLength(100).WithMessage("Nome deve ter no máximo 100 caracteres");
            
            RuleFor(x => x.Email)
                .EmailAddress().WithMessage("E-mail deve ter formato válido")
                .When(x => !string.IsNullOrEmpty(x.Email));
            
            RuleFor(x => x.DataNascimento)
                .NotEmpty().WithMessage("Data de Nascimento é obrigatória")
                .LessThan(DateTime.Today).WithMessage("Data de Nascimento deve ser anterior a hoje")
                .GreaterThan(DateTime.Today.AddYears(-150)).WithMessage("Data de Nascimento deve ser posterior a 150 anos atrás");
            
            RuleFor(x => x.CPF)
                .NotEmpty().WithMessage("CPF é obrigatório")
                .Length(11).WithMessage("CPF deve ter 11 dígitos")
                .Matches(@"^\d{11}$").WithMessage("CPF deve conter apenas números");
        }
    }
    
    public class AtualizarPessoaValidator : AbstractValidator<AtualizarPessoaDTO>
    {
        public AtualizarPessoaValidator()
        {
            RuleFor(x => x.Nome)
                .NotEmpty().WithMessage("Nome é obrigatório")
                .MaximumLength(100).WithMessage("Nome deve ter no máximo 100 caracteres");
            
            RuleFor(x => x.Email)
                .EmailAddress().WithMessage("E-mail deve ter formato válido")
                .When(x => !string.IsNullOrEmpty(x.Email));
            
            RuleFor(x => x.DataNascimento)
                .NotEmpty().WithMessage("Data de Nascimento é obrigatória")
                .LessThan(DateTime.Today).WithMessage("Data de Nascimento deve ser anterior a hoje")
                .GreaterThan(DateTime.Today.AddYears(-150)).WithMessage("Data de Nascimento deve ser posterior a 150 anos atrás");
            
            RuleFor(x => x.CPF)
                .NotEmpty().WithMessage("CPF é obrigatório")
                .Length(11).WithMessage("CPF deve ter 11 dígitos")
                .Matches(@"^\d{11}$").WithMessage("CPF deve conter apenas números");
        }
    }
}
