import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Text, ScrollView} from 'react-native';
import styles from './styles';
import {Picker} from '@react-native-picker/picker';
import product from '../../data/product';
import QuantitySelector from '../../components/QuantitySelector'
import Button from '../../components/Button'
import ImageCarousel from '../../components/ImageCarousel'
import {useRoute} from '@react-navigation/native';
import {DataStore, Auth} from 'aws-amplify';
import {Product, CartProduct} from '../../models'


const ProductScreen = () => {
  const [product, setProduct] = useState<Product | undefined>(undefined);

  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined,
    );
  const [quantity, setQuantity] = useState(1);

  const route = useRoute();
  // console.log(route.params);

  useEffect(() => {
    if(!route.params?.id) {
      return;
    }
    DataStore.query(Product, route.params.id).then(setProduct);
  }, [route.params?.id]);

  useEffect(() => {
    if(product?.options) {
      setSelectedOption (product.options[0]);
    }
  }, [product]);

  const onAddToCart = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    console.log(userData);

    const newCartProduct = new CartProduct({
      userSub,
      quantity,
      option: selectedOption,
      product,
    })
  }


  if(!product) {
    return <ActivityIndicator />
  }

  return (
    <ScrollView style={styles.root}>
      <Text style={styles.title}>{product.title}</Text>

      {/*Image Carosel*/}
      <ImageCarousel images={product.images} />

      {/*Option Selector */}
      <Picker 
        selectedValue={selectedOption}
        onValueChange={(itemValue) => setSelectedOption(itemValue)}>
        {product.options.map(option => 
          <Picker.Item label={option} value={option} />
        )}
      </Picker>

      {/*Price */}
      <Text style={styles.price}>
            from ${product.price.toFixed(2)}
            {product.oldPrice && (
              <Text style={styles.oldPrice}> ${product.oldPrice.toFixed(2)}</Text>
            )}
      </Text>

      {/*Description*/}
      <Text style  = {styles.description}>
        {product.description}
      </Text>
      {/*Quantity Selector*/}
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

      {/*Buttons*/}
      <Button text={'ADD TO CART'} containerStyles={{backgroundColor: '#FFC0CB'}} onPress={onAddToCart} />
      <Button text={'BUY NOW'} onPress={() => {console.warn('Buy Now')}} />
    </ScrollView>
  );
};

export default ProductScreen;