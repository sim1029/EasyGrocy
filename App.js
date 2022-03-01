import React, { useEffect, useState, useCallback } from "react";
import * as SplashScreen from 'expo-splash-screen';
import Auth from './components/Auth';
import Session from './components/Session';
import useToken from './components/useToken';
import localData from './components/localData';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const {setToken, getToken} = useToken();
  const {getPassword, getEmail, setUserId} = localData();

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        // Do someting behind the scenes on load
        await attemptLogin();
      } catch (e) {
        console.warn(e);
      } 
    }
    prepare();
  }, []);

  const attemptLogin = async () => {
    getEmail().then((emailRes) => {
      getPassword().then((passwordRes) => {
        if (emailRes != null && passwordRes != null) {
          loginUser(emailRes, passwordRes);
        } else {
          setAppIsReady(true);
        }
      });
    }).catch((error) => {
      console.error(error);
      setAppIsReady(true);
    })
  }
  
  const loginUser = async (email, password) => {
    fetch('https://easygrocy.com/api/auth/login', {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then((response) => {
        if(!response.ok) throw new Error(response.status);
        else return response.json();
    })
    .then((json) => {
      setToken(json.access_token).then(async () => {
        setUserId("" + json.user_id).then(async () => {
          setUserLoggedIn(true);
          setAppIsReady(true);
        });
      });
    })
    .catch((error) => {
      console.error(error)
      setAppIsReady(true);
    })
  }

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  if (userLoggedIn){
    return(
      <Session onLayout={onLayoutRootView}></Session>
    )
  }

  return (
      <Auth onLayout={onLayoutRootView}></Auth>
  );
}
