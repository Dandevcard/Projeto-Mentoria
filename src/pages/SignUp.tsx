
import { useState } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Lock, User, Loader2 } from "lucide-react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState<"user" | "mentor">("user");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const { signUp } = useAuth();

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordError("As senhas não coincidem");
      return false;
    }
    if (password.length < 6) {
      setPasswordError("A senha deve ter pelo menos 6 caracteres");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword()) return;
    
    setIsSubmitting(true);
    
    try {
      await signUp(email, password, name, userType);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="container max-w-md py-12">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Criar conta</CardTitle>
            <CardDescription>
              Escolha seu tipo de conta e preencha seus dados
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <Tabs defaultValue="user" onValueChange={(value) => setUserType(value as "user" | "mentor")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="user">Usuário</TabsTrigger>
                  <TabsTrigger value="mentor">Mentor</TabsTrigger>
                </TabsList>
                <TabsContent value="user" className="pt-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Como usuário, você poderá encontrar e agendar mentorias com profissionais experientes.
                  </p>
                </TabsContent>
                <TabsContent value="mentor" className="pt-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Como mentor, você poderá compartilhar seu conhecimento e auxiliar outros profissionais em sua jornada.
                  </p>
                </TabsContent>
              </Tabs>

              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    className="pl-10"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    className="pl-10"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                {passwordError && (
                  <p className="text-sm text-destructive">{passwordError}</p>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Criando conta...
                  </>
                ) : (
                  "Criar conta"
                )}
              </Button>
              <div className="text-center text-sm">
                Já tem uma conta?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Entrar
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
}
