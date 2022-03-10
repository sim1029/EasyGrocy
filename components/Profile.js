import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import localData from "./localData";

import { 
    StyleSheet, 
    Text, 
    TextInput,
    TouchableOpacity,
    View, 
    SafeAreaView,
    Modal,
    FlatList,
 } from 'react-native';

 const staticGroupData = [
   {
     name: "simey_squad1",
     code: "code1",
     id: 0,
   },
   {
      name: "simey_squad2",
      code: "code2",
      id: 1,
    },
    {
      name: "simey_squad3",
      code: "code3",
      id: 2,
    },
    // {
    //   group_name: "simey_squad4",
    //   code: "code4",
    //   id: 3,
    // },
    // {
    //   group_name: "simey_squad5",
    //   code: "code5",
    //   id: 4,
    // },
    // {
    //   group_name: "simey_squad6",
    //   code: "code6",
    //   id: 5,
    // },
    // {
    //   group_name: "simey_squad7",
    //   code: "code7",
    //   id: 6,
    // },
    // {
    //   group_name: "simey_squad8",
    //   code: "code8",
    //   id: 7,
    // },
    // {
    //   group_name: "simey_squad9",
    //   code: "code9",
    //   id: 8,
    // },
    // {
    //   group_name: "simey_squad10",
    //   code: "code10",
    //   id: 9,
    // },
 ]

const Profile = ({ navigation }) => {
    const [squad, setSquad] = useState("");
    const [code, setCode] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const [newSquadName, setNewSquadName] = useState("");
    const [newSquadCode, setNewSquadCode] = useState("");
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [changeModalVisible, setChangeModalVisible] = useState(false);
    const [joinModalVisible, setJoinModalVisible] = useState(false);
    const [localGroupInfo, setLocalGroupInfoHook] = useState(null);
    const [localUserInfo, setLocalUserInfoHook] = useState(null);
    const [token, setTokenHook] = useState(null);
    const [renderFlatList, setRenderFlatList] = useState(false);

    const { 
      getLocalGroupInfo, 
      getLocalUserInfo, 
      removeLocalUserInfo, 
      removeLocalGroupInfo, 
      removeToken, 
      getToken, 
      setLocalUserInfo,
      setLocalGroupInfo,
    } = localData();


    useEffect(() => {
      getLocalGroupInfo().then((groupInfo) => {
        setLocalGroupInfoHook(groupInfo);
      })
      getLocalUserInfo().then((userInfo) => {
        setLocalUserInfoHook(userInfo);
      })
      getToken().then((token) => {
        setTokenHook(token);
      })
    }, []);

    const clearLocalStorage = async () => {
      await removeToken();
      await removeLocalUserInfo()
      await removeLocalGroupInfo();
      console.log("removed");
    }

    const logoutUser = async () => {
      console.log("about to remove")
      await clearLocalStorage();
      navigation.navigate("Login");
    }

    const createSquad = () => {
      fetch(`https://easygrocy.com/api/group/create_group`, {
        method: "POST",
        headers: {
          'Authorization': 'Bearer ' + token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newSquadName
        })
      })
      .then((response) => {
        if(!response.ok) throw new Error(response.status)
        else return response.json();
      })
      .then((json) => {
        let groups = Array();
        if (localGroupInfo != null) {
          groups = localGroupInfo;
        }
        groups.push(json.group);
        setLocalGroupInfoHook(groups);
        setLocalGroupInfo(groups);
        localUserInfo.active_group = json.group;
        setLocalUserInfo(localUserInfo);
        setLocalUserInfoHook(localUserInfo);
      })
    }

    const joinSquad = (code) => {
      fetch(`https://easygrocy.com/api/group/join_group/${code}`, {
        method: "POST",
        headers: {
          'Authorization': 'Bearer ' + token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if(!response.ok) throw new Error(response.status)
        else return response.json();
      })
      .then((json) => {
        let groups = Array();
        if (localGroupInfo != null) {
          groups = localGroupInfo;
        }
        groups.push(json.group);
        setLocalGroupInfoHook(groups);
        setLocalGroupInfo(groups);
        localUserInfo.active_group = json.group;
        setLocalUserInfo(localUserInfo);
        setLocalUserInfoHook(localUserInfo);
      })
    }

    const setNewActiveGroup = (data) => {
      const newUserInfo = localUserInfo;
      newUserInfo.active_group = data.item;
      setLocalUserInfoHook(newUserInfo);
      setLocalUserInfo(newUserInfo);
      setRenderFlatList(!renderFlatList);
      console.log(data.item);
    }

    const renderGroups = (data) => {
      if (localUserInfo.active_group && localUserInfo.active_group.name == data.item.name) {
        return (
          <TouchableOpacity 
            style={[styles.groupNameCell, {backgroundColor: "#5F7A61"}]} 
            onPress={() => {
              setNewActiveGroup(data);
            }}
          >
            <Text style={{color: "floralwhite"}}>Active:</Text>
            <Text style={[styles.groupNameCellText, {color: "floralwhite"}]}>
              {data.item.name}
            </Text>
          </TouchableOpacity>
        )
      }
      else {
        return (
          <TouchableOpacity 
            style={styles.groupNameCell} 
            onPress={() => {
              setNewActiveGroup(data);
            }}
          >
            <Text style={styles.groupNameCellText}>
              {data.item.name}
            </Text>
          </TouchableOpacity>
        );
      }
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
              <Text style={styles.buttonText}>Active Squad</Text>
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
                          setNewSquadName(newSquadName);
                      }}
                      value={newSquadName}
                      placeholder='New squad name'
                      placeholderTextColor="#5F7A61"
                  />
                  <View style={{flexDirection: "row"}}>
                    <TouchableOpacity 
                      style={styles.modalInputButton} 
                      onPress={() => {
                          setCreateModalVisible(false);
                          setNewSquadName("");
                      }}
                    >
                      <Text style={styles.modalInputButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.modalInputButton} 
                      onPress={() => {
                          setCreateModalVisible(false);
                          createSquad(newSquadName);
                          setNewSquadName("");
                      }}
                    >
                      <Text style={styles.modalInputButtonText}>Create Squad</Text>
                    </TouchableOpacity>
                  </View>
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
              <SafeAreaView>
                <View style={styles.modalView}>
                    <Text style={styles.modalHeaderText}>Change Active Squad</Text>
                    <FlatList
                      renderItem={renderGroups}
                      data={localGroupInfo}
                      style={styles.groupNamesList}
                      extraData={renderFlatList}
                    />
                    <TouchableOpacity 
                      style={styles.modalInputButton} 
                      onPress={() => {
                          setChangeModalVisible(false);
                      }}
                    >
                      <Text style={styles.modalInputButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
              </SafeAreaView>
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
                  <View style={{flexDirection: "row"}}>
                    <TouchableOpacity 
                      style={styles.modalInputButton} 
                      onPress={() => {
                          setJoinModalVisible(false);
                          setNewSquadCode("");
                      }}
                    >
                      <Text style={styles.modalInputButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.modalInputButton} 
                      onPress={() => {
                          setJoinModalVisible(false);
                          joinSquad(newSquadCode);
                          setNewSquadCode("");
                      }}
                    >
                      <Text style={styles.modalInputButtonText}>Join Squad</Text>
                    </TouchableOpacity>
                  </View>
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
    width: 250,
    color: "#444941",
    padding: 10,
  },
  modalHeaderText: {
    textAlign: "center",
    color: "#5F7A61",
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalInputButton: {
    borderRadius: 15,
    marginTop: 20,
    marginHorizontal: 10,
    backgroundColor: "#444941",
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    padding: 10,
  },
  modalInputButtonText: {
    color: "floralwhite",
    fontSize: 15,
  },
  groupNamesList: {
    flexGrow: 0,
  },
  groupNameCell: {
    backgroundColor: "#D5EEBB",
    borderRadius: 10,
    margin: 10,
    padding: 20
  },
  groupNameCellText: {
    fontSize: 30,
    color: "#444941",
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
