import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Tabs } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';
import { MessagesProvider } from '../../contexts/MessagesContext'; // Importação do provedor do contexto

// Função auxiliar para renderizar o ícone da Tab
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme(); // Detecta o esquema de cores (claro ou escuro)

  return (
    // Envolvendo o layout de navegação em abas com o contexto MessagesProvider
    <MessagesProvider>
      <Tabs
        screenOptions={{
          // Configurações gerais do cabeçalho
          headerStyle: {
            backgroundColor: '#005FED', // Cor de fundo do cabeçalho
          },
          headerTintColor: '#FFFFFF', // Cor do texto no cabeçalho
          headerTitleStyle: {
            fontWeight: 'bold', // Texto em negrito no cabeçalho
          },
          // Configurações gerais da barra de navegação inferior
          tabBarStyle: {
            backgroundColor: '#005FED', // Cor de fundo da barra de navegação
          },
          tabBarActiveTintColor: '#ffffff', // Cor do ícone ativo
          tabBarInactiveTintColor: '#7ea6ce', // Cor do ícone inativo
        }}
      >
        {/* Primeira aba: Mensagens */}
        <Tabs.Screen
          name="index" // Deve corresponder ao nome da tela "index" no sistema de rotas
          options={{
            title: 'Mensagens', // Título exibido na aba
            tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />, // Ícone da aba
          }}
        />

        {/* Segunda aba: Formulário */}
        <Tabs.Screen
          name="formulario" // Deve corresponder ao nome da tela "formulario" no sistema de rotas
          options={{
            title: 'Formulário', // Título exibido na aba
            tabBarIcon: ({ color }) =>
              <AntDesign name="form" size={24} color={color} /> // Ícone da aba
          }}
        />
      </Tabs>
    </MessagesProvider>
  );
}
