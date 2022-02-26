
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image, TextInput, Button, TouchableOpacity, Text,
} from "react-native";

const Login = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
return (
    
    <View style={styles.container}>
      <Text style={styles.grocyTextHeader}>Login</Text>
      <StatusBar style= "auto" />
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        placeholderTextColor="#444941"
        setEmail={(email) => setEmail(email)}
        textContentType={"emailAddress"}
        autocomplete={"email"}
        keyboardType={"email-address"}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        placeholderTextColor="#444941"
        secureTextEntry={true}
        setPassword={(password) => setPassword(password)}
      />

      <TouchableOpacity 
        style={styles.loginBtn}
        onPress={() => {navigation.navigate("GrocyStack")}}
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
