import React, { useEffect, useState, useCallback } from "react";
import { View, Text } from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import Auth from './components/Auth';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        console.log("PreventingAutoHide")
        await SplashScreen.preventAutoHideAsync();
        // Do Whatever loading I want here
        await new Promise(resolve => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
      <Auth onLayout={onLayoutRootView}></Auth>
  );
}
