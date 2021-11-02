import React from 'react';
import {View, Text, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {Auth} from 'aws-amplify';
import Button from '../../components/Button';

const AddressScreen = () => {
  const onLogout = () => {
    Auth.signOut();
  };
  return (
    <SafeAreaView>
      <Button text="Sign out" onPress={onLogout} />
    </SafeAreaView>
  );
};


export default AddressScreen;