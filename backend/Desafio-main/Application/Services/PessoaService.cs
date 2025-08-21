using AutoMapper;
using DesafioBackend.Application.DTOs;
using DesafioBackend.Application.Interfaces;
using DesafioBackend.Domain.Entities;
using DesafioBackend.Domain.Interfaces;

namespace DesafioBackend.Application.Services
{
    public class PessoaService : IPessoaService
    {
        private readonly IPessoaRepository _pessoaRepository;
        private readonly IMapper _mapper;

        public PessoaService(IPessoaRepository pessoaRepository, IMapper mapper)
        {
            _pessoaRepository = pessoaRepository;
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
    }
}
