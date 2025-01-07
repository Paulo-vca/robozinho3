// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import { useAuth } from './AuthContext';

// export default function LoginScreen({ navigation }: any) {
//   const { login } = useAuth();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     if (username && password) {
//       login(username);
//       Alert.alert('Login bem-sucedido!', `Bem-vindo, ${username}!`);
//     } else {
//       Alert.alert('Erro', 'Por favor, preencha todos os campos.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Usuário"
//         value={username}
//         onChangeText={setUsername}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Senha"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Entrar</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
//         <Text style={styles.link}>Não tem uma conta? Cadastre-se</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
//   input: {
//     width: '100%',
//     padding: 15,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//   },
//   button: {
//     backgroundColor: '#005FED',
//     padding: 15,
//     borderRadius: 8,
//     width: '100%',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   buttonText: { color: '#fff', fontWeight: 'bold' },
//   link: { color: '#005FED', marginTop: 10 },
// });
