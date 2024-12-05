import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
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
          tabBarIcon: ({ color }) => <TabBarIcon name="list"  color={color} />,
        }}
      />
      <Tabs.Screen
        name="formulario"
        options={{
          title: 'Formulario',
          tabBarIcon: ({ color }) => <AntDesign name="form" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
