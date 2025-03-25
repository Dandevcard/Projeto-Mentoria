
import { useEffect, useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [mentorData, setMentorData] = useState<any>(null);
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', user?.id)
          .single();
          
        if (userError) throw userError;
        setUserData(userData);
        
        // If user is a mentor, fetch mentor data
        if (userData.user_type === 'mentor') {
          const { data: mentorData, error: mentorError } = await supabase
            .from('mentors')
            .select('*')
            .eq('user_id', user?.id)
            .single();
            
          if (mentorError && mentorError.code !== 'PGRST116') throw mentorError;
          setMentorData(mentorData);
        }
        
        // Fetch mentorship sessions
        const { data: sessionData, error: sessionError } = await supabase
          .from('mentorship_sessions')
          .select('*')
          .or(`user_id.eq.${user?.id},mentor_id.eq.${mentorData?.id}`);
          
        if (sessionError) throw sessionError;
        setSessions(sessionData || []);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchUserData();
    }
  }, [user]);

  if (loading) {
    return (
      <MainLayout>
        <div className="container py-12 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Meu Dashboard</h1>
        
        <Tabs defaultValue="profile">
          <TabsList className="mb-8">
            <TabsTrigger value="profile">Meu Perfil</TabsTrigger>
            {userData?.user_type === 'mentor' && (
              <TabsTrigger value="mentor-profile">Perfil de Mentor</TabsTrigger>
            )}
            <TabsTrigger value="sessions">Minhas Mentorias</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>Gerencie suas informações pessoais</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Nome</p>
                    <p>{userData?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p>{userData?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Tipo de Usuário</p>
                    <p>{userData?.user_type === 'mentor' ? 'Mentor' : 'Usuário'}</p>
                  </div>
                  <Button>Editar Perfil</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {userData?.user_type === 'mentor' && (
            <TabsContent value="mentor-profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Perfil de Mentor</CardTitle>
                  <CardDescription>Gerencie seu perfil de mentor</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Área de Atuação</p>
                      <p>{mentorData?.expertise_area || 'Não definido'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Nível de Experiência</p>
                      <p>{mentorData?.experience_level || 'Não definido'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Preço por Hora</p>
                      <p>R$ {mentorData?.hourly_rate || '0'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">LinkedIn</p>
                      <p>{mentorData?.linkedin_url || 'Não definido'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Mini Bio</p>
                      <p>{mentorData?.mini_bio || 'Não definido'}</p>
                    </div>
                    <Button>Editar Perfil de Mentor</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
          
          <TabsContent value="sessions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Minhas Mentorias</CardTitle>
                <CardDescription>Visualize e gerencie suas sessões de mentoria</CardDescription>
              </CardHeader>
              <CardContent>
                {sessions.length === 0 ? (
                  <p>Você ainda não tem sessões de mentoria.</p>
                ) : (
                  <div className="space-y-4">
                    {sessions.map((session) => (
                      <div key={session.id} className="border p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Sessão #{session.id.substring(0, 8)}</p>
                            <p className="text-sm text-muted-foreground">
                              Data: {new Date(session.session_date).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Status: <span className={`font-medium ${
                                session.status === 'approved' 
                                  ? 'text-green-500' 
                                  : session.status === 'rejected' 
                                    ? 'text-red-500' 
                                    : 'text-amber-500'
                              }`}>
                                {session.status === 'approved' 
                                  ? 'Aprovada' 
                                  : session.status === 'rejected' 
                                    ? 'Rejeitada' 
                                    : 'Pendente'}
                              </span>
                            </p>
                          </div>
                          <div className="space-x-2">
                            <Button variant="outline" size="sm">Detalhes</Button>
                            {userData?.user_type === 'mentor' && session.status === 'pending' && (
                              <>
                                <Button variant="default" size="sm">Aprovar</Button>
                                <Button variant="destructive" size="sm">Rejeitar</Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
