import React from 'react';
import { Stack } from 'expo-router';
import AuthProvider, { useAuth } from './AuthContext';
import { useRouter } from 'expo-router';

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthGate>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </AuthGate>
    </AuthProvider>
  );
}

// Componente para redirecionar usuários não autenticados
const AuthGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login'); // Redireciona para login se não autenticado
    }
  }, [isAuthenticated]);

  return <>{children}</>;
};
