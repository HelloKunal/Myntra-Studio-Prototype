import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import ProductItem from '../../components/ProductItem'
import {DataStore} from 'aws-amplify';
import {Product} from '../../models'

// import products from '../../data/products';

const HomeScreen = ({searchValue}: {searchValue: string}) => {
  // console.log(searchValue);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
      DataStore.query(Product).then((results => setProducts(results)));
  }, []);

  return (
    <View style={styles.page}>
      {/* Render Product Component */}
      {/*<ProductItem item={products[3]}/>*/}

      <FlatList
        data = {products}
        renderItem = {({item}) => <ProductItem item={item} />}
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