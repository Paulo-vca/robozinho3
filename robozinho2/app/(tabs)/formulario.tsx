import React from 'react';
import { StyleSheet, TextInput, Alert, TouchableOpacity, Text } from 'react-native';
import { View } from '@/components/Themed';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  destinatario: yup.string().email('Digite um e-mail válido').required('Destinatário é obrigatório'),
  assunto: yup.string().required('Assunto é obrigatório'),
  mensagem: yup.string().required('Mensagem é obrigatória'),
  envio: yup.string().required('Data de envio é obrigatória'),
  obs: yup.string().optional(),
});

export default function TabTwoScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log('Formulário enviado com os seguintes dados:', data);
    Alert.alert('Sucesso', 'Formulário enviado com sucesso');
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
            multiline={true}
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
    borderColor: '#FF0000',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#000000', // Cor do texto
    backgroundColor: '#FFFFFF', // Cor do fundo
  },
  textArea: {
    height: 100,
    borderColor: '#FF0000',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#000000', // Cor do texto
    backgroundColor: '#FFFFFF', // Cor do fundo
    textAlignVertical: 'top',
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
