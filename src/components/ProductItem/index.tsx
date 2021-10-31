import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

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
  // const { item } = props.item;

  return (
    <View>
      <View style={styles.root}>
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
            from ${item.price}
            {item.oldPrice && (
              <Text style={styles.oldPrice}> ${item.oldPrice}</Text>
            )}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProductItem;