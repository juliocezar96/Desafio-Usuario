using AutoMapper;
using DesafioBackend.Application.DTOs;
using DesafioBackend.Application.Interfaces;
using DesafioBackend.Domain.Entities;
using DesafioBackend.Domain.Factories;
using DesafioBackend.Domain.Interfaces;
using DesafioBackend.Infrastructure.Repositories;

namespace DesafioBackend.Application.Services
{
    public class PessoaService : IPessoaService
    {
        private readonly IPessoaRepository _pessoaRepository;
        private readonly IPessoaV2Repository _pessoaV2Repository;
        private readonly IMapper _mapper;

        public PessoaService(IPessoaRepository pessoaRepository, IPessoaV2Repository pessoaV2Repository, IMapper mapper)
        {
            _pessoaRepository = pessoaRepository;
            _pessoaV2Repository = pessoaV2Repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<PessoaDTO>> ObterTodasAsync()
        {
            var pessoas = await _pessoaRepository.ObterTodasAsync();
            return _mapper.Map<IEnumerable<PessoaDTO>>(pessoas);
        }

        public async Task<PessoaDTO?> ObterPorIdAsync(Guid id)
        {
            var pessoa = await _pessoaRepository.ObterPorIdAsync(id);
            return _mapper.Map<PessoaDTO?>(pessoa);
        }

        public async Task<PessoaDTO> CriarAsync(CriarPessoaDTO dto)
        {
            // Verificar se CPF já existe
            if (await _pessoaRepository.CPFExisteAsync(dto.CPF))
            {
                throw new InvalidOperationException("CPF já cadastrado no sistema");
            }

            var pessoa = _mapper.Map<Pessoa>(dto);
            var pessoaCriada = await _pessoaRepository.AdicionarAsync(pessoa);
            return _mapper.Map<PessoaDTO>(pessoaCriada);
        }

        public async Task<PessoaDTO> AtualizarAsync(Guid id, AtualizarPessoaDTO dto)
        {
            var pessoaExistente = await _pessoaRepository.ObterPorIdAsync(id);
            if (pessoaExistente == null)
            {
                throw new InvalidOperationException("Pessoa não encontrada");
            }

            // Verificar se CPF já existe em outra pessoa
            if (await _pessoaRepository.CPFExisteAsync(dto.CPF, id))
            {
                throw new InvalidOperationException("CPF já cadastrado em outra pessoa");
            }

            _mapper.Map(dto, pessoaExistente);
            pessoaExistente.Atualizar();
            
            var pessoaAtualizada = await _pessoaRepository.AtualizarAsync(pessoaExistente);
            return _mapper.Map<PessoaDTO>(pessoaAtualizada);
        }

        public async Task<bool> ExcluirAsync(Guid id)
        {
            return await _pessoaRepository.ExcluirAsync(id);
        }

        public async Task<bool> CPFExisteAsync(string cpf, Guid? idExcluir = null)
        {
            return await _pessoaRepository.CPFExisteAsync(cpf, idExcluir);
        }

        //Versão 2 dos métodos
        public async Task<IEnumerable<PessoaV2DTO>> ObterTodasV2Async()
        {
            var pessoas = await _pessoaV2Repository.ObterTodasAsync();
            return _mapper.Map<IEnumerable<PessoaV2DTO>>(pessoas);
        }

        public async Task<PessoaV2DTO?> ObterPorIdV2Async(Guid id)
        {
            var pessoa = await _pessoaV2Repository.ObterPorIdAsync(id);
            return _mapper.Map<PessoaV2DTO?>(pessoa);
        }
        
        public async Task<PessoaV2DTO> CriarV2Async(CriarPessoaV2DTO dto)
        {
            // Verificar se CPF já existe
            if (await _pessoaV2Repository.CPFExisteAsync(dto.CPF))
            {
                throw new InvalidOperationException("CPF já cadastrado no sistema");
            }
            var pessoa = PessoaV2Factory.Criar(dto);

            var pessoaCriada = await _pessoaV2Repository.AdicionarAsync(pessoa);
            return _mapper.Map<PessoaV2DTO>(pessoaCriada);
        }

        public async Task<PessoaV2DTO> AtualizarV2Async(Guid id, AtualizarPessoaV2DTO dto)
        {
            var pessoaExistente = await _pessoaV2Repository.ObterPorIdAsync(id);
            if (pessoaExistente == null)
            {
                throw new InvalidOperationException("Pessoa não encontrada");
            }

            // Verificar se CPF já existe em outra pessoa
            if (await _pessoaV2Repository.CPFExisteAsync(dto.CPF, id))
            {
                throw new InvalidOperationException("CPF já cadastrado em outra pessoa");
            }

            PessoaV2Factory.Atualizar(pessoaExistente, dto);

            var pessoaAtualizada = await _pessoaV2Repository.AtualizarAsync(pessoaExistente);
            return _mapper.Map<PessoaV2DTO>(pessoaAtualizada);
        }

        public async Task<bool> ExcluirV2Async(Guid id)
        {
            return await _pessoaV2Repository.ExcluirAsync(id);
        }

        public async Task<bool> CPFExisteV2Async(string cpf, Guid? idExcluir = null)
        {
            return await _pessoaV2Repository.CPFExisteAsync(cpf, idExcluir);
        }
    }
}
