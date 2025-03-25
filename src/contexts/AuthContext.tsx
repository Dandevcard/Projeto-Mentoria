
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

type AuthContextType = {
  user: SupabaseUser | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string, userType: 'mentor' | 'user') => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const setData = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }
      
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    setData();

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string, userType: 'mentor' | 'user') => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, user_type: userType }
        }
      });

      if (error) throw error;

      if (data.user) {
        // Create a profile in the database
        await supabase.from('users').insert([
          { 
            id: data.user.id, 
            email: data.user.email,
            name,
            user_type: userType
          }
        ]);

        // If user is a mentor, create a mentor profile
        if (userType === 'mentor') {
          await supabase.from('mentors').insert([
            { 
              user_id: data.user.id,
              expertise_area: '',
              experience_level: '',
              hourly_rate: 0,
              availability: {},
              linkedin_url: '',
              mini_bio: ''
            }
          ]);
        }

        toast({
          title: "Conta criada com sucesso!",
          description: "Verifique seu email para confirmar sua conta.",
        });
        
        navigate('/login');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      toast({
        title: "Erro ao criar conta",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        toast({
          title: "Login realizado com sucesso!",
          description: `Bem-vindo de volta!`,
        });
        
        navigate('/');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      toast({
        title: "Erro ao fazer login",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      navigate('/');
      toast({
        title: "Logout realizado com sucesso",
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Erro ao fazer logout",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
