import React from 'react';
import {View, Text, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {Auth} from 'aws-amplify';
import Button from '../../components/Button';

const AddressScreen = () => {
  const onLogout = () => {
    Auth.signOut();
    // console.log("Done");
  };
  const onSignIn = () => {
      Auth.signIn('kunal', 'kunal123');
  }
  return (
    <SafeAreaView>
      <Button text="Sign out" onPress={onLogout} />
      <Button text="Sign in" onPress={onSignIn} />
    </SafeAreaView>
  );
};


export default AddressScreen;