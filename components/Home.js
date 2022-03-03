import React, { useState, useEffect } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity,
    TouchableHighlight,
    SafeAreaView,
    TextInput,
    Pressable,
    Modal,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import localData from "./localData";
import useToken from "./useToken";

const Home = ({navigation}) => {
    const [listData, setListData] = useState(Array());
    const [squad, setSquadName] = useState("");
    const [filteredData, setFilteredData] = useState(Array());
    const [searchText, setSearchText] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalPrice, setModalPrice] = useState("");
    const [modalName, setModalName] = useState("");
    const [modalQuantity, setModalQuantity] = useState("");
    const [modalExpiration, setExpiration] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const [groupExists, setGroupExists] = useState(false);
    const [groupId, setGroupId] = useState(null);
    const [currUser, setCurrUser] = useState(null);
    const [token, setToken] = useState("");

    const {getToken} = useToken();
    const {getGroupId, getGroupName, getUserName} = localData();

    useEffect(async () => {
        getItems();
        getGroupName().then((name) => {
            setSquadName(name);
        })
        const userName = await getUserName();
        setCurrUser(userName);
        const newToken = await getToken();
        setToken(newToken);
    }, [navigation]);

    const getItems = async () => {
        const newGroupId = await getGroupId();
        setGroupId(newGroupId);
        if (newGroupId) {
            setGroupExists(true);
            getToken().then((token) => {
                fetch(`https://easygrocy.com/api/group/${newGroupId}/items`, {
                headers: {'Authorization': 'Bearer ' + token}
            })
            .then((response) => {
                if(!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then((json) => {
                let items = json.items;
                let new_arr = Array();
                let key = 0;
                for(let i in items){
                    if (items[i].purchased === 1) {
                        const users = items[i].users;
                        let usersString = "";
                        for(let j in users) {
                            if (j > 0) usersString += " " + users[j].name;
                            else usersString += users[j].name;
                        }
                        let expiration = "";
                        if (items[i].expiration) {
                            expiration = items[i].expiration;
                        }
                        let newItem = {
                            key: `${key}`, 
                            name: `${items[i].name}`, 
                            quantity: `${items[i].quantity}`, 
                            price: `${items[i].price}`, 
                            usernames: `${usersString}`, 
                            expiration: `${expiration}`,
                            id: `${items[i].id}`,
                        }
                        key += 1;
                        new_arr.push(newItem);
                    }
                }
                setListData(new_arr);
            })
            });
        } else {
            console.log("Group was NULL");
        }
    }
    
    const deleteItem = async (idx) => {
        let itemId = listData[idx].id;
        fetch(`https://easygrocy.com/api/item/${itemId}`, {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if(!response.ok) throw new Error(response.status);
            else return response.json();
        }).then((json) => {
            console.log(json);
        }).catch((error) => console.error(error));
    }

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = async (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        await deleteItem(prevIndex);
        newData.splice(prevIndex, 1);
        setListData(newData);
    };

    const addToCart = async (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        await sendToCart(prevIndex);
        newData.splice(prevIndex, 1);
        setListData(newData);
    }

    const renderItem = data => (
        <TouchableHighlight
            onPress={() => console.log('You touched me')}
            style={styles.rowFront}
            underlayColor={'#D5EEBB'}
        >
            <View style={{flexDirection: "row", flex: 1, justifyContent: "flex-start", alignItems: "center"}}>
                <View style={{flexDirection: "column", flex: 2, justifyContent: "center", alignItems: "center"}}>
                    <Text style={styles.itemUsername}>{data.item.usernames}</Text>
                </View>
                <View style={{flexDirection: "column", flex: 2}}
                >
                    <Text style={styles.itemName}>{data.item.name}</Text>
                    <Text style={styles.itemPrice}>${data.item.price}</Text>
                </View>
                <View style={{alignItems: "center", flex: 2}}>
                    <Text style={styles.itemQuantity}>Qt: {data.item.quantity}</Text>
                    <Text style={styles.itemExpirationDate}>{"Expiration Date: " + data.item.expiration}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );

    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={styles.backLeftButton}
                onPress={() => deleteRow(rowMap, data.item.key)}
            >
                <Text style={styles.backButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.backRightButton}
                onPress={() => addToCart(rowMap, data.item.key)}
            >
                <Text style={styles.backButtonText}>Cart</Text>
            </TouchableOpacity>
        </View>
    );

    const filterItems = (searchText) => {
        if (searchText == "") {
            setFilteredData(Array());
            return;
        }
        let searchTextLower = searchText.toLowerCase()
        const filteredItems = listData.filter((item) => {
            return item.name.toLowerCase().indexOf(searchTextLower) !== -1;
        })
        setFilteredData(filteredItems)
    }

    const showDatePicker = () => {
        setShowPicker(true);
    }

    const hideDatePicker = () => {
        setShowPicker(false);
    }

    const handleConfirmPicker = (date) => {
        console.log("date selected: ", date);
        setExpiration(date);
        hideDatePicker();
    }

    const addNewItem = async () => {
        const newData = [...listData];
        let newItem = {
            key: `${listData.length}`, 
            name: `${modalName}`, 
            price: `${modalPrice.substring(1)}`, 
            quantity: `${modalQuantity}`, 
            expiration: `${modalExpiration === "" ? "" : modalExpiration.toDateString().substring(4)}`, 
            usernames: `${currUser}`,
            purchased: `${1}`,
            group_id: `${groupId}`,
        }
        if (groupExists) { 
            fetch(`https://easygrocy.com/api/item/create_item`, {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newItem)
            }).then((response) => {
                if(!response.ok) throw new Error(response.status);
                else return response.json();
            }).then((json) => {
                console.log("Successfully added item");
                console.log(json);
                const users = json.item.users;
                let usersString = "";
                for(let i in users) {
                    if (i > 0) usersString += " " + users[i].name;
                    else usersString += users[i].name;
                }
                let expiration = "";
                if (json.item.expiration) {
                    expiration = json.item.expiration;
                }
                let updatedItem = {
                    key: `${newData.length}`, 
                    name: `${json.item.name}`, 
                    quantity: `${json.item.quantity}`, 
                    price: `${json.item.price}`, 
                    usernames: `${usersString}`, 
                    expiration: `${expiration}`,
                    id: `${json.item.id}`,
                }
                newData.push(updatedItem);
            }).catch((error) => console.error(error));
            setListData(newData);
        }
        setModalName("");
        setModalPrice("");
        setExpiration("");
        setModalQuantity("");
        setModalVisible(false);
    }

    const sendToCart = async (idx) => {
        let itemId = listData[idx].id;
        let fields = {purchased: 0};
        fetch(`https://easygrocy.com/api/item/${itemId}`, {
            method: "PUT",
            headers: {
                'Authorization': 'Bearer ' + token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fields)
        }).then((response) => {
            if(!response.ok) throw new Error(response.status);
            else return response.json();
        }).then((json) => {
            console.log(json);
        }).catch((error) => console.error(error));
    }

    return (
        <SafeAreaView style={styles.rootContainer}>
            <Text style={styles.headerText}>{squad ? `${squad} - ` : ""}Inventory</Text>
            <View style={styles.headerView}> 
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalHeaderText}>New Item:</Text>
                            
                            <TextInput
                                onChangeText={(modalName) => setModalName(modalName)}
                                placeholder='Item Name'
                                placeholderTextColor="#5F7A61"
                                style={styles.modalInputField}
                                autoComplete={false}
                                value={modalName}
                            >
                            </TextInput>
                            <TextInput
                                placeholder='Price $'
                                placeholderTextColor="#5F7A61"
                                style={styles.modalInputField}
                                keyboardType='decimal-pad'
                                onChangeText={(modalPrice) => setModalPrice(modalPrice)}
                                value={modalPrice === "" || modalPrice.indexOf("$") !== -1 ? modalPrice : "$" + modalPrice}
                            ></TextInput>   
                            <TextInput
                                onChangeText={(modalQuantity) => setModalQuantity(modalQuantity)}
                                placeholder='Quantity'
                                placeholderTextColor="#5F7A61"
                                style={styles.modalInputField}
                                keyboardType='numeric'
                                value={modalQuantity}
                            ></TextInput> 
                            <Pressable
                                style={styles.modalDatePicker}
                                onPress={showDatePicker}
                            >
                                <Text style={styles.modalDatePickerText}>{modalExpiration === "" ? "Expiration" : modalExpiration.toDateString()}</Text>
                            </Pressable>
                            <Pressable
                                style={styles.submitNewItemButton}
                                onPress={addNewItem}
                            >
                                <Text style={styles.submitNewItemButtonText}>Submit</Text>
                            </Pressable>
                        </View>
                    </View>
                    {showPicker && (
                        <DateTimePickerModal
                            isVisible={showPicker}
                            mode="date"
                            onConfirm={handleConfirmPicker}
                            onCancel={hideDatePicker}
                            date={modalExpiration === "" ? new Date() : modalExpiration}
                        >
                        </DateTimePickerModal>
                    )}
                </Modal>
                <View style={{flex: 5, }}>
                    <TextInput
                        autoCapitalize='none'
                        autoCorrect={true}
                        onChangeText={(searchText) => {
                            setSearchText(searchText);
                            filterItems(searchText);
                        }}
                        value={searchText}
                        status='info'
                        placeholder='Search'
                        placeholderTextColor="#5F7A61"
                        style={styles.searchInput}
                    />
                </View>
                <View style={{flex: 1}}>
                    <TouchableOpacity 
                        style={styles.newItemButton} 
                        onPress={() => {
                            setModalVisible(true);
                        }}
                    >
                        <Text style={styles.newItemButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <SwipeListView
                style={styles.swipeList}
                data={searchText != "" ? filteredData : listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={75}
                rightOpenValue={-75}
                previewRowKey={'0'}
                previewOpenValue={-75}
                previewOpenDelay={3000}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        backgroundColor: '#7FC8A9',
        flex: 1,
    },
    swipeList: {
        backgroundColor: "#7FC8A9",
    },
    rowFront: {
        alignItems: 'flex-start',
        backgroundColor: '#5F7A61',
        borderBottomColor: 'floralwhite',
        borderBottomWidth: 1,
        justifyContent: 'center',
        flex: 1,
        height: 80,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'floralwhite',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        height: 80,
    },
    backRightButton: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        height: 80,
        backgroundColor: '#0F4C75',
        right: 0
    },
    backLeftButton: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        height: 80,
        backgroundColor: 'tomato',
        left: 0
    },
    backButtonText: {
        color: "floralwhite"
    },
    itemQuantity: {
        color: "floralwhite",
        fontSize: 20,
        marginHorizontal: 15,
    },
    itemName: {
        color: "floralwhite",
        fontSize: 15,
        marginHorizontal: 15,
        textAlign: "center",
    },
    itemPrice: {
        color: "floralwhite",
        fontSize: 20,
        marginHorizontal: 15,
        textAlign: "center",
    },
    itemUsername: {
        color: "floralwhite",
        fontSize: 20,
        marginHorizontal: 15,
    },
    itemExpirationDate: {
        color: "floralwhite",
        fontSize: 12,
        marginHorizontal: 15,
        textAlign: "center",
    },
    searchInput: {
        height: 50,
        backgroundColor: "floralwhite",
        padding: 15,
        color: "#5F7A61",
    },
    headerText: {
        color: "floralwhite",
        textAlign: "center",
        fontSize: 20,
        marginBottom: 20,
    },
    newItemButtonText: {
        color: "floralwhite",
        fontSize: 40,
    },
    headerView: {
        backgroundColor: "#444941",
        flexDirection: "row",
    },
    newItemButton: {
        justifyContent: "center",
        alignItems: "center",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: "floralwhite",
        borderRadius: 40,
        width: 300,
        height: 400,
        justifyContent: "center",
        alignItems: "center",
    },
    submitNewItemButton: {
        borderRadius: 20,
        width: 100,
        height: 40,
        marginTop: 20,
        backgroundColor: "#444941",
        justifyContent: "center",
        alignItems: "center",
    },
    modalDatePicker: {
        width: 250,
        height: 40,
        margin: 10,
        backgroundColor: "#D5EEBB",
        justifyContent: "center",
        alignItems: "center",
    },
    modalDatePickerText: {
        color: "#5F7A61",
        textAlign: "center",
    },
    submitNewItemButtonText: {
        color: "floralwhite",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalHeaderText: {
        textAlign: "center",
        color: "#5F7A61",
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalInputField: {
        backgroundColor: "#D5EEBB",
        width: 250,
        height: 40,
        textAlign: "center",
        margin: 10,
        color: "#444941",
    },
});

export default Home;