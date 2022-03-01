import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import localData from "./localData";
import useToken from "./useToken";
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

const Profile = ({route, navigation, props}) => {
    const [squad, setSquad] = useState("");
    const [code, setCode] = useState("");
    const {
      setGroupName, 
      getGroupName, 
      setGroupId, 
      getUserName, 
      removeUserId,
      removeUserName, 
      removeGroupName, 
      removeGroupId, 
      removeEmail, 
      removePassword,
    } = localData();
    const {getToken, removeToken} = useToken();

    const [username, setUsernameHook] = useState("");
    const [groupName, setGroupNameHook] = useState("");


    useEffect(() => {
      getUserName().then((id) => {
        setUsernameHook(id)}
      );
      getGroupName().then((name) => {
        setGroupNameHook(name)
      });
    }, []);

    const clearLocalStorage = async () => {
      await removeToken().then()
      await removeUserId().then()
      await removeUserName().then()
      await removeGroupName().then()
      await removeGroupId()
      await removePassword()
      await removeEmail()
    }


    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.grocyText}>Hello, {username} </Text>

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
              <Text style={styles.groupText}>Current Squad: </Text>
              <Text style={{color: "floralwhite", fontSize: 20, marginTop: 30, marginLeft: 10}}>{groupName}</Text>
            </View>
           
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
           <View>
           </View>
           <View style={{flex: 1, height: 5, backgroundColor: 'floralwhite'}} />
            </View>

            {/* <TextInput
                style={styles.textInput}
                placeholder="Enter Squad Name"
                placeholderTextColor="gray"
                onChangeText={(squad) => setSquad(squad)}
                /> */}
            <TextInput
                style={styles.textInput}
                placeholder="Enter Squad Code"
                placeholderTextColor="gray"
                onChangeText={(code) => setCode(code)}
                // value={"gX7crAqZ"}
                />
            <TouchableOpacity
            style={styles.joinBtn}
            onPress={() => {
              console.log(code);
              getToken().then((token) => fetch(`https://easygrocy.com/api/group/join_group/${code}`, {
                method: "POST",
                headers: {'Authorization': 'Bearer ' + token}
              })
              .then((response) => {
                if(!response.ok) throw new Error(response.status)
                else return response.json();
              })
              .then((json) => {
                  // console.log(json);
                  console.log(json);
                  setGroupId("" + json.group.id);
                  setGroupNameHook(json.group.name);
                  setGroupName(json.group.name);
              }))
                // somehow get the squad name and update it.
            }} >
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
             source = {require("../assets/icon/groceries.png")}
            />
            <Text style = {styles.thanksText}>Thanks for using EasyGrocy!</Text>

            <TouchableOpacity
              style= {styles.soBtn}
              onPress={async () => {
                await clearLocalStorage()
                navigation.navigate("Login");
              }}
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
        backgroundColor: "#D5EEBB",
        borderRadius: 30,
        width: "70%",
        height: 45,
        textAlign: "center",
        color: "#444941",
        marginBottom: 10,
        marginTop: 10,
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
        marginTop: 10,
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
