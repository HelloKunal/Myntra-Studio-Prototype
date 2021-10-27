import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.page}>
      {/* Render Product Component */}
      <View style={styles.root}>
        <Image style={styles.image} source = {{ uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/products/cleanarchitecture.jpg'}} />

        <View style={styles.rightContainer}>
          <Text style={styles.title} numberOfLines={3}>Logitech MX Master 3 Advanced Wireless Mouse for Mac - Bluetooth/USB</Text>
          {/*Rating*/}
          <Text style={styles.price}>from $13.57</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
  root: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#7e877e',
    borderRadius: 10,  
    backgroundColor: '#fff',
  },
  image: {
    flex: 2,
    height: 150,
    resizeMode: 'contain',
  },
  rightContainer: {
    padding: 10,
    flex: 3,
  },
  title: {
    fontSize: 18,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;