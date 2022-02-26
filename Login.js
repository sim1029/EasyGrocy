
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image, TextInput, Button, TouchableOpacity, Text,
} from "react-native";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
return (
    
    <View style={styles.container}>
        <Image style={styles.image} source = {require("./assets/grandma.png")} />

       <StatusBar style= "auto" />
    <View style={styles.inputView}>
      <TextInput
        style={styles.TextInput}
        placeholder="Email"
        placeholderTextColor="#444941"
        onChangeText={(email) => setEmail(email)}
      />
    </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#444941"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
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
  image :{
      marginBottom: 40,
  },
  inputView: {
    backgroundColor: "#D5EEBB",
    borderRadius: 30,
    width: "65%",
    height: 45,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#D5EEBB",
  },
});

export default Login;
