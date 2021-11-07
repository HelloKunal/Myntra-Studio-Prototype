import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Picker} from '@react-native-picker/picker';
import product from '../../data/product';
import QuantitySelector from '../../components/QuantitySelector'
import Button from '../../components/Button'
import ImageCarousel from '../../components/ImageCarousel'
import {useRoute} from '@react-navigation/native';


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const ProductScreen = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [productData, setProductData] = useState(1);
  const [selectedOption, setSelectedOption] = useState(productData.options ? productData.options[0] : null);

  const route = useRoute();
  // console.log(props);

  // useEffect(() => {
  //     let productId = props.route.params.productId;

  //     productId = 'adadsadadwad'       
  //       // console.log('starting')
  //       firebase.firestore()
  //           .collection("productsData")
  //           .doc(productId)
  //           .get()
  //           .then((snapshot) => {
  //               // console.log(snapshot);
  //               let prodData = snapshot.docs.map(doc => {
  //                   const data = doc.data();
  //                   const id = doc.id;
  //                   return { id, ...data }
  //               })
  //               setProductData(snapshot._delegate._document.data.value.mapValue.fields)
  //               // console.log(snapshot._delegate._document.data.value.mapValue.fields);
  //               // console.log(productData);
  //           })

  // }, [])


    return (
      <ScrollView style={styles.root}>

        {/*Image Carosel*/}
        <View style={styles.imgStyle}>
        <ImageCarousel images={product.images} />
        </View>

        <View style={styles.textArea}>
          <Text style={styles.title}>{product.title}</Text>

          {/*Price */}
          <Text style={styles.price}>
                from ${product.price}
                {product.oldPrice && (
                  <Text style={styles.oldPrice}> ${product.oldPrice}</Text>
                )}
          </Text>
        </View>

        {/*Buttons*/}
        <View style={styles.buttonSidebySide}>
          <View style={styles.buttonStyle}>
              <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="email-newsletter" color={'#231F20'} size={26} />
              </View>
              <View style={styles.ButtonView}>
              <TouchableOpacity
                      color = '#FFFFFF'
                      onPress={() => {}}
                  ><Text style={{color: '#000000'}}>WISHLIST</Text></TouchableOpacity>
              </View>
          </View>
          <View style={styles.button2Style}>
              <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="email-newsletter" color={'#FFFFFF'} size={26} />
              </View>
              <View style={styles.ButtonView}>
              <TouchableOpacity
                      color = '#FFFFFF'
                      onPress={() => {}}
                  ><Text style={{color: '#FFFFFF', flex: 1, justifyContent: 'space-around', alignItems: 'space-around', fontWeight: 'bold'}}>ADD TO BAG</Text></TouchableOpacity>
              </View>
          </View>
        </View>

        {/*Option Selector */}
        <Picker 
          selectedValue={selectedOption}
          onValueChange={(itemValue) => setSelectedOption(itemValue)}>
          {product.options.map(option => 
            <Picker.Item label={option} value={option} />
          )}
        </Picker>

        {/*Description*/}
        <Text style  = {styles.description}>
          {product.description}
        </Text>
        {/*Quantity Selector*/}
        <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

      </ScrollView>
    );
};

export default ProductScreen;