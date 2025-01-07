// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// //
// export default function CadastroScreen({ navigation }: any) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const handleRegister = () => {
//     if (!username || !password || !confirmPassword) {
//       Alert.alert('Erro', 'Por favor, preencha todos os campos.');
//       return;
//     }
//     if (password !== confirmPassword) {
//       Alert.alert('Erro', 'As senhas não coincidem.');
//       return;
//     }

//     Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
//     navigation.navigate('Login');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Cadastro</Text>
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
//       <TextInput
//         style={styles.input}
//         placeholder="Confirmar Senha"
//         secureTextEntry
//         value={confirmPassword}
//         onChangeText={setConfirmPassword}
//       />
//       <TouchableOpacity style={styles.button} onPress={handleRegister}>
//         <Text style={styles.buttonText}>Cadastrar</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//         <Text style={styles.link}>Já tem uma conta? Faça login</Text>
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
