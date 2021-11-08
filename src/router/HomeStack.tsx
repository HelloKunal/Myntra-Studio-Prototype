import React, {useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNav from './bottomTabNav';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import {Text, View, SafeAreaView, TextInput} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const Stack = createNativeStackNavigator();

const HeaderComponent = ({searchValue, setSearchValue}: HeaderComponentProps) => {
  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <View style={{flexDirection: 'row', alignItems: 'center', height: 40, margin: 10, padding: 5, backgroundColor: 'white'}}>
        <Entypo name="magnifying-glass" size={20} />
        <TextInput style={{height: 40, margin: 10}} placeholder="Search..." 
        value={searchValue}
        onChangeText={setSearchValue}
        />
      </View>
    </SafeAreaView>
  )
}

const HomeStack = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <Stack.Navigator searchValue={searchValue} setSearchValue={setSearchValue} 
      screenOptions={{
        header: () => (
          <HeaderComponent
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        ),
    }}>
      <Stack.Screen name="HomeScreen" options={{title: 'Home'}}>
        {() => <HomeScreen searchValue={searchValue} />}
      </Stack.Screen>
      <Stack.Screen component={ProductScreen} name="ProductDetails" />
    </Stack.Navigator>
  );
};

export default HomeStack;