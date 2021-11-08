import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNav from './bottomTabNav';

const Root = createNativeStackNavigator();

const Router = ({ cartItem }: CartProductItemProps) => {

  return (
    <NavigationContainer>
      <Root.Navigator screenOptions={{headerShown: false}}>
        <Root.Screen component={BottomTabNav} name="Myntra Studio" />
      </Root.Navigator>
    </NavigationContainer>
  );
};

export default Router;