import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useToken = () => {

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
    setToken,
    getToken,
    removeToken
  }

}

export default useToken;