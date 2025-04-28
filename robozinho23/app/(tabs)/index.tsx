import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';


export default function ListaScreen() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Configurações do Google Sheets
  const GOOGLE_SHEETS_API_KEY = process.env.EXPO_GOOGLE_SHEETS_API_KEY;
  const SPREADSHEET_ID = process.env.EXPO_SPREADSHEET_ID;
  const RANGE = 'Page1!A2:D';

  // Função para buscar dados diretamente do Google Sheets
  // Função para buscar dados diretamente do Google Sheets
  const fetchData = async () => {
    try {
      setLoading(true);
  
      const response = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${GOOGLE_SHEETS_API_KEY}`
      );
  
      const rows = response.data.values || [];
      const today = new Date(); // Data atual para comparação
  
      const formattedData = rows.map((row: any[], index: number) => {
        let envioDate = null;
        let status = "Não Enviado";
  
        // Converte datas no formato DD/MM/YYYY para um objeto Date válido
        if (row[3]) {
          const dateParts = row[3].split("/"); // Divide a data por "/"
          if (dateParts.length === 3) {
            const day = parseInt(dateParts[0], 10);
            const month = parseInt(dateParts[1], 10) - 1; // Mês começa em 0 no JavaScript
            const year = parseInt(dateParts[2], 10);
  
            envioDate = new Date(year, month, day);
          }
  
        }
  
        // Define o status baseado na data
        if (envioDate) {
          status = envioDate < today ? "Enviado" : "Pendente";
        }
  
        return {
          id: index.toString(),
          destinatario: row[0] || "Sem destinatário",
          assunto: row[1] || "Sem assunto",
          mensagem: row[2] || "Sem mensagem",
          envio: row[3] || "Sem data de envio",
          status,
        };
      });
  
      setData(formattedData);
      setFilteredData(formattedData);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error("Erro ao buscar dados do Google Sheets:", error);
      setLoading(false);
      setRefreshing(false);
    }
  };
  
  // UseEffect para carregar dados ao montar o componente
  useEffect(() => {
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

  const renderItem = ({ item }: any) => {
    const backgroundColor =
      item.status === 'Enviado'
        ? '#00B74F57'
        : item.status === 'Pendente'
        ? '#FFC10752'
        : item.status === 'Não Enviado'
        ? '#CC000052'
        : '#f4f4f4';

    return (
      <View style={[styles.item, { backgroundColor }]}>
        <Text>{item.destinatario}</Text>
        <Text>{item.assunto}</Text>
        <Text>{item.envio}</Text>
        <Text>{item.status}</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#005FED" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#959595" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Filtrar por assunto ou destinatário"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>

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

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              fetchData();
            }}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
  searchIcon: {
    marginRight: 10,
    color: '#005FED',
  },
  searchBar: {
    flex: 1,
    color: '#000',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  filterButton: {
    padding: 13,
    borderRadius: 15,
  },
  filterText: {
    fontWeight: 'bold',
    color: 'white',
  },
  item: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f4f4f4',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
