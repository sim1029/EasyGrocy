import * as React from 'react';
<<<<<<< HEAD
import { Image, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
=======
import {Image, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
>>>>>>> a546eee61e56ade61f5ad8f0ecbdc2ac9f9c4ca9
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './Welcome';
import Login from './Login';
import Signup from './Signup';
import GrocyStack from './GrocyStack';

const Stack = createStackNavigator();

<<<<<<< HEAD
const Auth = (props) => {
    return (
        <View style={{flex: 1}} onLayout={props.onLayout}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen
                        name={"Signup"}
                        component={Signup}
                    >
                    </Stack.Screen>
                    <Stack.Screen
                        name={"GrocyStack"}
                        component={GrocyStack}
                    >
                    </Stack.Screen>
                    <Stack.Screen
                        name={"Login"}
                        component={Login}
                    >
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </View>
=======
const Auth = () => {
    // const linking = {
    //     prefixes: [
          
    //     ],
    //     config: {
          
    //     },
    // };
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
>>>>>>> a546eee61e56ade61f5ad8f0ecbdc2ac9f9c4ca9
    );
}

export default Auth;