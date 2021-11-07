import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

import {useNavigation} from '@react-navigation/native';

function Add(props) {
  const navigation = useNavigation();   

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  // console.log(props);
  const productId = props.route.params.productId;

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const galleryStatus = await ImagePicker.requestCameraRollPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');


    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };


  if (hasCameraPermission === null || hasGalleryPermission === false) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={ref => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={'1:1'} />
      </View>
      <View style={styles.buttonHolder}>
        <View style={styles.buttonStyle}>
            <View style={styles.iconContainer}>
            </View>
            <View style={styles.ButtonView}>
            <TouchableOpacity
                    color = '#FFFFFF'
                    onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
                ><Text style={styles.emailStyle}>Flip Image</Text></TouchableOpacity>
            </View>
        </View>
        <View style={styles.buttonStyle}>
            <View style={styles.iconContainer}>
            </View>
            <View style={styles.ButtonView}>
            <TouchableOpacity
                    color = '#FFFFFF'
                    onPress={() => takePicture()}
                ><Text style={styles.emailStyle}>Take Picture</Text></TouchableOpacity>
            </View>
        </View>
        <View style={styles.buttonStyle}>
            <View style={styles.iconContainer}>
            </View>
            <View style={styles.ButtonView}>
            <TouchableOpacity
                    color = '#FFFFFF'
                    onPress={() => pickImage()}
                ><Text style={styles.emailStyle}>Pick Image From Gallery</Text></TouchableOpacity>
            </View>
        </View>
        <View style={styles.buttonStyle}>
            <View style={styles.iconContainer}>
            </View>
            <View style={styles.ButtonView}>
            <TouchableOpacity
                    color = '#FFFFFF'
                    onPress={() => navigation.navigate('Save', { image, productId })}
                ><Text style={styles.emailStyle}>Save</Text></TouchableOpacity>
            </View>
        </View>
      </View>
      {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1
  },
  buttonStyle: {
      flex: 1,
      flexDirection: 'row',
      height: 50,
      backgroundColor: '#ffffff',
      borderWidth: 1,
      borderColor: '#efefef',
      marginVertical: 5,
  },
  ButtonView: {     
  },
  emailStyle: {
      color: '#ff007f',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 16,
      width: '100%'
  },
  iconContainer: {
      width: 30,
  },
  buttonHolder: {
    height: 200,
  }
})

export default Add;