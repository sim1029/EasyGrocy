import * as React from 'react';
import {Image, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './Welcome';
import Login from './Login';
import Signup from './Signup';
import GrocyStack from './GrocyStack';

const Stack = createStackNavigator();

const Auth = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
            headerShown: false,
            // animationEnabled: false,
        }}
      >
          <Stack.Screen
            name={"Login"}
            component={Login}
          >
          </Stack.Screen>
          <Stack.Screen
            name={"GrocyStack"}
            component={GrocyStack}
          >
          </Stack.Screen>
          <Stack.Screen
            name={"Signup"}
            component={Signup}
          >
          </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Auth;