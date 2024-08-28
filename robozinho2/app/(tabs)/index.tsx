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
};

const DATA: ItemData[] = [
  {
    id: '1',
    tema: 'bicicleta',
    assunto: 'ASSUNTO 1',
    destinatario: 'DESTINATARIO 1',
  },
  {
    id: '2',
    tema: 'carro',
    assunto: 'ASSUNTO 2',
    destinatario: 'DESTINATARIO 2',
  },
  {
    id: '3',
    tema: 'moto',
    assunto: 'ASSUNTO 3',
    destinatario: 'DESTINATARIO 3',
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
  const [filteredData, setFilteredData] = useState(DATA);

  const filterData = (text: string) => {
    if (text) {
      const newData = DATA.filter(item => {
        const itemData = `${item.tema.toUpperCase()} ${item.assunto.toUpperCase()} ${item.destinatario.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData(DATA);
    }
    setSearchText(text);
  };

  const renderItem = ({ item }: { item: ItemData }) => {
    let backgroundColor, barColor, textColor;
    switch (item.id) {
      case '1':
        backgroundColor = '#FDECEC'; // Fundo rosa claro
        barColor = '#FF6961'; // Barra vermelha
        textColor = '#FF6961'; // Texto vermelho
        break;
      case '2':
        backgroundColor = '#E0FFE0'; // Fundo verde claro
        barColor = '#77DD77'; // Barra verde
        textColor = '#77DD77'; // Texto verde
        break;
      case '3':
        backgroundColor = '#FFF5E1'; // Fundo laranja claro
        barColor = '#FFB347'; // Barra laranja
        textColor = '#FFB347'; // Texto laranja
        break;
      default:
        backgroundColor = '#f9c2ff';
        barColor = '#000';
        textColor = '#000';
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
        onChangeText={text => filterData(text)}
      />
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
    borderColor: 'red',
    borderWidth: 1,
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
    color: '#C0C0C0',
    marginTop: 4,
  },
});

export default App;
