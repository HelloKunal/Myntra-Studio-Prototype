import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, Button, TouchableOpacity } from 'react-native'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { connect } from 'react-redux'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

function Feed(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (props.usersFollowingLoaded == props.following.length && props.following.length !== 0) {
            props.feed.sort(function (x, y) {
                return x.creation - y.creation;
            })
            setPosts(props.feed);
        }
        // console.log(posts)

    }, [props.usersFollowingLoaded, props.feed])

    const onLikePress = (userId, postId) => {
        firebase.firestore()
            .collection("posts")
            .doc(userId)
            .collection("userPosts")
            .doc(postId)
            .collection("likes")
            .doc(firebase.auth().currentUser.uid)
            .set({})
    }
    const onDislikePress = (userId, postId) => {
        firebase.firestore()
            .collection("posts")
            .doc(userId)
            .collection("userPosts")
            .doc(postId)
            .collection("likes")
            .doc(firebase.auth().currentUser.uid)
            .delete()
    }
    return (
        <View style={styles.container}>
            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={posts}
                    renderItem={({ item }) => (
                        <View style={styles.containerImage}>
                            <View style={styles.usernameContainer}>
                                <Text style={styles.usernameStyle}>{item.user.name}</Text>
                            </View>
                            <View style={styles.imgContainer}>
                                <Image
                                    style={styles.image}
                                    source={{ uri: item.downloadURL }}
                                />
                            </View>
                            <View style={styles.buttonStyle}>
                                <View style={styles.iconContainer}>
                                <FontAwesome5 name="shopping-bag" color={'#231F20'} size={20} />
                                </View>
                                <View style={styles.ButtonView}>
                                <TouchableOpacity
                                        color = '#FFFFFF'
                                        onPress={() => props.navigation.navigate('ProductDetails', {proudctId: item.productId})}
                                    ><Text style={{color: '#000000'}}>Shop Products</Text></TouchableOpacity>
                                </View>
                            </View>
                            { item.currentUserLike ?
                                (
                                    <View style={styles.buttonStyle}>
                                        <View style={styles.iconContainer}>
                                        <MaterialCommunityIcons name="heart-multiple" color={'#231F20'} size={20} />
                                        </View>
                                        <View style={styles.ButtonView}>
                                        <TouchableOpacity
                                                color = '#FFFFFF'
                                                onPress={() => onDislikePress(item.user.uid, item.id)}
                                            ><Text style={{color: '#000000'}}>Dislike</Text></TouchableOpacity>
                                        </View>
                                    </View>
                                )
                                :
                                (
                                   <View style={styles.buttonStyle}>
                                        <View style={styles.iconContainer}>
                                        <MaterialCommunityIcons name="heart-multiple" color={'#231F20'} size={20} />
                                        </View>
                                        <View style={styles.ButtonView}>
                                        <TouchableOpacity
                                                color = '#FFFFFF'
                                                onPress={() => onLikePress(item.user.uid, item.id)}
                                            ><Text style={{color: '#000000'}}>Like</Text></TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            }
                            <View style={styles.usernameContainer}>
                                <Text style={styles.commentStyle}
                                onPress={() => props.navigation.navigate('Comment', { postId: item.id, uid: item.user.uid })}>
                                View Comments...
                                </Text>
                            </View>                            
                        </View>

                    )}

                />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    usernameStyle: {        
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        width: '100%'
    },
    usernameContainer: {
        backgroundColor: '#FFFFFF',
    },
    commentStyle: {
        fontSize: 14,

    },
    containerInfo: {
        margin: 20
    },
    containerGallery: {
        flex: 1
    },
    containerImage: {
        // flex: 1 / 3
    marginVertical: 10,

    },
    image: {
        flex: 1,
        resizeMode: 'cover',
    },
    imgContainer: {
        height: 300,
    },
    buttonStyle: {
        flex: 1,
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#efefef',
    },
    ButtonView: {
        flexGrow: 1,        
    },
    iconContainer: {
        width: 30,
    }
})
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following,
    feed: store.usersState.feed,
    usersFollowingLoaded: store.usersState.usersFollowingLoaded,


})
export default connect(mapStateToProps, null)(Feed);
