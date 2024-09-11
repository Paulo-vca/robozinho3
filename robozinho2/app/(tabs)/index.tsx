import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type ItemData = {
  id: string;
  tema: string;
  assunto: string;
  destinatario: string;
  status: string;  // Adicionado para controle de status
};

const DATA: ItemData[] = [
  {
    id: '1',
    tema: 'bicicleta',
    assunto: 'ASSUNTO 1',
    destinatario: 'DESTINATARIO 1',
    status: 'Enviado',
  },
  {
    id: '2',
    tema: 'carro',
    assunto: 'ASSUNTO 2',
    destinatario: 'DESTINATARIO 2',
    status: 'Pendente',
  },
  {
    id: '3',
    tema: 'moto',
    assunto: 'ASSUNTO 3',
    destinatario: 'DESTINATARIO 3',
    status: 'Não Enviado',
  },
];

type ItemProps = {
  item: ItemData;
  backgroundColor: string;
  barColor: string;
  textColor: string;
};

const Item = ({ item, backgroundColor, barColor, textColor }: ItemProps) => (
  <View style={[styles.item, { backgroundColor }]}>
    <View style={[styles.bar, { backgroundColor: barColor }]} />
    <View style={styles.textContainer}>
      <Text style={[styles.tema, { color: textColor }]}>{item.tema}</Text>
      <Text style={styles.subtext}>{item.assunto}</Text>
      <Text style={styles.subtext}>{item.destinatario}</Text>
    </View>
  </View>
);

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [filteredData, setFilteredData] = useState(DATA);

  const filterData = (text: string) => {
    let newData = DATA;
    if (text) {
      newData = newData.filter(item => `${item.tema.toUpperCase()} ${item.assunto.toUpperCase()} ${item.destinatario.toUpperCase()}`.includes(text.toUpperCase()));
    }
    if (selectedStatus) {
      newData = newData.filter(item => item.status === selectedStatus);
    }
    setFilteredData(newData);
  };

  const handleStatusFilter = (status: string | null) => {
    setSelectedStatus(status);
    filterData(searchText);
  };

  const renderItem = ({ item }: { item: ItemData }) => {
    let backgroundColor = '#FDECEC'; // Default
    let barColor = '#FF6961';
    let textColor = '#FF6961';
    switch (item.status) {
      case 'Enviado':
        backgroundColor = '#E0FFE0';
        barColor = '#28A745';
        textColor = '#77DD77';
        break;
      case 'Pendente':
        backgroundColor = '#FFF3CD';
        barColor = '#FFC107';
        textColor = '#FFB347';
        break;
      case 'Não Enviado':
        backgroundColor = '#F8D7DA';
        barColor = '#CC0000';
        textColor = '#ED0000';
        break;
    }
    return (
      <Item
        item={item}
        backgroundColor={backgroundColor}
        barColor={barColor}
        textColor={textColor}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      <TextInput
        style={styles.searchBar}
        placeholder="Filtrar por tema, assunto ou destinatário"
        value={searchText}
        onChangeText={text => {
          setSearchText(text);
          filterData(text);
        }}
      />

      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => handleStatusFilter('Enviado')} style={[styles.filterButton, { backgroundColor: '#28A745' }]}>
          <Text style={styles.filterText}>Enviado</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleStatusFilter('Pendente')} style={[styles.filterButton, { backgroundColor: '#FFC107' }]}>
          <Text style={styles.filterText}>Pendente</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleStatusFilter('Não Enviado')} style={[styles.filterButton, { backgroundColor: '#CC0000' }]}>
          <Text style={styles.filterText}>Não Enviado</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleStatusFilter(null)} style={[styles.filterButton, { backgroundColor: 'gray' }]}>
          <Text style={styles.filterText}>Todos</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  searchBar: {
    backgroundColor: '#FFFFFF', // Cor de fundo branco
    height: 50,
    margin: 20,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  item: {
    flexDirection: 'row',
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  bar: {
    width: 10, // Largura da barra colorida à esquerda
  },
  textContainer: {
    flex: 1,
    padding: 16,
  },
  tema: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtext: {
    fontSize: 16,
    color: '#000',
    marginTop: 4,
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
});

export default App;

