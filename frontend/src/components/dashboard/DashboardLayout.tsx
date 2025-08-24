import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PersonForm } from './PersonForm';
import { PersonFormV2 } from './PersonFormV2';
import { PersonList } from './PersonList';
import { Pessoa, CriarPessoa, PessoaV2, CriarPessoaV2 } from '@/core/types';
import { pessoaService } from '@/core/services/PessoaService';
import { pessoaV2Service } from '@/core/services/PessoaV2Service';
import { authService } from '@/core/services/AuthService';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  UserPlus, 
  LogOut, 
  Settings, 
  BarChart3,
  UserCheck2
} from 'lucide-react';

interface DashboardLayoutProps {
  onLogout: () => void;
}

export const DashboardLayout = ({ onLogout }: DashboardLayoutProps) => {
  const [people, setPeople] = useState<Pessoa[]>([]);
  const [activeTab, setActiveTab] = useState("list");
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const [editingPerson, setEditingPerson] = useState<Pessoa | null>(null);
  const [editingPersonV2, setEditingPersonV2] = useState<PessoaV2 | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadPeople();
  }, []);

  const loadPeople = async () => {
    try {
      setIsLoading(true);
      const pessoas = await pessoaService.obterTodas();
      setPeople(pessoas);
    } catch (error) {
      toast({
        title: "Erro ao carregar pessoas",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPerson = async (personData: CriarPessoa) => {
    try {
      const newPerson = await pessoaService.criar(personData);
      setPeople(prev => [...prev, newPerson]);
      toast({
        title: "Pessoa cadastrada",
        description: "Pessoa cadastrada com sucesso!",
        variant: "default"
      });
      setActiveTab("list"); // Volta para a lista após cadastrar
    } catch (error) {
      toast({
        title: "Erro ao cadastrar pessoa",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive"
      });
      throw error; // Re-throw para que o form possa tratar
    }
  };

  const handleAddPersonV2 = async (personData: CriarPessoaV2) => {
    try {
      const newPerson = await pessoaV2Service.criar(personData);
      // Convert PessoaV2 to Pessoa for display in the list
      const personForList: Pessoa = {
        id: newPerson.id,
        nome: newPerson.nome,
        sexo: newPerson.sexo,
        email: newPerson.email,
        dataNascimento: newPerson.dataNascimento,
        naturalidade: newPerson.naturalidade,
        nacionalidade: newPerson.nacionalidade,
        cpf: newPerson.cpf,
        dataCadastro: newPerson.dataCadastro,
        dataAtualizacao: newPerson.dataAtualizacao
      };
      setPeople(prev => [...prev, personForList]);
      toast({
        title: "Pessoa V2 cadastrada",
        description: "Pessoa cadastrada com sucesso!",
        variant: "default"
      });
      setActiveTab("list"); // Volta para a lista após cadastrar
    } catch (error) {
      toast({
        title: "Erro ao cadastrar pessoa V2",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive"
      });
      throw error; // Re-throw para que o form possa tratar
    }
  };

  const handleUpdatePerson = async (id: string, person: Pessoa) => {
    // Instead of calling API directly, set editing state and switch to edit tab
    setEditingPerson(person);
    setActiveTab("edit-v1");
  };

  const handleActualUpdatePerson = async (personData: CriarPessoa) => {
    if (!editingPerson) return;
    
    try {
      const updatedPerson = await pessoaService.atualizar(editingPerson.id, personData);
      setPeople(prev => 
        prev.map(person => 
          person.id === editingPerson.id ? updatedPerson : person
        )
      );
      toast({
        title: "Pessoa atualizada",
        description: "Dados atualizados com sucesso!",
        variant: "default"
      });
      setEditingPerson(null);
      setActiveTab("list");
    } catch (error) {
      toast({
        title: "Erro ao atualizar pessoa",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive"
      });
      throw error;
    }
  };

  const handleDeletePerson = async (id: string) => {
    try {
      await pessoaService.excluir(id);
      setPeople(prev => prev.filter(person => person.id !== id));
      toast({
        title: "Pessoa excluída",
        description: "Pessoa removida com sucesso!",
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Erro ao excluir pessoa",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">
                Sistema de Gestão de Pessoas
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total de Pessoas</p>
                  <p className="text-3xl font-bold text-foreground">{people.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cadastros Hoje</p>
                  <p className="text-3xl font-bold text-foreground">
                    {people.filter(p => 
                      new Date(p.dataCadastro || '').toDateString() === new Date().toDateString()
                    ).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-success-light rounded-full flex items-center justify-center">
                  <UserPlus className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Validados</p>
                  <p className="text-3xl font-bold text-foreground">
                    {people.filter(p => p.email && p.cpf).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <UserCheck2 className="h-6 w-6 text-accent-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-muted p-1 rounded-lg">
            <TabsTrigger value="list" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Lista de Pessoas</span>
            </TabsTrigger>
            <TabsTrigger value="form-v1" className="flex items-center space-x-2">
              <UserPlus className="h-4 w-4" />
              <span>Cadastro V1</span>
            </TabsTrigger>
            <TabsTrigger value="form-v2" className="flex items-center space-x-2">
              <UserCheck2 className="h-4 w-4" />
              <span>Cadastro V2</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-6">
            <PersonList 
              people={people}
              onEdit={handleUpdatePerson}
              onDelete={handleDeletePerson}
              isLoading={isLoading}
            />
          </TabsContent>

          <TabsContent value="form-v1" className="space-y-6">
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="text-foreground">Cadastro de Pessoa - Versão 1</CardTitle>
                <CardDescription>
                  Formulário básico para cadastro de pessoas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PersonForm onSubmit={handleAddPerson} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="form-v2" className="space-y-6">
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="text-foreground">Cadastro de Pessoa - Versão 2</CardTitle>
                <CardDescription>
                  Formulário avançado com validações e UX aprimorada
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PersonFormV2 onSubmit={handleAddPersonV2} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="edit-v1" className="space-y-6">
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="text-foreground">Editar Pessoa - Versão 1</CardTitle>
                <CardDescription>
                  {editingPerson ? `Editando: ${editingPerson.nome}` : 'Nenhuma pessoa selecionada para edição'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {editingPerson ? (
                  <PersonForm 
                    onSubmit={handleActualUpdatePerson} 
                    initialData={editingPerson}
                  />
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Selecione uma pessoa na lista para editar</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setActiveTab("list")}
                    >
                      Voltar para Lista
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="edit-v2" className="space-y-6">
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="text-foreground">Editar Pessoa - Versão 2</CardTitle>
                <CardDescription>
                  {editingPersonV2 ? `Editando: ${editingPersonV2.nome}` : 'Nenhuma pessoa selecionada para edição'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {editingPersonV2 ? (
                  <PersonFormV2 
                    onSubmit={async (data) => {
                      // Handle V2 update logic here
                      console.log('Update V2 person:', data);
                    }} 
                    initialData={editingPersonV2}
                  />
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Funcionalidade de edição V2 em desenvolvimento</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setActiveTab("list")}
                    >
                      Voltar para Lista
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
};