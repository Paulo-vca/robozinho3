import { StyleSheet, Image } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Robozinho do Alex</Text>
      <View style={styles.separator} lightColor="#3ee10e" darkColor="rgba(48,255,0,1)" />
      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
      <Image source={require('../../assets/images/robo/robozin.png')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#3ee10e',
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  }
});
