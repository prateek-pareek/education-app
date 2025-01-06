import React from 'react'
import 'react-native-gesture-handler'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {enableScreens} from 'react-native-screens'
import {
  useCreateChatClient,
  OverlayProvider,
  Chat,
} from 'stream-chat-react-native'
import {
  chatApiKey,
  chatUserId,
  chatUserName,
  chatUserToken,
} from './src/config/chatConfig'
import {AppProvider} from './appContext'
import Login from './src/Screen/Auth/Login/login'
import SignUpScreen from './src/Screen/Auth/SignUp/signup'
import MainScreen from './src/Screen/Home/MainScreen'
import EditProfileScreen from './src/Screen/accounts/profile'
import PaymentScreen from './src/Screen/accounts/payment'
import CourseCard from './src/Screen/myCourse/courseCard'
import { Text, SafeAreaView} from 'react-native';
import ChatListScreen from "./src/Screen/Notification/chat"
import ChatScreen from "./src/Screen/Notification/message"
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
      <Stack.Screen name='EditProfileScreen' component={EditProfileScreen} />
      <Stack.Screen name='PaymentScreen' component={PaymentScreen} />
      <Stack.Screen name='CourseCard' component={CourseCard} />
      <Stack.Screen name='chat' component={ChatListScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen}/>
    </Stack.Navigator>
  )
}

const App = () => {
  const user = {
    id: chatUserId,
    name: chatUserName,
  }


  const chatClient = useCreateChatClient({
    apiKey: chatApiKey,
    userData: user,
    tokenOrProvider: chatUserToken,
  })

  if (!chatClient) {
    return (
      <SafeAreaView>
        <Text>Loading chat ...</Text>
      </SafeAreaView>
    )
  }
  return (
    <AppProvider>
      <OverlayProvider>
        <Chat client={chatClient}>
          <GestureHandlerRootView style={{flex: 1}}>
            {' '}
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </GestureHandlerRootView>
        </Chat>
      </OverlayProvider>
    </AppProvider>
  )
}

export default App
