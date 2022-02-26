import { StatusBar } from 'expo-status-bar';
import { 
    StyleSheet, 
    Text, 
    View, 
} from 'react-native';

const Profile = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.grocyText}>Profile</Text>
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

export default Profile;