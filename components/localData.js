import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const localData = () => {

    const getCurrentGroup = async () => {
        try {
            const userCurrGroup = await AsyncStorage.getItem('currGroup');
            if(userCurrGroup !== null) {
                // value previously stored
                return userCurrGroup;
            }
        } catch(e) {
            console.log("Error fetching currGroup: ", e);
        }
    }

    const [currGroup, setCurrentGroup] = useState(getCurrentGroup());

    const saveCurrentGroup = async (userCurrGroup) => {
        try {
            await AsyncStorage.setItem('currGroup', userCurrGroup);
        } catch (e) {
            console.log("Error saving currGroup: ", e);
        }
        setCurrentGroup(userCurrGroup);
    };

    const removeCurrentGroup = async () => {
        try {
            await AsyncStorage.removeItem('currGroup');
        } catch(e) {
            // remove error
            console.log("Error removing currGroup: ", e);
        }
        setCurrGroup(null);
    }

    const getUserId = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            if(userId !== null) {
                // value previously stored
                return userId;
            }
        } catch(e) {
            console.log("Error fetching userID: ", e);
        }
    }

    const [userId, setUserId] = useState(getUserId());

    const saveUserId = async (userId) => {
        try {
            await AsyncStorage.setItem('userId', userId);
        } catch (e) {
            console.log("Error saving userId: ", e);
        }
        setUserId(userId);
    };

    const removeUserId = async () => {
        try {
            await AsyncStorage.removeItem('userId');
        } catch(e) {
            // remove error
            console.log("Error removing userId: ", e);
        }
        setUserId(null);
    }

    return {
        setCurrentGroup: saveCurrentGroup,
        currGroup,
        removeCurrentGroup,
        setUserId: saveUserId,
        userId,
        removeUserId,
    }

}

export default localData;