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

import {StreamVideoClient, StreamVideo} from '@stream-io/video-react-native-sdk'

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
// import EditProfileScreen from './src/Screen/accounts/profile'
import PaymentScreen from './src/Screen/accounts/payment'
import PopularCoursesScreen from './src/Screen/explore/courseList'
import CommentScreen from './src/Screen/Home/coment'
import {Text, SafeAreaView} from 'react-native'
import explorer from './src/Screen/accounts/explorer'
import NotificationsScreen from './src/Screen/Notification/notification'
import CourseDetailScreen from './src/Screen/Notification/CourseDetailScreen'
import MoreScreen from './src/Screen/Notification/MoreScreen'
// import ChatListScreen from './src/Screen/Notification/chat'
// import ChatScreen from './src/Screen/Notification/message'
// import LiveStream from './src/Screen/LiveStream/liveStream'
import GetPremiumScreen from './src/Screen/subscription/subscription'
import CategoryScreen from './src/Screen/explore/courseCategory'
import SearchCoursesScreen from './src/Screen/explore/searchCourse'
import MyCoursesScreen from './src/Screen/myCourse/myCourse'
import CourseDetailsScreen from './src/Screen/common/courseDetails/courseDetails'
import ReviewsScreen from './src/Screen/common/Review/displayReview'
import WriteReviewScreen from './src/Screen/common/Review/writeReview'
import ProfileScreen from "./src/Screen/learnerAccount/account"
import EditProfileScreen from "./src/Screen/learnerAccount/editProfile";
import TermsConditionsScreen from "./src/Screen/common/term/term"
import PaymentMethodsScreen from "./src/Screen/common/payment/payment"
// import SignInScreen from "./src/Screen/Auth/Login/login1"
import InboxScreen from "./src/Screen/inbox/inbox"
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
      <Stack.Screen name='CourseCard' component={PopularCoursesScreen} />
      <Stack.Screen name='CommentScreen' component={CommentScreen} />
      {/* <Stack.Screen name='chat' component={ChatListScreen} />
      <Stack.Screen name='ChatScreen' component={ChatScreen} /> */}
      {/* <Stack.Screen name='LiveStream' component={LiveStream} /> */}
      <Stack.Screen name='explorer' component={explorer} />
      <Stack.Screen
        name='NotificationsScreen'
        component={NotificationsScreen}
      />
      <Stack.Screen name='CourseDetailScreen' component={CourseDetailScreen} />
      <Stack.Screen name='MoreScreen' component={MoreScreen} />
      <Stack.Screen name='GetPremiumScreen' component={GetPremiumScreen} />
      <Stack.Screen name='CategoryScreen' component={CategoryScreen} />
      <Stack.Screen
        name='SearchCoursesScreen'
        component={SearchCoursesScreen}
      />
      <Stack.Screen name='MyCoursesScreen' component={MyCoursesScreen} />
      <Stack.Screen
        name='CourseDetailsScreen'
        component={CourseDetailsScreen}
      />
      <Stack.Screen name='Review' component={ReviewsScreen} />
      <Stack.Screen name='WriteReview' component={WriteReviewScreen} />
      <Stack.Screen name='learnerProfile' component={ProfileScreen} />
      <Stack.Screen name='editProfile' component={EditProfileScreen} />
      <Stack.Screen name='term' component={TermsConditionsScreen} />
      <Stack.Screen name='payment' component={PaymentMethodsScreen} />
      {/* <Stack.Screen name='SignIn' component={SignInScreen} /> */}
      <Stack.Screen name='inbox' component={InboxScreen} />

    </Stack.Navigator>
  )
}

const App = () => {
  const user = {
    id: chatUserId,
    name: chatUserName,
  }

  // const chatClient = useCreateChatClient({
  //   apiKey: chatApiKey,
  //   userData: user,
  //   tokenOrProvider: chatUserToken,
  // })

  // if (!chatClient) {
  //   return (
  //     <SafeAreaView>
  //       <Text>Loading chat ...</Text>
  //     </SafeAreaView>
  //   )
  // }
  // const apiKey = 'mmhfdzb5evj2'
  // const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0tpLUFkaS1NdW5kaSIsInVzZXJfaWQiOiJLaS1BZGktTXVuZGkiLCJ2YWxpZGl0eV9pbl9zZWNvbmRzIjo2MDQ4MDAsImlhdCI6MTczNjE2ODMwNSwiZXhwIjoxNzM2NzczMTA1fQ.ynhlKHxUGTzOMhgKHQTKXKEJL2dPJKNrM0BPIvMd6AQ'

  // const client = new StreamVideoClient({apiKey,user, token})
  // if (!client) {
  //   return (
  //     <SafeAreaView>
  //       <Text>Loading Video ...</Text>
  //     </SafeAreaView>
  //   )
  // }
  return (
    <AppProvider>
      <OverlayProvider>
        {/* <StreamVideo client={client} language='en'>
          <Chat client={chatClient}> */}
        <GestureHandlerRootView style={{flex: 1}}>
          {' '}
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </GestureHandlerRootView>
        {/* </Chat>
        </StreamVideo> */}
      </OverlayProvider>
    </AppProvider>
  )
}

export default App
