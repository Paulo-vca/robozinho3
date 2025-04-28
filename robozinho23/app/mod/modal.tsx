import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal as RNModal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Group = {
  name: string;
  emails: string[];
};

type ModalProps = {
  visible: boolean;
  onClose: () => void;
  groups: Group[];
  onSelectGroupEmails: (emails: string[]) => void;
  setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
};

// Função para salvar os grupos no AsyncStorage
const saveGroupsToStorage = async (groups: Group[]) => {
  try {
    await AsyncStorage.setItem('@email_groups', JSON.stringify(groups));
  } catch (error) {
    console.error('Erro ao salvar grupos:', error);
  }
};

// Função para carregar os grupos do AsyncStorage
const loadGroupsFromStorage = async () => {
  try {
    const groupsString = await AsyncStorage.getItem('@email_groups');
    if (groupsString) {
      return JSON.parse(groupsString);
    }
    return [];
  } catch (error) {
    console.error('Erro ao carregar grupos:', error);
    return [];
  }
};

const EmailGroupModal = ({
  visible,
  onClose,
  groups,
  onSelectGroupEmails,
  setGroups,
}: ModalProps) => {
  const [searchGroup, setSearchGroup] = useState('');
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [isEditingGroup, setIsEditingGroup] = useState<Group | null>(null);
  const [groupName, setGroupName] = useState('');
  const [groupEmails, setGroupEmails] = useState('');

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchGroup.toLowerCase())
  );

  useEffect(() => {
    const fetchGroups = async () => {
      const loadedGroups = await loadGroupsFromStorage();
      setGroups(loadedGroups);
    };

    if (visible) fetchGroups();
  }, [visible, setGroups]);

  useEffect(() => {
    if (groups.length > 0) {
      saveGroupsToStorage(groups);
    }
  }, [groups]);

  const handleCreateGroup = () => {
    if (!groupName.trim() || !groupEmails.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const emailsArray = groupEmails.split(';').map((email) => email.trim());

    if (emailsArray.some((email) => !email.includes('@'))) {
      Alert.alert('Erro', 'Certifique-se de que todos os e-mails sejam válidos.');
      return;
    }

    if (isEditingGroup) {
      // Editando grupo existente
      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.name === isEditingGroup.name
            ? { ...group, name: groupName, emails: emailsArray }
            : group
        )
      );
      Alert.alert('Sucesso', `Grupo "${groupName}" editado com sucesso!`);
    } else {
      // Criando novo grupo
      const newGroup: Group = { name: groupName, emails: emailsArray };
      setGroups((prevGroups) => [...prevGroups, newGroup]);
      Alert.alert('Sucesso', `Grupo "${groupName}" criado com sucesso!`);
    }

    setIsCreatingGroup(false);
    setIsEditingGroup(null);
    setGroupName('');
    setGroupEmails('');
  };

  const handleDeleteGroup = (groupName: string) => {
    Alert.alert(
      'Confirmação',
      `Deseja realmente excluir o grupo "${groupName}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setGroups((prevGroups) =>
              prevGroups.filter((group) => group.name !== groupName)
            );
            Alert.alert('Sucesso', `Grupo "${groupName}" excluído.`);
          },
        },
      ]
    );
  };

  const handleEditGroup = (group: Group) => {
    setIsCreatingGroup(true);
    setIsEditingGroup(group);
    setGroupName(group.name);
    setGroupEmails(group.emails.join(';'));
  };

  return (
    <RNModal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Grupos de E-mails</Text>

          {isCreatingGroup ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Nome do grupo"
                value={groupName}
                onChangeText={setGroupName}
              />
              <TextInput
                style={styles.input}
                placeholder="E-mails separados por ;"
                value={groupEmails}
                onChangeText={setGroupEmails}
              />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleCreateGroup}
              >
                <Text style={styles.modalButtonText}>
                  {isEditingGroup ? 'Salvar Alterações' : 'Salvar Grupo'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setIsCreatingGroup(false);
                  setIsEditingGroup(null);
                  setGroupName('');
                  setGroupEmails('');
                }}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TextInput
                style={styles.input}
                placeholder="Buscar grupo..."
                value={searchGroup}
                onChangeText={setSearchGroup}
              />

              {filteredGroups.length > 0 ? (
                <FlatList
                  data={filteredGroups}
                  keyExtractor={(item) => item.name}
                  renderItem={({ item: group }) => (
                    <View style={styles.groupItem}>
                      <Text style={styles.groupName} onPress={() => onSelectGroupEmails(group.emails)}>{group.name}</Text>
                      <View style={styles.iconContainer} >

                        <TouchableOpacity onPress={() => handleEditGroup(group)}>
                          <Ionicons name="create-outline" size={24} color="#FFC107" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleDeleteGroup(group.name)}>
                          <Ionicons name="trash-outline" size={24} color="#000000" />
                        </TouchableOpacity>

                      </View>
                    </View>
                  )}
                />
              ) : (
                <Text style={styles.emptyMessage}>Nenhum grupo disponível.</Text>
              )}

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsCreatingGroup(true)}
              >
                <Text style={styles.modalButtonText}>Criar Novo Grupo</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalButton} onPress={onClose}>
                <Text style={styles.modalButtonText}>Fechar</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#959595',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  groupItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#eaeaea',
    marginVertical: 5,
    borderRadius: 5,
  },
  groupName: {
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  modalButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#080165',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginVertical: 20,
  },
  cancelButton: {
    backgroundColor: '#ff3b30',
  },
});

export default EmailGroupModal;
