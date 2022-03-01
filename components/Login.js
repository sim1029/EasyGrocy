
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { 
  StyleSheet, 
  View, 
  TextInput,
  TouchableOpacity, 
  Text,
} from "react-native";
import useToken from "./useToken";
import localData from "./localData";

const Login = ({navigation}) => {
  const [email, setEmailHook] = useState("");
  const [password, setPasswordHook] = useState("");
  const {setToken} = useToken();
  const {setUserId, setUserName, setGroupId, setEmail, setPassword, getEmail, getPassword, getUserName} = localData();

  // useEffect(() => {
  //   getEmail().then((email) => {
  //     console.log(email)
  //     getPassword().then((password) => console.log(password));
  //   })
  // }, [])
  
  const loginUser = async () => {
    await fetch('https://easygrocy.com/api/auth/login', {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then((response) => {
        if(!response.ok) throw new Error(response.status);
        else return response.json();
    })
    .then( async (json) => {
      await setToken(json.access_token)
      await setUserId("" + json.user_id)
      await getUserGroups("" + json.user_id, json.access_token)
      await setEmail(email)
      await setPassword(password)
      await getUserNameEndpoint("" + json.user_id, json.access_token)
      navigation.navigate("GrocyStack");
    })
    .catch((error) => console.error(error));
  }

  const getUserGroups = async (userId, token) => {
    await fetch(`https://easygrocy.com/api/user/${userId}/groups`, {
      method: "GET",
      headers: {'Authorization': 'Bearer ' + token}
    })
    .then((response) => {
      if(!response.ok) throw new Error(response.status)
      else return response.json();
    })
    .then(async (json) => {
        const groups = json.groups;
        if (groups.length > 0) {
          await setGroupId("" + groups[0].id);
          await setGroupName(groups[0].name);
        }
    })
  }

  const getUserNameEndpoint = async (userId, token) => {
    await fetch(`https://easygrocy.com/api/user/${userId}`, {
      method: "GET",
      headers: {'Authorization': 'Bearer ' + token}
    })
    .then((response) => {
      if(!response.ok) throw new Error(response.status)
      else return response.json();
    })
    .then(async (json) => {
        await setUserName(json.user.name);
    })
  }

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.grocyTextHeader}>Login</Text>
      <StatusBar style= "auto" />
      <TextInput
        style={styles.formInput}
        placeholder="Email"
        placeholderTextColor="#444941"
        onChangeText={(email) => setEmailHook(email)}
        value={email}
        textContentType={"emailAddress"}
        autocomplete={"email"}
        keyboardType={"email-address"}
      />
      <TextInput
        style={styles.formInput}
        placeholder="Password"
        placeholderTextColor="#444941"
        secureTextEntry={true}
        onChangeText={(password) => setPasswordHook(password)}
        value={password}
      />

      <TouchableOpacity 
        style={styles.loginButton}
        onPress={() => loginUser()}
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {navigation.navigate("Signup")}}
      >
        <Text style={styles.signUpNavigationLink}>Click to Signup</Text>
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
  formInput: {
    backgroundColor: "#D5EEBB",
    borderRadius: 30,
    width: 300,
    height: 45,
    marginBottom: 20,
    textAlign: "center",
    color: "#444941",
  },
  signUpNavigationLink: {
    height: 30,
    marginBottom: 30,
    color: "floralwhite",
    marginTop: 50,
    fontSize: 15,
  },
  loginButton: {
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
    margin: 100,
  },
  loginText: {
    color: "floralwhite",
    fontSize: 20,
  },
});

export default Login;
