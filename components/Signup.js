import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TextInput, Button, TouchableOpacity, Text,
} from "react-native";
import useToken from "./useToken";
import localData from "./localData";

const Signup = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const {getToken, removeToken, setToken} = useToken();
    const {getUserId, removeUserId, setUserId, setUserName, removeGroupName, removeGroupId} = localData();
return (
    
    <View style={styles.container}>
      <Text style={styles.grocyTextHeader}>Sign up</Text>
      <StatusBar style= "auto" />
      <TextInput
        style={styles.TextInput}
        placeholder="Username"
        placeholderTextColor="#444941"
        onChangeText={(username) => setUsername(username)}
        value={username}
      />
      <TextInput
        style={styles.TextInput}
        placeholder="Email"
        placeholderTextColor="#444941"
        onChangeText={(email) => setEmail(email)}
        value={email}
        textContentType={"emailAddress"}
        autocomplete={"email"}
        keyboardType={"email-address"}
      />
      <TextInput
        style={styles.TextInput}
        placeholder="Password"
        placeholderTextColor="#444941"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        value={password}
      />
      
      <TouchableOpacity 
        style={styles.signUpButton}
        onPress={() => {
          fetch('https://easygrocy.com/api/auth/register', {
            method: "POST",
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: username,
              email: email,
              password: password
            })
          })
          .then((response) => {
            if(!response.ok) throw new Error(response.status);
            else return response.json();
          })
          .then((json) => {
            removeGroupName();
            removeGroupId();
            setToken(json.access_token);
            setUserName(username);
            console.log(json.user_id);
            setUserId("" + json.user_id);
          })
          .catch((error) => console.error(error))
          navigation.navigate("GrocyStack");
      }}
      >
        <Text style={styles.loginText}>Sign up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {navigation.navigate("Login")}}
      >
        <Text style={styles.loginButton}>Click to Login</Text>
      </TouchableOpacity>
    </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7FC8A9',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  TextInput: {
    backgroundColor: "#D5EEBB",
    borderRadius: 30,
    width: "80%",
    height: 45,
    marginBottom: 20,
    textAlign: "center",
  },
  signUpButton: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#5F7A61",
  },
  grocyTextHeader: {
    color: "floralwhite",
    fontSize: 50,
    textAlign: "center",
    marginTop: 100,
    marginBottom: 50,
  },
  loginButton: {
    height: 30,
    marginBottom: 30,
    color: "floralwhite",
    marginTop: 50,
    fontSize: 15,
  },
  loginText: {
    color: "floralwhite",
    fontSize: 20,
  }
});

export default Signup;
