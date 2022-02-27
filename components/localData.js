import { useState } from 'react';
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
            await AsyncStorage.setItem('userId', userId)
        } catch(e) {
            // save error
            console.error(e);
        }
    }

    const removeUserId = async (userId) => {
        try {
            await AsyncStorage.removeItem('@MyApp_key')
          } catch(e) {
            // remove error
            console.error(e);
          }
    }

    return {
        getUserId,
        setUserId,
        removeUserId,
    }

}

export default localData;