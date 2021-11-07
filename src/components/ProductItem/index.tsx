import React from 'react';
import {View, Text, StyleSheet, Image, Button, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

interface ProductItemProps {
  item: {
    id: string;
    title: string;
    image: string;
    avgRating: number;
    ratings: number;
    price: number;
    oldPrice?: number;
  }
}

let colorButton;
const ProductItem = ({ item }) => {
  const navigation = useNavigation();

  // const { item } = props.item;

  const onAdd = () => {        
      event.preventDefault();
      navigation.navigate("Add", {productId: item.productId})
  }

  colorButton = item.productAdded ? '#FFFFFF' : '#ff007f'
  console.log(colorButton)

  return (
    <View style={styles.root}>
      <Image style={styles.image} source = {{ uri: item.productURL}} />

      <View style={styles.rightContainer}>
        <Text style={styles.title} numberOfLines={3}>{item.title}</Text>     
        <View style={styles2.button2Style}>
            <View style={styles.ButtonView}>
            <TouchableOpacity
                    color = '#FFFFFF'
                    onPress={onAdd}
                ><Text style={{color: '#FFFFFF', fontSize: 16,}}>Add to Wardrobe</Text></TouchableOpacity>
            </View>
        </View>
      </View>
    </View>
  );
};

const styles2 = StyleSheet.create({
    button2Style: {
        flex: 1,
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#ff007f',
        padding: 5,   
    },
})

export default ProductItem;