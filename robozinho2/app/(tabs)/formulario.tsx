import React, { useState } from 'react';
import { StyleSheet, TextInput, Alert, TouchableOpacity, Text } from 'react-native';
import { View } from '@/components/Themed';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { send } from '@emailjs/react-native';

// Validação de formulário
const schema = yup.object().shape({
  destinatario: yup.string().email('Digite um e-mail válido').required('Destinatário é obrigatório'),
  assunto: yup.string().required('Assunto é obrigatório'),
  mensagem: yup.string().required('Mensagem é obrigatória'),
  envio: yup.string().required('Data de envio é obrigatória'),
  obs: yup.string().optional(),
});

type FormData = {
  destinatario: string;
  assunto: string;
  mensagem: string;
  envio: string;
  obs?: string; // Campo opcional
};

// Função para enviar os dados por e-mail via EmailJS
function Submit(data: FormData) {
  send(
    'gmailMessage',    // Substitua pelo seu Service ID do EmailJS
    'template_0vvy7bk',   // Substitua pelo Template ID criado no EmailJS
    {
      destinatario: data.destinatario,
      assunto: data.assunto,
      mensagem: data.mensagem,
      envio: data.envio,
      obs: data.obs || '',
    },
    {
      publicKey: 'XG5SZd2iXVfm7_JUi', // Substitua pela Public Key obtida no EmailJS
    }
  )
    .then((result) => {
      console.log('Email enviado com sucesso:', result.status, result.text);
      Alert.alert('Sucesso', 'Email enviado com sucesso!');
    })
    .catch((error) => {
      console.log('Erro ao enviar e-mail:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao enviar o email.');
    });
}

export default function TabTwoScreen({ addItem }: { addItem: (data: FormData) => void }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    Submit(data);
    addItem(data); // Adiciona o item na lista
    reset(); // Limpa o formulário
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Mensagem</Text>

      <Controller
        control={control}
        name="destinatario"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.destinatario && styles.errorBorder]}
            placeholder="DESTINATARIO"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.destinatario && <Text style={styles.errorText}>{errors.destinatario.message}</Text>}

      <Controller
        control={control}
        name="assunto"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.assunto && styles.errorBorder]}
            placeholder="ASSUNTO"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.assunto && <Text style={styles.errorText}>{errors.assunto.message}</Text>}

      <Controller
        control={control}
        name="mensagem"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.textArea, errors.mensagem && styles.errorBorder]}
            placeholder="MENSAGEM"
            multiline
            numberOfLines={10}
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.mensagem && <Text style={styles.errorText}>{errors.mensagem.message}</Text>}

      <Controller
        control={control}
        name="envio"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.envio && styles.errorBorder]}
            placeholder="DATA PARA O ENVIO"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.envio && <Text style={styles.errorText}>{errors.envio.message}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 50,
    borderColor: '#959595',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    height: 100,
    borderColor: '#959595',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#000000',
    backgroundColor: '#FFFFFF',
    verticalAlign: 'top',
  },
  button: {
    height: 50,
    backgroundColor: '#FF0000',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF0000',
    marginBottom: 10,
  },
  errorBorder: {
    borderColor: '#FF0000',
  },
  title: {
    color: '#FF0000',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
