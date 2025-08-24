import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Spinner, LoadingOverlay } from '@/components/ui/spinner';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Pessoa } from '@/core/types';
import { formatCPF } from '@/lib/validations';
import { 
  Search, 
  Edit, 
  Trash2, 
  Mail, 
  Calendar,
  MapPin,
  Flag,
  User,
  FileText
} from 'lucide-react';

interface PersonListProps {
  people: Pessoa[];
  onEdit: (id: string, person: Pessoa) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export const PersonList = ({ people, onEdit, onDelete, isLoading = false }: PersonListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPerson, setSelectedPerson] = useState<Pessoa | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Simulate search delay for better UX
  useEffect(() => {
    if (searchTerm.trim()) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsSearching(false);
    }
  }, [searchTerm]);

  const filteredPeople = people.filter(person => {
    if (!searchTerm.trim()) return true;
  
    const searchLower = searchTerm.toLowerCase().trim();
  
    const isNumericSearch = /^\d+$/.test(searchTerm);
    const personCpfDigits = person.cpf?.replace(/\D/g, '') || '';
  
    return (
      person.nome?.toLowerCase().includes(searchLower) ||
      (isNumericSearch && personCpfDigits.includes(searchTerm)) ||
      (person.email && person.email.toLowerCase().includes(searchLower)) ||
      (person.naturalidade && person.naturalidade.toLowerCase().includes(searchLower)) ||
      (person.nacionalidade && person.nacionalidade.toLowerCase().includes(searchLower))
    );
  });
  

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getCompletionBadge = (person: Pessoa) => {
    const fields = [person.nome, person.cpf, person.dataNascimento, person.email, person.sexo, person.naturalidade, person.nacionalidade];
    const filledFields = fields.filter(field => field && field.trim() !== '').length;
    const percentage = Math.round((filledFields / fields.length) * 100);
    
    if (percentage === 100) return <Badge variant="default" className="bg-success text-success-foreground">Completo</Badge>;
    if (percentage >= 70) return <Badge variant="secondary">Quase completo</Badge>;
    return <Badge variant="outline">Incompleto</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Search and Summary */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center text-foreground">
            <FileText className="h-5 w-5 mr-2" />
            Lista de Pessoas Cadastradas
          </CardTitle>
          <CardDescription>
            Gerencie e visualize todas as pessoas cadastradas no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              {isSearching && (
                <div className="absolute right-3 top-3">
                  <Spinner size="sm" />
                </div>
              )}
              <Input
                placeholder="Buscar por nome, CPF ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10 h-10"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              {isSearching ? (
                <div className="flex items-center space-x-2">
                  <Spinner size="sm" />
                  <span>Buscando...</span>
                </div>
              ) : (
                `${filteredPeople.length} de ${people.length} pessoas`
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="shadow-card border-0">
        <CardContent className="p-0">
          {filteredPeople.length === 0 ? (
            <div className="text-center py-12">
              <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {people.length === 0 ? 'Nenhuma pessoa cadastrada' : 'Nenhum resultado encontrado'}
              </h3>
              <p className="text-muted-foreground">
                {people.length === 0 
                  ? 'Comece criando seu primeiro cadastro usando as abas acima.'
                  : 'Tente ajustar sua busca ou limpar os filtros.'
                }
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>CPF</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Nascimento</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPeople.map((person) => (
                  <TableRow key={person.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{person.nome}</div>
                          <div className="text-sm text-muted-foreground">
                            {person.sexo && `${person.sexo === 'M' ? 'Masculino' : person.sexo === 'F' ? 'Feminino' : 'Outro'}`}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{formatCPF(person.cpf)}</TableCell>
                    <TableCell>
                      {person.email ? (
                        <div className="flex items-center space-x-1">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{person.email}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{formatDate(person.dataNascimento)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getCompletionBadge(person)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedPerson(person)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir o cadastro de <strong>{person.nome}</strong>? 
                                Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => person.id && onDelete(person.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Person Details Modal (simplified for now) */}
      {selectedPerson && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <User className="h-5 w-5 mr-2" />
                Detalhes de {selectedPerson.nome}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">CPF</Label>
                  <p className="font-mono">{formatCPF(selectedPerson.cpf)}</p>
                </div>
                
                {selectedPerson.email && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                    <p>{selectedPerson.email}</p>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Data de Nascimento</Label>
                  <p>{formatDate(selectedPerson.dataNascimento)}</p>
                </div>
                
                {selectedPerson.sexo && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Sexo</Label>
                    <p>{selectedPerson.sexo === 'M' ? 'Masculino' : selectedPerson.sexo === 'F' ? 'Feminino' : 'Outro'}</p>
                  </div>
                )}
                
                {selectedPerson.naturalidade && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Naturalidade</Label>
                    <p className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                      {selectedPerson.naturalidade}
                    </p>
                  </div>
                )}
                
                {selectedPerson.nacionalidade && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Nacionalidade</Label>
                    <p className="flex items-center">
                      <Flag className="h-4 w-4 mr-1 text-muted-foreground" />
                      {selectedPerson.nacionalidade}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedPerson(null)}>
                  Fechar
                </Button>
                <Button variant="default" onClick={() => {
                  onEdit(selectedPerson.id, selectedPerson);
                  setSelectedPerson(null);
                }}>
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

// Simple Label component since it's not being imported
const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
);