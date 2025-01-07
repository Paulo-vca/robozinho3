import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function ListaScreen() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Função para buscar dados do backend
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3000/google-sheets-data');
        setData(response.data);
        setFilteredData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados da planilha:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Lógica de filtro
  useEffect(() => {
    const filtered = data.filter((item) => {
      const matchesSearch = `${item.assunto} ${item.destinatario}`
        .toUpperCase()
        .includes(searchText.toUpperCase());
      const matchesStatus = selectedStatus ? item.status === selectedStatus : true;

      return matchesSearch && matchesStatus;
    });

    setFilteredData(filtered);
  }, [searchText, selectedStatus, data]);

  const renderItem = ({ item }: any) => (
    <View style={[styles.item, styles[item.status]]}>
      <Text>{item.assunto}</Text>
      <Text>{item.destinatario}</Text>
      <Text>{item.status}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#005FED" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Barra de pesquisa */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#959595" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Filtrar por assunto ou destinatário"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>

      {/* Botões de filtro */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          onPress={() => setSelectedStatus('Enviado')}
          style={[styles.filterButton, { backgroundColor: '#28A745' }]}
        >
          <Text style={styles.filterText}>Enviado</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedStatus('Pendente')}
          style={[styles.filterButton, { backgroundColor: '#FFC107' }]}
        >
          <Text style={styles.filterText}>Pendente</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedStatus('Não Enviado')}
          style={[styles.filterButton, { backgroundColor: '#CC0000' }]}
        >
          <Text style={styles.filterText}>Não Enviado</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedStatus(null)}
          style={[styles.filterButton, { backgroundColor: 'gray' }]}
        >
          <Text style={styles.filterText}>Todos</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de mensagens */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderColor: '#005FED',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    margin: 20,
    height: 50,
  },
  searchIcon: { marginRight: 10, color: '#005FED' },
  searchBar: { flex: 1, color: '#000' },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  filterButton: { padding: 13, borderRadius: 15 },
  filterText: { fontWeight: 'bold', color: 'white' },
  item: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f4f4f4',
  },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
