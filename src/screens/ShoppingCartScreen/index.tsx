import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import CartProductItem from '../../components/CartProductItem'
import Button from '../../components/Button';

import products from '../../data/cart';

const ShoppingCartScreen = () => {

  const totalPrice = products.reduce((summedPrice, product) =>
    summedPrice + product.item.price * product.quantity, 0,);

  return (
    <View style={styles.page}>
      <View>
        <Text style={{fontSize: 18}}>Subtotal ({products.length} items): 
          <Text style={{color: '#e47911', fontWeight: 'bold'}}>${totalPrice.toFixed(2)}</Text>
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Button text={'ADD TO CART'} containerStyles={{width: 180}} onPress={() => {console.warn('Add to cart')}} />
          <Button text={'BUY NOW'} containerStyles={{width: 180}} onPress={() => {console.warn('Buy Now')}} />
        </View>
      </View>
      {/* Render Product Component */}
      <FlatList
        data = {products}
        renderItem = {({item}) => <CartProductItem cartItem={item} />}
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

export default ShoppingCartScreen;