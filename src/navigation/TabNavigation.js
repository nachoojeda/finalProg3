import { View, Text } from 'react-native'
import React from 'react'
import Home from '../screens/Home/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {FontAwesome} from '@expo/vector-icons'
import Profile from '../screens/Profile/Profile';
import Post from '../screens/Post/Post'
import HomeNavigation from './HomeNavigation';
import Buscador from '../screens/Buscador/Buscador';
const Tab  = createBottomTabNavigator();

export default function TabNav() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name='HomeNavigation' 
        component={HomeNavigation}
        options = {{
          tabBarIcon: () => <FontAwesome name='home' size={24} color='lightblue'/>,
          headerShown: false
          }}
      />
      <Tab.Screen
        name= 'Search'
        component={Buscador}
        options = {{ tabBarIcon: () => <FontAwesome name='home' size={24} color='lightblue'/>,
          headerShown: false
          }}
      />
    <Tab.Screen
      name='Post'
      component={Post}
      options = {{
        tabBarIcon: () => <FontAwesome name='plus' size={24} color='lightblue' />
        }}
       />
       <Tab.Screen
      name='Profile'
      component={Profile}
      options = {{
        tabBarIcon: () => <FontAwesome name='user' size={24} color='lightblue' />
        }}
       />
       
    </Tab.Navigator>
  )
}