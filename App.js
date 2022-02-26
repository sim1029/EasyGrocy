import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.grocyText}>Easy Grocy</Text>
      <Image 
      source={require('./assets/icon/groceries.png')}
      style={styles.grocyLogo}
      ></Image>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7FC8A9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grocyLogo: {
    width: 125,
    height: 125,
    resizeMode: "contain",
    margin: 50,
  },
  grocyText: {
    color: "floralwhite",
    fontSize: 50,
    textAlign: "center",
  },
});
