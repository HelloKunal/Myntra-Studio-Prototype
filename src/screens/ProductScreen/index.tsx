import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import styles from './styles';
import {Picker} from '@react-native-picker/picker';
import product from '../../data/product';
import QuantitySelector from '../../components/QuantitySelector'
import Button from '../../components/Button'
import ImageCarousel from '../../components/ImageCarousel'

const ProductScreen = () => {
  const [selectedOption, setSelectedOption] = useState(product.options ? product.options[0] : null);
  const [quantity, setQuantity] = useState(1);

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
            from ${product.price}
            {product.oldPrice && (
              <Text style={styles.oldPrice}> ${product.oldPrice}</Text>
            )}
      </Text>

      {/*Description*/}
      <Text style  = {styles.description}>
        {product.description}
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