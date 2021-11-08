import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo'
import ShoppingCartStack from './ShoppingCartStack';
import HomeStack from './HomeStack';
import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';

const Tab = createBottomTabNavigator();

const BottomTabNav = ({ cartItem }: CartProductItemProps) => {

  return (
    <Tab.Navigator 
      screenOptions={{
          headerShown: false, 
          inactiveTintColor: '#ffbd7d', 
          activeTintColor: '#e47911'
        }}>
      <Tab.Screen component={HomeStack} name="home" options={{
          tabBarIcon: ({color}) => (<Entypo name="home" color={color} size={25} />),
        }} />
      <Tab.Screen component={HomeScreen} name="profile" options={{
          tabBarIcon: ({color}) => (<Entypo name="user" color={color} size={25} />),
        }} />
      <Tab.Screen component={ShoppingCartStack} name="shoppingCart" options={{
          tabBarIcon: ({color}) => (<Entypo name="shopping-cart" color={color} size={25} />),
        }} />
      <Tab.Screen component={MenuScreen} name="more" options={{
          tabBarIcon: ({color}) => (<Entypo name="dots-three-horizontal" color={color} size={25} />),
        }} />
    </Tab.Navigator>
  );
};

export default BottomTabNav;