import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function useToken() {

  function getToken() {
    try {
        const userToken = await AsyncStorage.getItem('token');
        if(userToken !== null) {
            // value previously stored
            return userToken
        }
    } catch(e) {
        console.log("Error fetching token: ", e);
    }
  }

  const [token, setToken] = useState(getToken());

  function saveToken(userToken) {
    try {
        await AsyncStorage.setItem('token', userToken);
    } catch (e) {
        console.log("Error saving token: ", e);
    }
    setToken(userToken);
  };

  function removeToken() {
    try {
        await AsyncStorage.removeItem('token');
    } catch(e) {
        // remove error
        console.log("Error removing token: ", e);
    }
    setToken(null);
  }

  return {
    setToken: saveToken,
    token,
    removeToken
  }

}

export default useToken;