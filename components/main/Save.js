import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Text, Image, TouchableOpacity } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import data from '../../src/data/product';


function Save(props) {
    const [caption, setCaption] = useState("")

    const uploadImage = async () => {
        const uri = props.route.params.image;
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
        // console.log(childPath)

        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase
            .storage()
            .ref()
            .child(childPath)
            .put(blob);

        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savePostData(snapshot);
                console.log(snapshot)
            })
        }

        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);
    }

    const savePostData = (downloadURL) => {
        const productId = props.route.params.productId;

        firebase.firestore()
            .collection('posts')
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .add({
                downloadURL,
                caption,
                productId,
                likesCount: 0,
                creation: firebase.firestore.FieldValue.serverTimestamp()
            }).then((function () {
                props.navigation.popToTop()
            }))
    }
    return (
        <View style={styles.root}>
            <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: props.route.params.image }} />
            </View>
            <View style={styles.element}>
                <TextInput style={styles.emailStyle}
                    placeholder="Write a Caption . . ."
                    onChangeText={(caption) => setCaption(caption)}
                />
            </View>
            <View style={styles.buttonStyle}>
                <View style={styles.iconContainer}>
                </View>
                <View style={styles.buttonHolder}>
                <TouchableOpacity
                        color = '#ff007f'
                        onPress={() => uploadImage()}
                    ><Text style={styles.emailStyle2}>Save</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

//
                    

const styles = StyleSheet.create({
    root: {
        flex: 1,
        // flexDirection: 'column',
    },
    element: {
        flexGrow: 0,
        height: 50,     
    },
    imageContainer: {
        flex: 1,
        resizeMode: 'cover',  
        flexBasis: 450,
        flexGrow: 0,  
    },
    image: {
        flex: 1,
    },
    buttonStyle: {
        flex: 1,
        flexDirection: 'row',
        flexBasis: 50,
        flexGrow: 0,
        height: 50,
        backgroundColor: '#ff007f',
        borderWidth: 1,
        borderColor: '#efefef',
    },
      emailStyle: {
          color: '#ff007f',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 16,
          width: '100%'
      },
      emailStyle2: {
        marginVertical: 10,
          color: '#ffffff',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 22,
          fontWeight: 'bold',
          width: '100%'
      },
  iconContainer: {
      width: 30,
  },
  buttonHolder: {
    height: 50,
  }
})

export default Save;