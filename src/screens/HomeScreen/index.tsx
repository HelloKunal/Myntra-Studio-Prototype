import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import HomeProductItem from '../../components/HomeProductItem'

import products from '../../data/products';

const HomeScreen = () => {
  return (
    <View style={styles.page}>
      {/* Render Product Component */}
      {/*<ProductItem item={products[3]}/>*/}

      <FlatList
        data = {products}
        renderItem = {({item}) => <HomeProductItem item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
});

export default HomeScreen;