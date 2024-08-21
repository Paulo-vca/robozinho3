import React, { useState } from 'react';
import { StyleSheet, TextInput, Button } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function TabTwoScreen() {
  const [destinatario, setDestinatario] = useState('');
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [envio, setEnvio] = useState('');
  const [obs, setObs] = useState('');

  const handleSubmit = () => {
    // Lógica para processar o envio do formulário
    console.log('Formulário enviado com os seguintes dados:');
    console.log(`Destinatário: ${destinatario}`);
    console.log(`Assunto: ${assunto}`);
    console.log(`Mensagem: ${mensagem}`);
    console.log(`Data de Envio: ${envio}`);
    console.log(`Observação: ${obs}`);
  };

  // Cor do placeholder
  const placeholderColor = "#FFFFFF";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escreva as informações necessárias para a leitura e envio de email</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o destinatário"
        placeholderTextColor={placeholderColor}
        keyboardType="email-address"
        value={destinatario}
        onChangeText={setDestinatario}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite o assunto"
        placeholderTextColor={placeholderColor}
        value={assunto}
        onChangeText={setAssunto}
      />

      <TextInput
        style={styles.textArea}
        placeholder="Digite a mensagem"
        placeholderTextColor={placeholderColor}
        multiline={true}
        numberOfLines={10}
        value={mensagem}
        onChangeText={setMensagem}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite a data de envio"
        placeholderTextColor={placeholderColor}
        value={envio}
        onChangeText={setEnvio}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite alguma observação caso houver"
        placeholderTextColor={placeholderColor}
        value={obs}
        onChangeText={setObs}
      />

      <Button title="Enviar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
    color: '#FFFFFF', // Cor do texto
  },
  textArea: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
    textAlignVertical: 'top',
    color: '#FFFFFF', // Cor do texto
  },
});
