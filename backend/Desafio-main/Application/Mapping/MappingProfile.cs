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
            CreateMap<Pessoa, PessoaV2DTO>();
            CreateMap<CriarPessoaV2DTO, PessoaV2>();
            CreateMap<AtualizarPessoaV2DTO, PessoaV2>();

            //V1 to V2
            CreateMap<PessoaDTO, PessoaV2DTO>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Nome, opt => opt.MapFrom(src => src.Nome))
                .ForMember(dest => dest.CPF, opt => opt.MapFrom(src => src.CPF))
                .ForMember(dest => dest.DataNascimento, opt => opt.MapFrom(src => src.DataNascimento));


            // Mapeamento Endereco
            CreateMap<Endereco, EnderecoDTO>();
            CreateMap<EnderecoDTO, Endereco>();
        }
    }
}
