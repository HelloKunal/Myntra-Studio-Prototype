import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, View, Text, Image, FlatList, Button, TouchableOpacity , useWindowDimensions } from 'react-native'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { connect } from 'react-redux'

import {useNavigation} from '@react-navigation/native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

function Profile(props) {
    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState(null);
    const [following, setFollowing] = useState(false)


    const windowWidth = useWindowDimensions().width;
    const onFlatListUpdate = useCallback(({ viewableItems}) => {
        if(viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index || 0);
        }
    }, []);

    useEffect(() => {
        const { currentUser, posts } = props;

        if (props.route.params.uid === firebase.auth().currentUser.uid) {
            setUser(currentUser)
            setUserPosts(posts)
        }
        else {
            firebase.firestore()
                .collection("users")
                .doc(props.route.params.uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        setUser(snapshot.data());
                    }
                    else {
                        console.log('does not exist')
                    }
                })
            firebase.firestore()
                .collection("posts")
                .doc(props.route.params.uid)
                .collection("userPosts")
                .orderBy("creation", "asc")
                .get()
                .then((snapshot) => {
                    let posts = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    })
                    setUserPosts(posts)
                })
        }

        if (props.following.indexOf(props.route.params.uid) > -1) {
            setFollowing(true);
        } else {
            setFollowing(false);
        }

    }, [props.route.params.uid, props.following])

    const onFollow = () => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .doc(props.route.params.uid)
            .set({})
    }
    const onUnfollow = () => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .doc(props.route.params.uid)
            .delete()
    }

    const onLogout = () => {
        firebase.auth().signOut();
    }

    const navigation = useNavigation();

    const onOrders = () => {        
        event.preventDefault();
        navigation.navigate("OrdersScreen", {uid: firebase.auth().currentUser.uid})
    }

    if (user === null) {
        return <View />
    }
    return (
        <View style={styles.container}>
            <View style={styles.containerInfo}>
                <Text style={styles.usernameStyle}>{user.name}</Text>
                <Text style={styles.emailStyle}>{user.email}</Text>
                <View style = {styles.buttonStyle}>
                    <View style={styles.iconContainer}>
                    <AntDesign name="inbox" color={'#231F20'} size={26} />   
                    </View>
                    <View style={styles.ButtonView}>    
                        <TouchableOpacity 
                            color = '#FFFFFF'
                                onPress={onOrders}
                            ><Text style={{color: '#000000'}}>Your Orders</Text></TouchableOpacity >
                    </View>
                </View>

                <View style={styles.containerGallery}>
                    <Text style={styles.emailStyle}>Digital Wardrobe</Text>
                    <FlatList
                        data={userPosts}
                        horizontal
                        renderItem={({ item }) => (
                            <View style={styles.containerImage}>
                                <Image
                                    style={styles.image}
                                    source={{ uri: item.downloadURL }}
                                />
                            </View>
                        )}
                    />
                </View>

                <View style={styles.buttonStyle}>
                    <View style={styles.iconContainer}>
                    <FontAwesome5 name="hands-helping" color={'#231F20'} size={26} />
                    </View>
                    <View style={styles.ButtonView}>
                    <TouchableOpacity
                            color = '#FFFFFF'
                            onPress={() => {}}
                        ><Text style={{color: '#000000'}}>Help Center</Text></TouchableOpacity>
                    </View>
                </View>
                <View style={styles.buttonStyle}>
                    <View style={styles.iconContainer}>
                    <FontAwesome5 name="crown" color={'#231F20'} size={26} />
                    </View>
                    <View style={styles.ButtonView}>
                    <TouchableOpacity
                            color = '#FFFFFF'
                            onPress={() => {}}
                        ><Text style={{color: '#000000'}}>Myntra Insider</Text></TouchableOpacity>
                    </View>
                </View>
                <View style={styles.buttonStyle}>
                    <View style={styles.iconContainer}>
                    <FontAwesome5 name="shoe-prints" color={'#231F20'} size={26} />
                    </View>
                    <View style={styles.ButtonView}>
                    <TouchableOpacity
                            color = '#FFFFFF'
                            onPress={() => {}}
                        ><Text style={{color: '#000000'}}>Myntra Move</Text></TouchableOpacity>
                    </View>
                </View>
                <View style={styles.buttonStyle}>
                    <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="heart-outline" color={'#231F20'} size={26} />
                    </View>
                    <View style={styles.ButtonView}>
                    <TouchableOpacity
                            color = '#FFFFFF'
                            onPress={() => {}}
                        ><Text style={{color: '#000000'}}>Wishlist</Text></TouchableOpacity>
                    </View>
                </View>
                <View style={styles.buttonStyle}>
                    <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="email-newsletter" color={'#231F20'} size={26} />
                    </View>
                    <View style={styles.ButtonView}>
                    <TouchableOpacity
                            color = '#FFFFFF'
                            onPress={() => {}}
                        ><Text style={{color: '#000000'}}>Refer & Earn</Text></TouchableOpacity>
                    </View>
                </View>

                {props.route.params.uid !== firebase.auth().currentUser.uid ? (
                    <View>
                        {following ? (
                            <Button
                                title="Following"
                                onPress={() => onUnfollow()}
                            />
                        ) :
                            (
                                <Button
                                    title="Follow"
                                    onPress={() => onFollow()}
                                />
                            )}
                    </View>
                ) : (
                    <View style={styles.buttonStyle}>
                        <View style={styles.iconContainer}>
                            <AntDesign name="logout" color={'#231F20'} size={26} />
                        </View>
                        <View style={styles.ButtonView}>
                            <TouchableOpacity
                                    color = '#FFFFFF'
                                    onPress={() => onLogout()}
                                ><Text style={{color: '#000000'}}>Logout</Text></TouchableOpacity>
                        </View>
                    </View>
                    ) }
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerInfo: {
        flexGrow: 1,  
    },
    usernameStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        width: '100%'
    },
    emailStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 16,
        width: '100%'
    },
    containerGallery: {
    },
    containerImage: {
        flex: 1,
        flexDirection: 'row',
        height: 200,
        resizeMode: 'contain',
    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1
    },
    buttonStyle: {
        flex: 1,
        flexDirection: 'row',
        height: 100,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#efefef',
    },
    ButtonView: {
        flexGrow: 1,        
    },
    iconContainer: {
        width: 40,
    }
})
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
    following: store.userState.following
})
export default connect(mapStateToProps, null)(Profile);
