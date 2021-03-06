import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Signup from './Signup';
import GrocyStack from './GrocyStack';

const Stack = createStackNavigator();

const Session = (props) => {

    return (
        <View style={{flex: 1}} onLayout={props.onLayout}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
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
                    <Stack.Screen
                        name={"Login"}
                        component={Login}
                    >
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
}

export default Session;