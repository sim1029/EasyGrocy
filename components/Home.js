import { StatusBar } from 'expo-status-bar';
import { 
    StyleSheet, 
    Text, 
    View, 
    Image,
    Button,
} from 'react-native';

const Home = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.grocyText}>Home</Text>
            <Button onPress={() => {navigation.navigate("Login")}} title={"Back"}></Button>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#7FC8A9',
      alignItems: 'center',
      justifyContent: 'center',
    },
    grocyText: {
      color: "floralwhite",
      fontSize: 50,
      textAlign: "center",
    },
});

export default Home;