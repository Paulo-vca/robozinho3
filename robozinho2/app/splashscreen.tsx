import { StyleSheet, Image } from 'react-native';
import { View } from '@/components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/robo/robozinn.png')} 
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF0000', 
  },
  image: {
    width: 250, 
    height: 326, 
    resizeMode: 'contain', 
    borderWidth: 5, 
    borderColor: '#FF0000',
    borderRadius: 130,
  },
});
