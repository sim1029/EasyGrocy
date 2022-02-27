import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { 
    StyleSheet, 
    Text, 
    TextInput,
    TouchableOpacity,
    View, 
    Image,
    Button,
    SafeAreaView,
 } from 'react-native';
const Profile = ({navigation}) => {
    const [squad, setSquad] = useState("");
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.grocyText}>Hello, User </Text>

            <StatusBar style="auto" />

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, height: 5, backgroundColor: 'floralwhite',
          marginTop: 10, marginBottom: 10}} />
          <View>
          </View>
          <View style={{flex: 1, height: 5, backgroundColor: 'floralwhite'}} />
          </View>
            
            <View 
              style={{flexDirection: "row"}}
            >
              <Text style={styles.groupText}>Current Group: </Text>
              <Text style={{color: "floralwhite", fontSize: 20, marginTop: 30, marginLeft: 10}}>MyGroup</Text>
            </View>
           
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
           <View>
           </View>
           <View style={{flex: 1, height: 5, backgroundColor: 'floralwhite'}} />
            </View>

            <TextInput
                style={styles.textInput}
                placeholder="Enter Squad Code"
                placeholderTextColor="gray"
                setSquad={(squad) => setSquad(squad)}
                />
            <TouchableOpacity
            style={styles.joinBtn}
            //onPress={() => {navigation.navigate("")}}
            >
            <Text style= {styles.loginText}>Join Squad</Text>
            </TouchableOpacity>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1, height: 5, backgroundColor: 'floralwhite',
            marginTop: 10, marginBottom: 10}} />
            <View>
            </View>
            <View style={{flex: 1, height: 5, backgroundColor: 'floralwhite'}} />
            </View>

            <Image 
              style = {styles.logo}
             source = {require("easygrocy/assets/icon/groceries.png")}
            />
            <Text style = {styles.thanksText}>Thanks for using EasyGrocy!</Text>

            <TouchableOpacity
            style= {styles.soBtn}
            onPress={() => {navigation.navigate("Login")}}
            >
             <Text style= {styles.loginText}>Sign Out</Text>   
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#7FC8A9',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      height: 75,
      width: 75,
      marginTop: 20,
    },
    grocyText: {
      color: "floralwhite",
      fontSize: 40,
      marginBottom: 30,
     // marginTop: 20,
      textAlign: "left",
    },
    groupText: {
        color: "#444941",
        fontSize: 20,
        marginTop: 30,
        marginBottom: 30,

    },
    textInput: {
        marginTop: 10,
        backgroundColor: "#D5EEBB",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        marginTop: 20,
        textAlign: "center",
        color: "#444941",
      },
      loginText: {
        color: "floralwhite",
        fontSize: 20,
      },
      loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "floralwhite",
    },
    soBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        marginBottom: 25,
        backgroundColor: "#5F7A61",
    },
    joinBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 0,
        marginBottom: 20,
        backgroundColor: "#5F7A61",
    },
    thanksText: {
        color: "floralwhite",
      fontSize: 20,
      marginTop: 20,
      textAlign: "center",
    },
});

export default Profile;