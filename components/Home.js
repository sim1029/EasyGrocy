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
import DatePicker from 'react-native-date-picker'
import localData from "./localData";
import useToken from "./useToken";

const Home = ({navigation}) => {
    const [listData, setListData] = useState(Array());
    const [squad, setSquadName] = useState("");
    const [filteredData, setFilteredData] = useState(Array());
    const [searchText, setSearchText] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalPrice, setModalPrice] = useState(0);
    const [modalName, setModalName] = useState("");
    const [modalQuantity, setModalQuantity] = useState("");
    const [modalExpiration, setExpiration] = useState(new Date());
    const [openDatePicker, setOpenDatePicker] = useState(false);

    const {getToken} = useToken();
    const {getGroupId, getGroupName} = localData();

    useEffect(() => {
        getItems();
        getGroupName().then((name) => {
            setSquadName(name);
        })
    }, [navigation]);

    const getItems = async () => {
        const group = await getGroupId();
        if (group) {
            getToken().then((token) => {
                fetch(`https://easygrocy.com/api/group/${group}/items`, {
                headers: {'Authorization': 'Bearer ' + token}
            })
            .then((response) => {
                if(!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then((json) => {
                let items = json.items;
                let new_arr = Array(items.length);
                for(let i in items){
                    const users = items[i].users;
                    let usersString = "";
                    for(let j in users) {
                        if (j > 0) usersString += " " + users[j].name;
                        else usersString += users[j].name;
                    }
                    new_arr[i] = {key: `${i}`, name: `${items[i].name}`, quantity: `${items[i].quantity}`, price: `${items[i].price}`, usernames: `${usersString}`}
                }
                console.log("Fetched New Items!");
                setListData(new_arr);
            })
            });
        } else {
            console.log("Group was NULL");
        }
    }

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        setListData(newData);
    };

    const addToCart = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        const oldData = newData[prevIndex]
        // Send back to shopping cart
        console.log(oldData);
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
        // console.log(props.listData);

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
                            >
                            </TextInput>
                            <TextInput
                                placeholder='Price $'
                                placeholderTextColor="#5F7A61"
                                style={styles.modalInputField}
                                keyboardType='decimal-pad'
                                onChangeText={(modalPrice) => setModalPrice(modalPrice)}
                            ></TextInput>   
                            <TextInput
                                onChangeText={(modalQuantity) => setModalQuantity(modalQuantity)}
                                placeholder='Quantity'
                                placeholderTextColor="#5F7A61"
                                style={styles.modalInputField}
                                keyboardType='numeric'
                            ></TextInput> 
                            <Pressable style={styles.modalDatePicker} onPress={() => setOpenDatePicker(true)}>
                                <Text style={styles.modalDatePickerText}>Expiration (optional)</Text>
                            </Pressable>
                            <Pressable
                                style={styles.submitNewItemButton}
                                onPress={() => {
                                    // setListData(listData.push({key: `${modalName}`, text: `item#${modalPrice}`}))
                                    setModalVisible(false);
                                }}
                            >
                                <Text style={styles.submitNewItemButtonText}>Submit</Text>
                            </Pressable>
                            
                        </View>
                    </View>
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
                        style={styles.searchInput}
                    />
                </View>
                <View style={{flex: 1}}>
                    <TouchableOpacity style={styles.newItemButton} onPress={() => setOpenDatePicker(true)}>
                        <Text style={styles.newItemButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
                <DatePicker
                        modal={true}
                        open={openDatePicker}
                        date={modalExpiration}
                        onConfirm={(expirationDate) => {
                            setOpenDatePicker(false);
                            setModalExpiration(expirationDate);
                        }}
                        onCancel={() => {
                            setOpenDatePicker(false);
                        }}
                        display="inline"
                    />
            </View>
            <SwipeListView
                style={styles.swipeList}
                data={searchText != "" ? filteredData : listData}
                // data={listData}
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
        backgroundColor: "#5F7A61",
    },
    rowFront: {
        alignItems: 'flex-start',
        backgroundColor: '#7FC8A9',
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
        backgroundColor: '#5F7A61',
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
    searchInput: {
        height: 50,
        backgroundColor: "floralwhite",
        padding: 15
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