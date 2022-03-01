import AsyncStorage from '@react-native-async-storage/async-storage';

const localData = () => {

    const getUserId = async () => {
        try {
            return await AsyncStorage.getItem('userId');
        } catch(e) {
            // read error
            console.error(e);
        }
  
    }

    const setUserId = async (userId) => {
        try {
            await AsyncStorage.setItem('userId', userId);
        } catch(e) {
            // save error
            console.error(e);
        }
    }

    const removeUserId = async () => {
        try {
            await AsyncStorage.removeItem('userId');
          } catch(e) {
            // remove error
            console.error(e);
          }
    }

    const getUserName = async () => {
        try {
            return await AsyncStorage.getItem('userName');
        } catch(e) {
            // read error
            console.error(e);
        }
  
    }

    const setUserName = async (userName) => {
        try {
            await AsyncStorage.setItem('userName', userName);
        } catch(e) {
            // save error
            console.error(e);
        }
    }

    const removeUserName = async () => {
        try {
            await AsyncStorage.removeItem('userName');
          } catch(e) {
            // remove error
            console.error(e);
          }
    }

    const getGroupName = async () => {
        try {
            return await AsyncStorage.getItem('groupName');
        } catch(e) {
            // read error
            console.error(e);
        }
  
    }

    const setGroupName = async (groupName) => {
        try {
            await AsyncStorage.setItem('groupName', groupName);
        } catch(e) {
            // save error
            console.error(e);
        }
    }

    const removeGroupName = async () => {
        try {
            await AsyncStorage.removeItem('groupName');
          } catch(e) {
            // remove error
            console.error(e);
          }
    }

    const getGroupId = async () => {
        try {
            return await AsyncStorage.getItem('groupId');
        } catch(e) {
            // read error
            console.error(e);
        }
  
    }

    const setGroupId = async (groupId) => {
        try {
            await AsyncStorage.setItem('groupId', groupId);
        } catch(e) {
            // save error
            console.error(e);
        }
    }

    const removeGroupId = async () => {
        try {
            await AsyncStorage.removeItem('groupId');
          } catch(e) {
            // remove error
            console.error(e);
          }
    }

    const getEmail = async () => {
        try {
            return await AsyncStorage.getItem('email');
        } catch(e) {
            // read error
            console.error(e);
        }
  
    }

    const setEmail = async (email) => {
        try {
            await AsyncStorage.setItem('email', email);
        } catch(e) {
            // save error
            console.error(e);
        }
    }

    const removeEmail = async () => {
        try {
            await AsyncStorage.removeItem('email');
          } catch(e) {
            // remove error
            console.error(e);
          }
    }

    const getPassword = async () => {
        try {
            return await AsyncStorage.getItem('password');
        } catch(e) {
            // read error
            console.error(e);
        }
  
    }

    const setPassword = async (password) => {
        try {
            await AsyncStorage.setItem('password', password);
        } catch(e) {
            // save error
            console.error(e);
        }
    }

    const removePassword = async () => {
        try {
            await AsyncStorage.removeItem('password');
          } catch(e) {
            // remove error
            console.error(e);
          }
    }

    return {
        getUserName,
        setUserName,
        removeUserName,
        getUserId,
        setUserId,
        removeUserId,
        getGroupName,
        setGroupName,
        removeGroupName,
        getGroupId,
        setGroupId,
        removeGroupId,
        setEmail,
        getEmail,
        removeEmail,
        setPassword,
        getPassword,
        removePassword,
    }

}

export default localData;