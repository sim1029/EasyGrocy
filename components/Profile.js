import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { 
    StyleSheet, 
    Text, 
    View, 
    Button,
 } from 'react-native';
const Profile = ({navigation}) => {
    const [squad, setSquad] = useState("");
    return (
        <View style={styles.container}>
            <Text style={styles.grocyText}>Hello, dynamic bitch </Text>

            <Button onPress={() => {navigation.navigate("Login")}} title={"Back"}></Button>

            <StatusBar style="auto" />

            <Text style = {styles.grocyText}>-----------------------</Text>
            
            <Text style={styles.groupText}>Current Groups: </Text>
            <Text style={styles.groupText}>dynamic groups</Text>
            <Text style = {styles.grocyText}>-----------------------</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Enter Existing Squad Name"
                placeholderTextColor="#44494"
                setSquad={(squad) => setSquad(squad)}
                />
            <TouchableOpacity
            style={styles.joinBtn}
            //onPress={() => {navigation.navigate("")}}
            >
            <Text style= {styles.loginText}>Join Squad</Text>
            </TouchableOpacity>
            <Text style = {styles.grocyText}>-----------------------</Text>

            <TouchableOpacity
            style= {styles.soBtn}
            onPress={() => {navigation.navigate("Login")}}
            >
             <Text style= {styles.loginText}>Sign Out</Text>   
            </TouchableOpacity>
            <Text style = {styles.grocyText}>-----------------------</Text>
            <Text style = {styles.thanksText}>Thanks for using EasyGrocy!</Text>
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
      fontSize: 40,
      marginBottom: 10,
     // marginTop: 20,
      textAlign: "left",
    },
    groupText: {
        color: "#444941",
        fontSize: 20,
        textAlign: "left",
        marginTop: 10,
        marginBottom: 30,

    },
    textInput: {
        marginTop: 10,
        backgroundColor: "#D5EEBB",
        borderRadius: 30,
        width: "80%",
        height: 45,
        marginBottom: 20,
        textAlign: "center",
        color: "black",
      },
      loginText: {
        color: "black",
        fontSize: 20,
      },
      loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        backgroundColor: "#5F7A61",
    },
    soBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: "#5F7A61",
    },
    joinBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 0,
        backgroundColor: "#5F7A61",
    },
    thanksText: {
        color: "floralwhite",
      fontSize: 20,
      textAlign: "center",
    },
});

export default Profile;