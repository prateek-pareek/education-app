import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Login from "./src/Screen/Auth/Login/login";
import SignUpScreen from "./src/Screen/Auth/SignUp/signup";
import HomeScreen from "./src/Screen/Home/home";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator for Home and Settings
const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // tabBarIcon: ({ color, size }) => {
        //   let iconName = 'home-outline';
        //   if (route.name === 'Home') {
        //     iconName = 'home-outline';
        //   } else if (route.name === 'Settings') {
        //     iconName = 'cog-outline';
        //   }

        //   return <Icon name={iconName} size={size} color={color} />;
        // },
        tabBarStyle: {
          backgroundColor: '#ffffff',
        },
        tabBarActiveTintColor: '#4E68E8', 
        tabBarInactiveTintColor: '#888', 
        showLabel: false,
      })}
    >
      {/* <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: { backgroundColor: '#4E68E8' },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
        }}
      /> */}
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          headerStyle: { backgroundColor: '#4E68E8' },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
        }}
      />
    </Tab.Navigator>
  );
};

// Stack Navigator for Login and Signup Screens
const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="HomeTabs" component={HomeTabs} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <SignUpScreen/>
    // <NavigationContainer>
    //   <AppNavigator />
    // </NavigationContainer>
  );
};

export default App;
