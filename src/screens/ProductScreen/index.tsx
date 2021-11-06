import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import styles from './styles';
import {Picker} from '@react-native-picker/picker';
import product from '../../data/product';
import QuantitySelector from '../../components/QuantitySelector'
import Button from '../../components/Button'
import ImageCarousel from '../../components/ImageCarousel'
import {useRoute} from '@react-navigation/native';


import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const ProductScreen = (props) => {
  const [selectedOption, setSelectedOption] = useState(product.options ? product.options[0] : null);
  const [quantity, setQuantity] = useState(1);
  const [productData, setProductData] = useState(1);

  const route = useRoute();
  // console.log(route.params);

  useEffect(() => {
      const productId = props.route.params.productId;
      firebase.firestore()
          .collection("productsData")
          .doc(productId)
          .get()
          .then((snapshot) => {
              // console.log(snapshot);
              let prodData = snapshot.docs.map(doc => {
                  const data = doc.data();
                  const id = doc.id;
                  return { id, ...data }
              })
              setProductData(prodData)
          })

  }, [])

  return (
    <ScrollView style={styles.root}>
      <Text style={styles.title}>{productData.title}</Text>

      {/*Image Carosel*/}
      <ImageCarousel images={productData.images} />

      {/*Option Selector */}
      <Picker 
        selectedValue={selectedOption}
        onValueChange={(itemValue) => setSelectedOption(itemValue)}>
        {productData.options.map(option => 
          <Picker.Item label={option} value={option} />
        )}
      </Picker>

      {/*Price */}
      <Text style={styles.price}>
            from ${productData.price}
            {productData.oldPrice && (
              <Text style={styles.oldPrice}> ${productData.oldPrice}</Text>
            )}
      </Text>

      {/*Description*/}
      <Text style  = {styles.description}>
        {productData.description}
      </Text>
      {/*Quantity Selector*/}
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

      {/*Buttons*/}
      <Button text={'ADD TO CART'} containerStyles={{backgroundColor: '#FFC0CB'}} onPress={() => {console.warn('Add to cart')}} />
      <Button text={'BUY NOW'} onPress={() => {console.warn('Buy Now')}} />
    </ScrollView>
  );
};

export default ProductScreen;