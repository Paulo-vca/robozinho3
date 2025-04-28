import React, { useState } from 'react'; 
import {
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useMessages } from '../../contexts/MessagesContext';
import { useAuth } from '../AuthContext';
import EmailGroupModal from '../mod/modal'; // Importe o modal de grupos

// Tipagem do grupo de e-mails
type Group = {
  name: string;
  emails: string[];
};

// Validação de formulário
type FormData = {
  assunto: string;
  destinatario: string;
  mensagem: string;
  envio: string;
};

const schema = yup.object().shape({
  assunto: yup.string().required('Assunto é obrigatório'),
  destinatario: yup.string().required('Destinatário é obrigatório'),
  mensagem: yup.string().required('Mensagem é obrigatória'),
  envio: yup.string().required('Data de envio é obrigatória'),
});

// Função para envio de dados
async function sendDataToBackend(data: FormData) {
  try {
    const response = await axios.post('http://localhost:3000/submit', data);
    Alert.alert('Sucesso', response.data.message || 'Dados enviados com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar dados ao backend:', error);
    Alert.alert('Erro', 'Falha ao enviar dados ao servidor.');
  }
}

export default function FormularioScreen() {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const { addMessage } = useMessages();
  const { logout } = useAuth();

  const [isModalVisible, setModalVisible] = useState(false); // Estado para exibir modal
  const [groups, setGroups] = useState<Group[]>([]); // Lista de grupos de e-mail

  const onSubmit = async (data: FormData) => {
    const newMessage = {
      id: Math.random().toString(),
      assunto: data.assunto,
      destinatario: data.destinatario,
      status: 'Enviado',
    };

    try {
      await sendDataToBackend(data);
      addMessage(newMessage);
      reset();
    } catch (error) {
      Alert.alert('Erro', 'Falha ao processar a solicitação.');
    }
  };

  const handleGroupSelection = (emails: string[]) => {
    const emailString = emails.join(';'); // Junta os e-mails com ";"
    setValue('destinatario', emailString); // Atualiza o campo destinatário
    setModalVisible(false); // Fecha o modal
  };

  function closeModal(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Mensagem</Text>

      <Controller
        control={control}
        name="assunto"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Assunto"
            style={[styles.input, errors.assunto && styles.errorBorder]}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.assunto && <Text style={styles.errorText}>{errors.assunto.message}</Text>}

      <View style={styles.inputRow}>
        <Controller
          control={control}
          name="destinatario"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Destinatário"
              style={[styles.input, errors.destinatario && styles.errorBorder, styles.flexGrow]}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <AntDesign name="addusergroup" size={28} color="#080165" style={styles.icon} />
        </TouchableOpacity>
      </View>
      {errors.destinatario && (
        <Text style={styles.errorText}>{errors.destinatario.message}</Text>
      )}

      <Controller
        control={control}
        name="mensagem"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Mensagem"
            style={[styles.textArea, errors.mensagem && styles.errorBorder]}
            onChangeText={onChange}
            multiline
            value={value}
          />
        )}
      />
      {errors.mensagem && <Text style={styles.errorText}>{errors.mensagem.message}</Text>}

      <Controller
        control={control}
        name="envio"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Data para o envio"
            style={[styles.input, errors.envio && styles.errorBorder]}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.envio && <Text style={styles.errorText}>{errors.envio.message}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>

      <EmailGroupModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        groups={groups}
        onSelectGroupEmails={handleGroupSelection}
        setGroups={setGroups}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    height: 50,
    borderColor: '#959595',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  flexGrow: { flex: 1 },
  icon: { marginLeft: 10 },
  textArea: {
    height: 100,
    borderColor: '#959595',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    verticalAlign: 'top',
  },
  button: {
    height: 50,
    backgroundColor: '#080165',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  logoutButton: {
    height: 50,
    backgroundColor: '#ff4d4d',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 15,
  },
  logoutButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  errorText: { color: '#ff0000', marginBottom: 10 },
  errorBorder: { borderColor: '#ff0000' },
});
