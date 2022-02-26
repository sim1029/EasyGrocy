
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image, TextInput, Button, TouchableOpacity, Text,
} from "react-native";
import { NativeRouter, Route, Routes } from "react-router-native";

const Login = ({navigation}) => {
    const [email, setEmail] = useState("123@gmail.com");
    const [password, setPassword] = useState("password123");
    const [data, setData] = useState([]);
return (
    
    <View style={styles.container}>
      <Text style={styles.grocyTextHeader}>Login</Text>
      <StatusBar style= "auto" />
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        placeholderTextColor="#444941"
        onChangeText={(email) => setEmail(email)}
        value={email}
        textContentType={"emailAddress"}
        autocomplete={"email"}
        keyboardType={"email-address"}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        placeholderTextColor="#444941"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        value={password}
      />

      <TouchableOpacity 
        style={styles.loginBtn}
        onPress={async () => {
          fetch('http://192.168.1.159:5000/login', {
            method: "POST",
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email,
              passowrd: password
            })
          })
          .then((response) => {response.json()})
          .then((json) => setData(json))
          .catch((error) => console.error(error))
          console.log(JSON.stringify({
            email: email,
            passowrd: password
          }));
          console.log(data);
          navigation.navigate("GrocyStack");
        }}
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {navigation.navigate("Signup")}}
      >
        <Text style={styles.signUpButton}>Click to Signup</Text>
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
  image :{
      marginBottom: 40,
  },
  textInput: {
    backgroundColor: "#D5EEBB",
    borderRadius: 30,
    width: "80%",
    height: 45,
    marginBottom: 20,
    textAlign: "center",
    color: "black",
  },
  signUpButton: {
    height: 30,
    marginBottom: 30,
    color: "floralwhite",
    marginTop: 50,
    fontSize: 15,
  },
  loginBtn: {
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
    margin: 100,
  },
  loginText: {
    color: "floralwhite",
    fontSize: 20,
  },
});

export default Login;
