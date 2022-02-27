import React, { useState } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity,
    TouchableHighlight,
    SafeAreaView,
    TextInput,
    Modal,
    Pressable,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

const ShoppingList = () => {
    const [listData, setListData] = useState(Array(20).fill("").map((_, i) => ({key: `${i}`, text: `item#${i}`})));
    const [modalVisible, setModalVisible] = useState(false);

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
            <View>
                <Text style={styles.itemText}>I am {data.item.text} in a SwipeListView</Text>
            </View>
        </TouchableHighlight>
    );

    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={styles.backLeftBtn}
                onPress={() => deleteRow(rowMap, data.item.key)}
            >
                <Text style={styles.itemText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.backRightBtn}
                onPress={() => addToCart(rowMap, data.item.key)}
            >
                <Text style={styles.itemText}>Cart</Text>
            </TouchableOpacity>
        </View>
    );

    const renderHeader = () => (
        <View style={styles.headerView}>
            <View style={styles.headerView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>New Item:</Text>
                            
                            <TextInput
                                onChangeText={() => console.log("EDIT")}
                                placeholder='penis'
                                style={styles.modalInputField}
                                autoComplete={false}
                            >
                            </TextInput>
                            <TextInput
                                onChangeText={() => console.log("EDIT")}
                                placeholder='price'
                                style={styles.modalInputField}
                                keyboardType='decimal-pad'
                            ></TextInput>   
                            <TextInput
                                onChangeText={() => console.log("EDIT")}
                                placeholder='quantity'
                                style={styles.modalInputField}
                                keyboardType='numeric'
                            ></TextInput> 
                            <Pressable
                                style={styles.button}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.textStyle}>Submit</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
            <View style={{flex: 5}}>
                <TextInput
                    autoCapitalize='none'
                    autoCorrect={true}
                    onChangeText={() => console.log("Hi")}
                    status='info'
                    placeholder='Search'
                    style={styles.searchInput}
                    textStyle={{ color: '#000' }}
                />
            </View>
            <View style={{flex: 1}}>
                <TouchableOpacity style={styles.newItemBtn} onPress={() => setModalVisible(true)}>
                    <Text style={styles.newItemButton}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.screenHeader}>SQUAD_NAME - Grocery List</Text>
            <SwipeListView
                style={styles.swipeList}
                data={listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={75}
                rightOpenValue={-75}
                previewRowKey={'0'}
                previewOpenValue={-75}
                previewOpenDelay={3000}
                ListHeaderComponent={renderHeader}
                stickyHeaderIndices={[0]}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#7FC8A9',
        flex: 1,
    },
    swipeList: {
        marginTop: 15,
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#7FC8A9',
        borderBottomColor: '#5F7A61',
        borderBottomWidth: 1,
        justifyContent: 'center',
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
    backRightBtn: {
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
    backLeftBtn: {
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
    itemText: {
        color: "floralwhite"
    },
    searchInput: {
        height: 50,
        backgroundColor: "floralwhite",
        padding: 15
    },
    screenHeader: {
        color: "floralwhite",
        textAlign: "center",
        fontSize: 20,
    },
    newItemButton: {
        color: "floralwhite",
        fontSize: 40,
    },
    headerView: {
        backgroundColor: "#444941",
        flexDirection: "row",
    },
    newItemBtn: {
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
        height: 300,
        justifyContent: "center",
        alignItems: "center",
      },
      button: {
        borderRadius: 20,
        width: 100,
        height: 40,
        backgroundColor: "#444941",
        justifyContent: "center",
        alignItems: "center",
      },
      textStyle: {
        color: "floralwhite",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        textAlign: "center",
        color: "#5F7A61",
        fontWeight: "bold",
      },
      modalInputField: {
        backgroundColor: "#5F7A61",
        width: 250,
        height: 40,
        textAlign: "center",
        margin: 10,
      }
});

export default ShoppingList;