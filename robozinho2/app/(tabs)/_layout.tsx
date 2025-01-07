import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Tabs } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';
import { MessagesProvider } from './MessagesContext'; // Importando o Provedor do Contexto

// Função auxiliar para renderizar o ícone da Tab
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <MessagesProvider> {/* Envolvendo as Tabs com o Provedor */}
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: '#005FED',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarStyle: {
            backgroundColor: '#005FED',
          },
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#7ea6ce',
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Mensagens',
            tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
          }}
        />
        <Tabs.Screen
          name="formulario"
          options={{
            title: 'Formulario',
            tabBarIcon: ({ color }) => (
              <AntDesign name="form" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </MessagesProvider>
  );
}
