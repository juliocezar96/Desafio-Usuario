import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { useToast } from '@/hooks/use-toast';
import { CriarPessoa, Pessoa } from '@/core/types';
import { validateCPF, validateEmail, validateDate, formatCPF } from '@/lib/validations';
import { User, Mail, Calendar, MapPin, Flag, CreditCard } from 'lucide-react';

interface PersonFormProps {
  onSubmit: (person: CriarPessoa) => Promise<void>;
  initialData?: Pessoa;
}

export const PersonForm = ({ onSubmit, initialData }: PersonFormProps) => {
  // Helper function to convert ISO datetime to date input format
  const formatDateForInput = (isoDate: string) => {
    if (!isoDate) return '';
    return isoDate.split('T')[0]; // Extract only the date part (YYYY-MM-DD)
  };

  const [formData, setFormData] = useState({
    nome: initialData?.nome || '',
    sexo: initialData?.sexo || '',
    email: initialData?.email || '',
    dataNascimento: formatDateForInput(initialData?.dataNascimento || ''),
    naturalidade: initialData?.naturalidade || '',
    nacionalidade: initialData?.nacionalidade || '',
    cpf: initialData?.cpf || ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.cpf || !formData.dataNascimento) {
      toast({
        title: "Campos obrigatórios",
        description: "Nome, CPF e Data de Nascimento são obrigatórios",
        variant: "destructive"
      });
      return;
    }

    if (!validateCPF(formData.cpf)) {
      toast({
        title: "CPF inválido",
        description: "Por favor, insira um CPF válido",
        variant: "destructive"
      });
      return;
    }

    if (formData.email && !validateEmail(formData.email)) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um email válido",
        variant: "destructive"
      });
      return;
    }

    if (!validateDate(formData.dataNascimento)) {
      toast({
        title: "Data inválida",
        description: "Por favor, insira uma data de nascimento válida",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await onSubmit(formData as CriarPessoa);
      
      // Reset form if not editing
      if (!initialData) {
        setFormData({
          nome: '',
          sexo: '',
          email: '',
          dataNascimento: '',
          naturalidade: '',
          nacionalidade: '',
          cpf: ''
        });
      }
    } catch (error) {
      // Error handling is done in the parent component
    } finally {
      setIsLoading(false);
    }
  };

  const handleCPFChange = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    setFormData(prev => ({ ...prev, cpf: cleanValue }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nome */}
        <div className="space-y-2">
          <Label htmlFor="nome" className="text-foreground font-medium flex items-center">
            <User className="h-4 w-4 mr-2" />
            Nome *
          </Label>
          <Input
            id="nome"
            value={formData.nome}
            onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
            placeholder="Nome completo"
            className="h-10"
            required
          />
        </div>

        {/* CPF */}
        <div className="space-y-2">
          <Label htmlFor="cpf" className="text-foreground font-medium flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            CPF *
          </Label>
          <Input
            id="cpf"
            value={formatCPF(formData.cpf)}
            onChange={(e) => handleCPFChange(e.target.value)}
            placeholder="000.000.000-00"
            maxLength={14}
            className="h-10"
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground font-medium flex items-center">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="email@exemplo.com"
            className="h-10"
          />
        </div>

        {/* Data de Nascimento */}
        <div className="space-y-2">
          <Label htmlFor="dataNascimento" className="text-foreground font-medium flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Data de Nascimento *
          </Label>
          <Input
            id="dataNascimento"
            type="date"
            value={formData.dataNascimento}
            onChange={(e) => setFormData(prev => ({ ...prev, dataNascimento: e.target.value }))}
            className="h-10"
            required
          />
        </div>

        {/* Sexo */}
        <div className="space-y-2">
          <Label className="text-foreground font-medium">Sexo</Label>
          <Select value={formData.sexo} onValueChange={(value) => setFormData(prev => ({ ...prev, sexo: value }))}>
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Selecione o sexo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="M">Masculino</SelectItem>
              <SelectItem value="F">Feminino</SelectItem>
              <SelectItem value="Outro">Outro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Naturalidade */}
        <div className="space-y-2">
          <Label htmlFor="naturalidade" className="text-foreground font-medium flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            Naturalidade
          </Label>
          <Input
            id="naturalidade"
            value={formData.naturalidade}
            onChange={(e) => setFormData(prev => ({ ...prev, naturalidade: e.target.value }))}
            placeholder="Cidade de nascimento"
            className="h-10"
          />
        </div>

        {/* Nacionalidade */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="nacionalidade" className="text-foreground font-medium flex items-center">
            <Flag className="h-4 w-4 mr-2" />
            Nacionalidade
          </Label>
          <Input
            id="nacionalidade"
            value={formData.nacionalidade}
            onChange={(e) => setFormData(prev => ({ ...prev, nacionalidade: e.target.value }))}
            placeholder="País de origem"
            className="h-10"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button 
          type="submit" 
          variant="hero"
          size="lg"
          disabled={isLoading}
          className="min-w-[150px]"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <Spinner size="sm" className="text-white" />
              <span>Salvando...</span>
            </div>
          ) : (
            initialData ? "Atualizar" : "Cadastrar"
          )}
        </Button>
      </div>
    </form>
  );
};