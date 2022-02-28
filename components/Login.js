
import React, { useState } from "react";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserIdHook] = useState("");
<<<<<<< HEAD
  const [token, setTokenHook] = useState("");
  const {setToken, getToken} = useToken();
  const {setUserId, getUserId, removeGroupName, removeGroupId, removeUserName, removeUserId, setUserName, setGroupId} = localData();
  
  const loginUser = async () => {
    removeGroupName().then(() => {
      removeGroupId().then(() => {
        removeUserName().then(() => {
          removeUserId().then(() => { 
            fetch('https://easygrocy.com/api/auth/login', {
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
            .then((json) => {
              setToken(json.access_token).then(() => {
                setUserId("" + json.user_id).then(() => {
                  getToken().then((token) => {
                    setTokenHook(token);
                    getUserGroups().then(() => {
                      getUserName().then(() => {
                        navigation.navigate("GrocyStack");
                      })
                    })
                  })
                });
              })
            })
            .catch((error) => console.error(error))
          })
        })
      })
    }) 
=======
  const {setToken} = useToken();
  const {setUserId, getUserId} = localData();

  const loginUser = async () => {
    fetch('https://easygrocy.com/api/auth/login', {
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
        .then((json) => {
          setToken(json.access_token)
          .then(() => {
            setUserId("" + json.user_id).then(() => {
              // getUserGroups().then(() => {
                navigation.navigate("GrocyStack");
              // })
            });
          })
        })
        .catch((error) => console.error(error)) 
>>>>>>> a546eee61e56ade61f5ad8f0ecbdc2ac9f9c4ca9
  }

  const getUserGroups = async () => {
    getUserId().then((id) => {
      setUserIdHook(id);
<<<<<<< HEAD
      fetch(`https://easygrocy.com/api/user/${userId}/groups`, {
        method: "GET",
=======
      fetch(`https://easygrocy.com/api/user/${userID}/groups`, {
        method: "POST",
>>>>>>> a546eee61e56ade61f5ad8f0ecbdc2ac9f9c4ca9
        headers: {'Authorization': 'Bearer ' + token}
      })
      .then((response) => {
        if(!response.ok) throw new Error(response.status)
        else return response.json();
      })
      .then((json) => {
          // console.log(json);
<<<<<<< HEAD
          const groups = json.groups;
          if (groups) {
            setGroupId("" + groups[0].id);
            setGroupName(groups[0].name);
          }
=======
          console.log(json);
          setGroupId("" + json.group.id);
          setGroupNameHook(json.group.name);
          setGroupName(json.group.name);
>>>>>>> a546eee61e56ade61f5ad8f0ecbdc2ac9f9c4ca9
      })
    })
  }

<<<<<<< HEAD
  const getUserName = async () => {
    fetch(`https://easygrocy.com/api/user/${userId}`, {
      method: "GET",
      headers: {'Authorization': 'Bearer ' + token}
    })
    .then((response) => {
      if(!response.ok) throw new Error(response.status)
      else return response.json();
    })
    .then((json) => {
        console.log(json);
        setUserName(json.name);
    })
  }

=======
>>>>>>> a546eee61e56ade61f5ad8f0ecbdc2ac9f9c4ca9
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.grocyTextHeader}>Login</Text>
      <StatusBar style= "auto" />
      <TextInput
        style={styles.formInput}
        placeholder="Email"
        placeholderTextColor="#444941"
        onChangeText={(email) => setEmail(email)}
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
        onChangeText={(password) => setPassword(password)}
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
