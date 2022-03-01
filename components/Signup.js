import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TextInput, Button, TouchableOpacity, Text,
} from "react-native";
import useToken from "./useToken";
import localData from "./localData";

const Signup = ({navigation}) => {
    const [email, setEmailHook] = useState("");
    const [password, setPasswordHook] = useState("");
    const [username, setUsername] = useState("");
    const {setToken} = useToken();
    const {setUserId, setUserName, setEmail, setPassword} = localData();

    const signUpUser = async () => {
      await fetch('https://easygrocy.com/api/auth/register', {
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
      .then(async (json) => {
        await setToken(json.access_token)
        await setUserName(username)
        await setUserId("" + json.user_id)
        await setEmail(email)
        await setPassword(password)
        navigation.navigate("GrocyStack");
      })
      .catch((error) => console.error(error))
  }

return (
    
    <View style={styles.rootContainer}>
      <Text style={styles.grocyTextHeader}>Sign up</Text>
      <StatusBar style= "auto" />
      <TextInput
        style={styles.userInput}
        placeholder="Username"
        placeholderTextColor="#444941"
        onChangeText={(username) => setUsername(username)}
        value={username}
      />
      <TextInput
        style={styles.userInput}
        placeholder="Email"
        placeholderTextColor="#444941"
        onChangeText={(email) => setEmailHook(email)}
        value={email}
        textContentType={"emailAddress"}
        autocomplete={"email"}
        keyboardType={"email-address"}
      />
      <TextInput
        style={styles.userInput}
        placeholder="Password"
        placeholderTextColor="#444941"
        secureTextEntry={true}
        onChangeText={(password) => setPasswordHook(password)}
        value={password}
      />
      
      <TouchableOpacity 
        style={styles.signUpButton}
        onPress={() => signUpUser()}
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
  rootContainer: {
    flex: 1,
    backgroundColor: '#7FC8A9',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  userInput: {
    backgroundColor: "#D5EEBB",
    borderRadius: 30,
    width: 300,
    height: 45,
    marginBottom: 20,
    textAlign: "center",
  },
  signUpButton: {
    width: 300,
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
