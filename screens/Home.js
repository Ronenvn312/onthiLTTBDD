import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AdvanceImage, AdvanceImageBackground } from 'react-native-advance-image';
import { Cloudinary } from "@cloudinary/url-gen";

// Import any actions required for transformations.
import { fill } from "@cloudinary/url-gen/actions/resize";


export default function Home({ navigation }) {
    const [image, setImage] = useState(null);
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'disfwmfch'
        }
    });
    const myImage = cld.image('cld-sample-5.jpg');
    myImage.resize(fill().width(250).height(250));
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        
        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }

    };
    // useEffect(() => {
    //     cloudinary.config({
    //         cloud_name: 'sample',
    //         api_key: '874837483274837',
    //         api_secret: 'a676b67565c6767a6767d6767f676fe1',
    //         secure: true
    //     });
    // }, [])
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={pickImage}>
                <Text>Pick an image from camera roll</Text>
            </TouchableOpacity>
            {image && <AdvanceImage source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            <View style={{width: 300, height:300}}>
                <Image source={{uri: myImage}}/>
            </View>
        </View>
    )
}
