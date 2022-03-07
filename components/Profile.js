import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import localData from "./localData";
import useToken from "./useToken";

import { 
    StyleSheet, 
    Text, 
    TextInput,
    TouchableOpacity,
    View, 
    SafeAreaView,
    Modal,
 } from 'react-native';

const Profile = ({ navigation }) => {
    const [squad, setSquad] = useState("");
    const [code, setCode] = useState("");
    const [username, setUsernameHook] = useState("");
    const [groupName, setGroupNameHook] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const [newSquadName, setNewSquadName] = useState("");
    const [newSquadCode, setNewSquadCode] = useState("");
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [changeModalVisible, setChangeModalVisible] = useState(false);
    const [joinModalVisible, setJoinModalVisible] = useState(false);
    const { getToken, removeToken} = useToken();

    const {
      getGroupName, 
      getUserName, 
      removeUserId,
      removeUserName, 
      removeGroupName, 
      removeGroupId, 
      removeEmail, 
      removePassword,
    } = localData();


    // useEffect(() => {
    //   getUserName().then((id) => {
    //     setUsernameHook(id)}
    //   );
    //   getGroupName().then((name) => {
    //     setGroupNameHook(name)
    //   });
    // }, []);

    const clearLocalStorage = async () => {
      await removeToken();
      await removeUserId();
      await removeUserName();
      await removeGroupName();
      await removeGroupId();
      await removePassword();
      await removeEmail();
    }

    const logoutUser = async () => {
      await clearLocalStorage();
      navigation.navigate("Login");
    }

    const createSquad = () => {
        console.log("Created Squad");
    }

    return ( 
      // Main Screen
        <SafeAreaView style={styles.container}>
          <View style={styles.rowView}>
            <TouchableOpacity style={[styles.colView, {borderRightWidth: 10}]} onPress={logoutUser}>
              <SimpleLineIcons name="logout" size={60} color="floralwhite" />
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.colView} onPress={() => setCreateModalVisible(true)}>
              <Ionicons name="create-outline" size={60} color="floralwhite" />
              <Text style={styles.buttonText}>Create Squad</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.rowView, {borderBottomWidth: 10}]}>
            <TouchableOpacity style={[styles.colView, {borderRightWidth: 10}]} onPress={() => setChangeModalVisible(true)}>
              <MaterialCommunityIcons name="account-switch-outline" size={60} color="floralwhite" />
              <Text style={styles.buttonText}>Change Squad</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.colView} onPress={() => setJoinModalVisible(true)}>
              <AntDesign name="addusergroup" size={60} color="floralwhite" />
              <Text style={styles.buttonText}>Join Squad</Text>
            </TouchableOpacity>
          </View>

          {/* Create Modal */}
          <Modal
                animationType="slide"
                transparent={true}
                visible={createModalVisible}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalHeaderText}>Create New Squad!</Text>
                  <TextInput 
                      style={styles.modalInputField}
                      autoCapitalize='none'
                      autoCorrect={true}
                      onChangeText={(newSquadName) => {
                          console.log(newSquadName);
                          setNewSquadName(newSquadName);
                      }}
                      value={newSquadName}
                      placeholder='New squad name'
                      placeholderTextColor="#5F7A61"
                  />
                  <TouchableOpacity 
                    style={styles.submitModalInputButton} 
                    onPress={() => {
                        setCreateModalVisible(false);
                        createSquad(newSquadName);
                    }}
                  >
                    <Text style={styles.submitModalInputButtonText}>Create Squad</Text>
                  </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Change Modal  */}
          <Modal
                animationType="slide"
                transparent={true}
                visible={changeModalVisible}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalHeaderText}>Change Active Squad</Text>
                  <TouchableOpacity 
                    style={styles.submitModalInputButton} 
                    onPress={() => {
                        setChangeModalVisible(false);
                        // createSquad(newSquadName);
                    }}
                  >
                    <Text style={styles.submitModalInputButtonText}>Close</Text>
                  </TouchableOpacity>
              </View>
            </View>
          </Modal>
          
          {/* Join Modal  */}
          <Modal
                animationType="slide"
                transparent={true}
                visible={joinModalVisible}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalHeaderText}>Join a Squad!</Text>
                  <TextInput 
                      style={styles.modalInputField}
                      autoCapitalize='none'
                      autoCorrect={true}
                      onChangeText={(newSquadCode) => {
                          setNewSquadCode(newSquadCode);
                      }}
                      value={newSquadCode}
                      placeholder='Squad Code'
                      placeholderTextColor="#5F7A61"
                  />
                  <TouchableOpacity 
                    style={styles.submitModalInputButton} 
                    onPress={() => {
                        setJoinModalVisible(false);
                        // createSquad(newSquadName);
                    }}
                  >
                    <Text style={styles.submitModalInputButtonText}>Join Squad</Text>
                  </TouchableOpacity>
              </View>
            </View>
          </Modal>

            {/* <TextInput
                style={styles.textInput}
                placeholder="Enter Squad Code"
                placeholderTextColor="gray"
                onChangeText={(code) => setCode(code)}
            /> */}
            {/* <TouchableOpacity
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
            </TouchableOpacity> */}
          <StatusBar style="light" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#444941',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowView: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#7FC8A9",
    borderColor: "#D5EEBB",
    borderTopWidth: 10,
    borderRightWidth: 10,
    borderLeftWidth: 10,
  },
  colView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#D5EEBB",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "floralwhite",
    borderRadius: 25,
    padding: 20,
  },
  modalInputField: {
    backgroundColor: "#D5EEBB",
    textAlign: "center",
    margin: 10,
    width: 200,
    color: "#444941",
    padding: 10,
  },
  modalHeaderText: {
    textAlign: "center",
    color: "#5F7A61",
    fontWeight: "bold",
    marginBottom: 10,
  },
  submitModalInputButton: {
    borderRadius: 15,
    marginTop: 20,
    backgroundColor: "#444941",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: 150,
  },
  submitModalInputButtonText: {
    color: "floralwhite",
    fontSize: 15,
  },
  buttonText: {
    fontSize: 25,
    color: "floralwhite",
    textAlign: "center",
    marginTop: 20,
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
});

export default Profile;
