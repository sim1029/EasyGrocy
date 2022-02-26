import React, { useState } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity,
    TouchableHighlight,
    SafeAreaView,
    TextInput,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';


const Home = () => {
    const [listData, setListData] = useState(Array(20).fill("").map((_, i) => ({key: `${i}`, text: `item#${i}`})));

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
        <TextInput
            autoCapitalize='none'
            autoCorrect={true}
            onChangeText={() => console.log("Hi")}
            status='info'
            placeholder='Search'
            style={styles.searchInput}
            textStyle={{ color: '#000' }}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.screenHeader}>SQUAD_NAME - Inventory</Text>
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
    }
});

export default Home;