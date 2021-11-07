import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
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

const ProductItem = ({ item }: ProductItemProps) => {
  const navigation = useNavigation();

  // const { item } = props.item;
  const onPress = () => {
    // console.warn('item pressed');
    navigation.navigate('ProductDetails', {id: item.id});
  }

  return (
    <Pressable onPress={onPress} style={styles.root}>
      <Image style={styles.image} source = {{ uri: item.image}} />

      <View style={styles.rightContainer}>
        <Text style={styles.title} numberOfLines={3}>{item.title}</Text>
        {/*Rating*/}
        <View style={styles.ratingsContainer}>

          {[0, 0, 0, 0, 0].map((el, index) =>
            <FontAwesome key={`${item.id}-${index}`}style={styles.star} name={index < Math.floor(item.avgRating) ? 'star' : 'star-o'} size={18} color={"#e47911"} />
          )}

          <Text>{item.ratings}</Text>
        </View>
        <Text style={styles.price}>
          from ${item.price.toFixed(2)}
          {item.oldPrice && (
            <Text style={styles.oldPrice}> ${item.oldPrice.toFixed(2)}</Text>
          )}
        </Text>
      </View>
    </Pressable>
  );
};

export default ProductItem;