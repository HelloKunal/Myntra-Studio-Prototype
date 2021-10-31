import React, {useState} from 'react';
import {Image, Text, FlatList, View, StyleSheet, useWindowDimensions} from 'react-native';

const ImageCarousel = ({images}: {images: [string]}) => {
	const [activeIndex, setActiveIndex] = useState(1);
	const windowWidth = useWindowDimensions().width;

  return (
    <View style={styles.root}>
    	{/*<Text>{windowWidth}</Text>*/}
    	<FlatList
    		data={images}
    		renderItem={({item}) => (
    			<Image style={[styles.image, {width: windowWidth - 40}]} source={{uri: item}} />
    		)}
    		horizontal
    		showsHorizontalScrollIndicator={false}
    		snapToInterval={windowWidth - 20}
    		snapToAlignment={'center'}
    		decelerationRate={'fast'}
    		viewabilityConfig={{
    			viewAreaCoveragePercentThreshold: 50,
    		}}
    		onViewableItemsChanged={({ viewableItems}) => {
    			console.war(viewableItems);
    		}}
    	/>

    	<View style={styles.dots}>
	    	{images.map((image, index) => (
	    		<View style={[styles.dot, {backgroundColor: index == activeIndex ? '#c9c9c9' : '#ededed'}]}/> 
	    	))}
    	</View>
    </View>
  );
};

const styles = StyleSheet.create({
	root: {

	},
	image: {
		margin: 10,
		height: 250,
		// backgroundColor: 'red',
		resizeMode: 'contain',
	},
	dots: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	dot: {
		width: 10,
		height: 10,
		borderRadius: 25,
		borderWidth: 1,
		backgroundColor: '#ededed',
		borderColor: '#c9c9c9',
		margin: 5,
	},
});

export default ImageCarousel;