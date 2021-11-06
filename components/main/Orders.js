import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, Button } from 'react-native'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { connect } from 'react-redux'

import {useNavigation} from '@react-navigation/native';

import ProductItem from '../../src/components/ProductItem'

function Orders(props) {
    const [userProducts, setUserProducts] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const { currentUser, products } = props;
        firebase.firestore()
            .collection("products")
            .doc(props.route.params.uid)
            .collection("userProducts")
            .get()
            .then((snapshot) => {
                // console.log(snapshot);
                let products = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                setUserProducts(products)
            })

    }, [props.route.params.uid])

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.containerInfo}>
                <View style={styles.containerList}>
                    <Text>Your Wardrobe</Text>
                    <FlatList
                        numColumns = {3}
                        horizontal={false}
                        data={userProducts}
                        renderItem={({ item }) => (
                            <View style={styles.containerImage}>
                                <ProductItem item={item} />
                            </View>
                        )}
                    />
                </View>
            </View>
        </View>

    )
}

                                // <Image
                                //     style={styles.image}
                                //     source={{ uri: item.downloadURL }}
                                // />

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerInfo: {
        margin: 20
    },
    containerList: {
        flex: 1,
    },
})
const mapStateToProps = (store) => ({
    products: store.userState.products
})
export default connect(mapStateToProps, null)(Orders);
