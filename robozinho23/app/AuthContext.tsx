import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'expo-router';

// Tipos para o contexto
type AuthContextData = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Função de login
  const login = (username: string, password: string) => {
    if (username === 'Alex' && password === 'ifms') {
      setIsAuthenticated(true);
      router.push('/(tabs)'); // Navega para o formulário
      return true;
    } else {
      return false; // Credenciais inválidas
    }
  };

  // Função de logout
  const logout = () => {
    setIsAuthenticated(false);
    router.push('/login'); // Navega para a tela de login
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
