import React, {useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNav from './bottomTabNav';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import AddressScreen from '../screens/AddressScreen';

const Stack = createNativeStackNavigator();

const ShoppingCartStack = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen component={ShoppingCartScreen} name="ShoppingCartScreen" options={{title: 'Home'}} />
      <Stack.Screen component={AddressScreen} name="AddressScreen" />
    </Stack.Navigator>
  );
};

export default ShoppingCartStack;