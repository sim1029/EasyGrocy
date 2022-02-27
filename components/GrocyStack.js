import * as React from 'react';
import {Image, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home'
import ShoppingList from './ShoppingList'
import Profile from "./Profile"

const Tab = createBottomTabNavigator();

const GrocyStack = ({navigation}) => {
  return (
    // <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarStyle: {backgroundColor: "#444941"},
            tabBarInactiveTintColor: "floralwhite",
            tabBarActiveTintColor: "#7FC8A9",
        }}
      >
        <Tab.Screen 
            name={"Home"}
            component={Home} 
            options={{
                title: "Home",
                tabBarIcon: () => {
                    return <Image style={styles.tabBarIcon} source={require("../assets/TabBar/homeIcon.png")}></Image>
                }
            }}>
        </Tab.Screen>
        <Tab.Screen 
            name="Shopping List" 
            component={ShoppingList} 
            options={{
                title: "Shopping List",
                tabBarIcon: () => {
                    return <Image style={styles.tabBarIcon} source={require("../assets/TabBar/shopping-list.png")}></Image>
                }
            }}>
        </Tab.Screen>
        <Tab.Screen 
            name="Settings" 
            component={Profile} 
            options={{
                title: "Profile",
                tabBarIcon: () => {
                    return <Image style={styles.tabBarIcon} source={require("../assets/TabBar/profile.png")}></Image>
                }
            }}>
        </Tab.Screen>
      </Tab.Navigator>
    // </NavigationContainer>
  )
}

const styles = StyleSheet.create({
    tabBarIcon: {
        width: 27,
        height: 27,
    }
});

export default GrocyStack;