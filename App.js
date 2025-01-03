import React from 'react'
import 'react-native-gesture-handler'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {enableScreens} from 'react-native-screens'
import Login from './src/Screen/Auth/Login/login'
import SignUpScreen from './src/Screen/Auth/SignUp/signup'
import MainScreen from './src/Screen/Home/MainScreen'
enableScreens()
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='MainScreen'
      screenOptions={{headerShown: false}}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='SignUp' component={SignUpScreen} />
      <Stack.Screen name='MainScreen' component={MainScreen} />
    </Stack.Navigator>
  )
}

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      {' '}
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}

export default App
