import AsyncStorage from '@react-native-async-storage/async-storage';

const localData = () => {

    const getLocalUserInfo = async () => {
        try {
            const jsonInfo = await AsyncStorage.getItem('userInfo');
            return jsonInfo != null ? JSON.parse(jsonInfo) : null;
        } catch(e) {
            // read error
            console.error(e);
        }
    }

    const setLocalUserInfo = async (userInfo) => {
        try {
            const jsonInfo = JSON.stringify(userInfo);
            await AsyncStorage.setItem('userInfo', jsonInfo);
        } catch(e) {
            // save error
            console.error(e);
        }
    }

    const removeLocalUserInfo = async () => {
        try {
            await AsyncStorage.removeItem('userInfo');
          } catch(e) {
            // remove error
            console.error(e);
          }
    }

    const getLocalGroupInfo = async () => {
        try {
            const jsonInfo =  await AsyncStorage.getItem('groupInfo');
            return jsonInfo != null ? JSON.parse(jsonInfo) : null;
        } catch(e) {
            // read error
            console.error(e);
        }
  
    }

    const setLocalGroupInfo = async (groupInfo) => {
        try {
            const jsonInfo = JSON.stringify(groupInfo);
            await AsyncStorage.setItem('groupInfo', jsonInfo);
        } catch(e) {
            // save error
            console.error(e);
        }
    }

    const removeLocalGroupInfo = async () => {
        try {
            await AsyncStorage.removeItem('groupInfo');
          } catch(e) {
            // remove error
            console.error(e);
          }
    }

    const getLocalItems = async () => {
        try {
            const jsonItems = await AsyncStorage.getItem('items');
            return jsonItems != null ? JSON.parse(jsonItems) : null;
        } catch(e) {
            // read error
            console.error(e);
        }
    }

    const setLocalItems = async (items) => {
        try {
            const jsonItems = JSON.stringify(items);
            await AsyncStorage.setItem('items', jsonItems);
        } catch(e) {
            // save error
            console.error(e);
        }
    }

    const removeLocalItems = async () => {
        try {
            await AsyncStorage.removeItem('items');
          } catch(e) {
            // remove error
            console.error(e);
          }
    }

    const getToken = async () => {
        try {
            return await AsyncStorage.getItem('token');
        } catch(e) {
            console.log("Error fetching token: ", e);
        }
      }
    
    const setToken = async (userToken) => {
        try {
            await AsyncStorage.setItem('token', userToken);
        } catch (e) {
            console.log("Error saving token: ", e);
        }
    };
    
    const removeToken = async () => {
        try {
            await AsyncStorage.removeItem('token');
        } catch(e) {
            // remove error
            console.log("Error removing token: ", e);
        }
    }

    return {
        getLocalUserInfo,
        setLocalUserInfo,
        removeLocalUserInfo,
        getLocalGroupInfo,
        setLocalGroupInfo,
        removeLocalGroupInfo,
        getLocalItems,
        setLocalItems,
        removeLocalItems,
        getToken,
        setToken,
        removeToken,
    }

}

export default localData;