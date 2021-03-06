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
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import localData from "./localData";
import colors from "../Methods/colors";

const Home = ({navigation}) => {
    const [listData, setListData] = useState(Array());
    const [squad, setSquad] = useState(null);
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
    const [purchased, setPurchased] = useState(1);
    const [myColors, setColors] = useState(null);
    const [localUserInfo, setLocalUserInfoHook] = useState(null);
    
    const {getLocalGroupInfo, getLocalUserInfo, getToken} = localData();
    const {getColors} = colors();

    useEffect(async () => {
        const unsubscribe = navigation.addListener('focus', async () => {
            setPurchased(1);
            const newColors = await getColors();
            setColors(newColors);
            getLocalUserInfo().then((userInfo) => {
                setLocalUserInfoHook(userInfo);
                setSquad(userInfo.active_squad);
                setCurrUser(userInfo.name)
            })
            getItems(1, newColors);
            const newToken = await getToken();
            setToken(newToken);
        });
        return unsubscribe;
    }, [navigation]);

    const getItems = async (purchased, colors) => {
        if (squad != null) {
            setGroupExists(true);
            fetch(`https://easygrocy.com/api/group/${squad.id}/items`, {
            headers: {'Authorization': 'Bearer ' + token}
            .then((response) => {
                if(!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then((json) => {
                let items = json.items;
                let new_arr = Array();
                let key = 0;
                for(let i in items){
                    if (items[i].purchased == purchased) {
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
                        let color = colors.get(usersString);
                        if (!color) color = "#444941";
                        let price = parseFloat(items[i].price);
                        let roundedPrice = price.toFixed(2);
                        let newItem = {
                            key: `${key}`, 
                            name: `${items[i].name}`, 
                            quantity: `${items[i].quantity}`, 
                            price: `${roundedPrice}`, 
                            usernames: `${usersString}`, 
                            expiration: `${expiration}`,
                            id: `${items[i].id}`,
                            color: `${color}`,
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

    const togglePurchased = async (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        await toggleItemPurchased(prevIndex);
        newData.splice(prevIndex, 1);
        setListData(newData);
    }

    const renderItem = (data) => {
        return (
            <TouchableHighlight
                onPress={() => console.log('You touched me')}
                style={purchased ? styles.rowFront : styles.rowFront1}
                underlayColor={'#D5EEBB'}
            >
                <View style={{flexDirection: "row", flex: 1, justifyContent: "flex-start", alignItems: "center"}}>
                    <View style={{flexDirection: "column", flex: 2, justifyContent: "center", alignItems: "center"}}>
                        <View style={{width: 60, height: 60, borderRadius: 30, backgroundColor: data.item.color, justifyContent: "center", alignItems: "center"}}>
                            <Text style={styles.itemNameLogo}>{data.item.usernames.substring(0,1)}</Text>
                        </View>
                        <Text style={styles.itemUsername}>{data.item.usernames}</Text>
                    </View>
                    <View style={{flexDirection: "column", flex: 4}}
                    >
                        <Text style={styles.itemName}>{data.item.name}</Text>
                        <Text style={styles.itemExpirationDate}>{data.item.expiration !== "" ? "Best By: " + data.item.expiration : ""}</Text>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={[styles.itemPrice, styles.itemPriceDollarSign]}>{data.item.price !== "" ? "$" : ""}</Text><Text style={styles.itemPrice}>{data.item.price}</Text>
                            </View>
                            <View style={{flexDirection: "row"}}>
                                <Text style={styles.itemQuantityPrefix}>{data.item.quantity !== "" ? "Qt: " : ""}</Text><Text style={styles.itemQuantity}>{data.item.quantity}</Text>
                            </View>
                        </View>
                        
                    </View>
                </View>
            </TouchableHighlight>
    );}

    let switchIcon
    if (purchased) {
        switchIcon = <FontAwesome name="shopping-cart" size={30} color="floralwhite" />
    } else {
        switchIcon = <Entypo name="list" size={30} color="floralwhite" />
    }

    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={styles.backLeftButton}
                onPress={() => deleteRow(rowMap, data.item.key)}
            >
                <FontAwesome5 name="trash-alt" size={30} color="floralwhite" />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.backRightButton}
                onPress={() => togglePurchased(rowMap, data.item.key)}
            >
                {switchIcon}
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
        let price = modalPrice.indexOf("$") === -1 ? modalPrice : modalPrice.substring(1); 
        let newItem = { 
            name: `${modalName}`, 
            price: `${price}`, 
            quantity: `${modalQuantity}`, 
            expiration: `${modalExpiration === "" ? "" : modalExpiration.toDateString().substring(4)}`, 
            usernames: `${currUser}`,
            purchased: `${purchased}`,
            group_id: `${groupId}`,
        }
        console.log(newItem);
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
                expiration = json.item.expiration;
                let price = parseFloat(json.item.price);
                let roundedPrice = price.toFixed(2);
                let color = myColors.get(usersString);
                if (!color) color = "#444941";
                let updatedItem = {
                    key: `${newData.length}`, 
                    name: `${json.item.name}`, 
                    quantity: `${json.item.quantity}`, 
                    price: `${roundedPrice}`, 
                    usernames: `${usersString}`, 
                    expiration: `${expiration}`,
                    id: `${json.item.id}`,
                    color: `${color}`
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


    const toggleItemPurchased = async (idx) => {
        let itemId = listData[idx].id;
        let toggledPurchased = purchased ? 0 : 1;
        let fields = {purchased: toggledPurchased};
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
            <View style={styles.mainHeaderView}>
                <View style={styles.headerTextView}>
                    <Text style={styles.headerText}>{squad ? `${squad} - ` : ""}{purchased ? "Inventory" : "Grocy List"}</Text>
                </View>
                <TouchableOpacity 
                    style={purchased ? styles.changeListButton : [styles.changeListButton, styles.changeListButton1]} 
                    onPress={() => {
                        let isPurchased = purchased;
                        if (purchased) {
                            setPurchased(0);
                            isPurchased = 0;
                        } else {
                            setPurchased(1);
                            isPurchased = 1;
                        }
                        setListData(Array());
                        getItems(isPurchased, myColors);
                    }
                    }>
                    {switchIcon}
                </TouchableOpacity>
            </View>
            <View style={purchased ? styles.headerView : styles.headerView1}> 
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
                style={purchased ? styles.swipeList : styles.swipeList1}
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
        backgroundColor: '#444941',
        flex: 1,
    },
    swipeList: {
        backgroundColor: "#5F7A61",
    },
    swipeList1: {
        backgroundColor: "#7FC8A9",
    },
    rowFront: {
        alignItems: 'flex-start',
        backgroundColor: '#7FC8A9',
        borderBottomColor: 'floralwhite',
        borderBottomWidth: 1,
        justifyContent: 'center',
        flex: 1,
        height: 90,
    },
    rowFront1: {
        alignItems: 'flex-start',
        backgroundColor: '#5F7A61',
        borderBottomColor: 'floralwhite',
        borderBottomWidth: 1,
        justifyContent: 'center',
        flex: 1,
        height: 90,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'floralwhite',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        height: 90,
    },
    backRightButton: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        height: 90,
        backgroundColor: '#444941',
        right: 0
    },
    backLeftButton: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        height: 90,
        backgroundColor: 'tomato',
        left: 0
    },
    backButtonText: {
        color: "floralwhite"
    },
    itemQuantity: {
        color: "floralwhite",
        fontSize: 20,
        marginRight: 15,
    },
    itemQuantityPrefix: {
        color: "#444941",
        fontSize: 20,
    },
    itemName: {
        color: "floralwhite",
        fontSize: 15,
    },
    itemPrice: {
        color: "floralwhite",
        fontSize: 20,
    },
    itemPriceDollarSign: {
        color: "#444941"
    },
    itemUsername: {
        color: "floralwhite",
        fontSize: 12,
        marginHorizontal: 15,
    },
    itemNameLogo: {
        color: "floralwhite",
        fontSize: 40,
        textAlign: "center",

    },
    itemExpirationDate: {
        color: "floralwhite",
        fontSize: 15,
    },
    searchInput: {
        height: 60,
        backgroundColor: "floralwhite",
        padding: 15,
        color: "#5F7A61",
        borderWidth: 5, 
        borderColor: "#D5EEBB",
    },
    headerText: {
        color: "floralwhite",
        fontSize: 25,
    },
    newItemButtonText: {
        color: "floralwhite",
        fontSize: 40,
    },
    headerView: {
        backgroundColor: "#5F7A61",
        flexDirection: "row",
    },
    headerView1: {
        backgroundColor: "#7FC8A9",
        flexDirection: "row",
    },
    newItemButton: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 5, 
        borderColor: "#D5EEBB",
        height: 60,
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
    mainHeaderView: {
        flexDirection: "row",
        // flex: 1,
        justifyContent: "space-between",
        alignContent: "center",
        marginHorizontal: 10,
        marginBottom: 10,
    },
    changeListButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#7FC8A9",
        padding: 5,
        width: 50,
        height: 50,
        borderRadius: 25,
        shadowOpacity: 0.3,
        shadowOffset: {width: -3, height: 5}
        // borderRadius: "50%",
    },
    changeListButton1: {
        backgroundColor: "#5F7A61"
    },
    headerTextView: {
        justifyContent: "center",

    }
});

export default Home;