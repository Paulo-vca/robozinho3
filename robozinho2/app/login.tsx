import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Lógica para processar o login
    console.log('Login attempt with:');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
  };

  const handleGoogleSignIn = () => {
    // Lógica para adicionar a conta do Google
    console.log('Google Sign-In button clicked');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        placeholderTextColor="#FFFFFF"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        placeholderTextColor="#FFFFFF"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      /> */}
{/* 
      <Button title="Login" onPress={handleLogin} />

      <Text style={styles.orText}>ou</Text> */}

      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
        <Image
          source={{ uri: 'https://t.ctcdn.com.br/lvns56iaSMyHvyTur4JeYS_NYeY=/i606944.png' }}
          style={styles.googleIcon}
        />
        <Text style={styles.googleButtonText}>Adicionar conta do Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    // backgroundColor: '#282C34',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
    color: '#FFFFFF',
  },
  orText: {
    marginVertical: 10,
    color: '#FFFFFF',
  },
  googleButton: {
    backgroundColor:'#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 50,
    marginTop: 20,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    color: '#000000',
  },
});
