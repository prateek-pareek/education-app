import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import VectorIcon from '../utils/VectorIcon'
import {Colors} from '../utils/Colors'
import {TabData} from '../data/TabData'
import HomeScreen from '../Screen/Home/home'
const Tab = createBottomTabNavigator()

const BottomTabbar = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={() => ({
          tabBarShowLabel: false,
          tabBarActiveTintColor: Colors.primaryColor,
          tabBarInactiveTintColor: Colors.grey,
          headerShown: false,
        })}>
        {TabData.map(tab => (
          <Tab.Screen
            key={tab.id}
            name={tab.name}
            component={tab.route}
            options={{
              tabBarIcon: ({color, focused}) => (
                <VectorIcon
                  type={focused ? tab.activeiconType : tab.inactiveIconType}
                  name={focused ? tab.activeIconName : tab.inactiveIconName}
                  size={focused ? tab.size : tab.unFocusSize}
                  color={color}
                />
              )
            }}
          />
        ))}
      </Tab.Navigator>
    </>
  )
}

export default BottomTabbar
