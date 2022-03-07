import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home'
import { AntDesign } from '@expo/vector-icons';
import Profile from "./Profile"

const Tab = createBottomTabNavigator();

const GrocyStack = () => {
  return (
      <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarStyle: {backgroundColor: "#444941"},
            tabBarInactiveTintColor: "floralwhite",
            tabBarActiveTintColor: "#7FC8A9",
        }}
      >
        <Tab.Screen 
            name="Profile" 
            component={Profile}
            options={{
                tabBarIcon: () => {
                    return <AntDesign name="idcard" size={30} color="floralwhite" />
                }
            }}>
        </Tab.Screen>
        <Tab.Screen 
            name={"Home"}
            component={Home}
            options={{
                title: "Home",
                tabBarIcon: () => {
                    return <AntDesign name="home" size={30} color="floralwhite" />
                }
            }}>
        </Tab.Screen>
        
      </Tab.Navigator>
  )
}

export default GrocyStack;