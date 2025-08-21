using AutoMapper;
using DesafioBackend.Application.DTOs;
using DesafioBackend.Domain.Entities;

namespace DesafioBackend.Application.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Mapeamento Pessoa
            CreateMap<Pessoa, PessoaDTO>();
            CreateMap<CriarPessoaDTO, Pessoa>();
            CreateMap<AtualizarPessoaDTO, Pessoa>();
            
            // Mapeamento PessoaV2
            CreateMap<PessoaV2, PessoaV2DTO>();
            CreateMap<CriarPessoaV2DTO, PessoaV2>();
            CreateMap<AtualizarPessoaV2DTO, PessoaV2>();
            
            // Mapeamento Endereco
            CreateMap<Endereco, EnderecoDTO>();
            CreateMap<EnderecoDTO, Endereco>();
        }
    }
}
