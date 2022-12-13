import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../config';
import { getDownloadURL} from 'firebase/storage'
const UpLoadScreen = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const storage = firebase.storage();
    const [filedown, setFileDown] = useState("")
    const [refStart, setRefStart] = useState(null)
    const [sampleImage, setSampleImage] = useState();
    const [imageStorage, setImageStorage] = useState('')
    // Create a root reference
    const storageRef = firebase.storage().ref();
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        const source = { uri: result.uri };
        console.log(source)
        setImage(source)
    }

    const uploadImage = async () => {
        setUploading(true);
        const response = await fetch(image.uri)
        const blob = await response.blob();
        const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1);
        setFileDown(filename)
        const ref =  storageRef.child(filename).put(blob);
        try {
            await ref;
            getDownloadURL(ref.snapshot.ref).then((url) => {
                console.log(url)
                setImageStorage(url)
            })
            // console.log("filename: " + )
        } catch (e) {
            Alert.alert('Photo uploaded...!')
        }
        setImage(null)

    }
    const getSampleImage = async () => {
        const imageRefs = await storageRef.child(filedown).listAll();
        const urls = await Promise.all(imageRefs.items.map((ref) => ref.getDownloadURL()));
        setSampleImage(urls);
        console.log(urls)
    }

    useEffect(() => {

    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header_bar}>
                <TouchableOpacity style={styles.btnback}>
                    <Image source={require('../assets/Home/backPage.png')} />
                </TouchableOpacity>
                <View style={styles.groupbtnbar}>
                    <TouchableOpacity style={styles.btnheart}>
                        <Image source={require('../assets/Home/heart-icon.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btndownload}>
                        <Image source={require('../assets/Home/dowload-icon.png')} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ margin: 5, alignItems: 'center', flex: 0.5 }}>
                {image && <Image source={{ uri: image.uri }} style={{ width: 300, height: 300 }} />}
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={styles.btnChoseImage}
                        onPress={pickImage}>
                        <Image source={require('../assets/Home/choseImage.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnChoseImage}
                        onPress={uploadImage}>
                        <Image source={require('../assets/Home/uploadImage.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnChoseImage}
                        onPress={getSampleImage}>
                        <Image source={require('../assets/Home/dowload-icon.png')} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ width: 400, height: 300, flex: 0.3 }}>
               {
                imageStorage !== '' &&  <Image
                style={{ width: 200, height: 200 }}
                source={{
                    uri: imageStorage
                }}
            ></Image>
               }
            
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#6495ed',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    header_bar: {
        flex: 0.1,
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    btnback: {
        flex: 0.15,
        width: 40,
        height: 40,
        backgroundColor: '#f0ffff',
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderRadius: 20
    },
    groupbtnbar: {
        flex: 0.85,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 20,
        alignItems: 'center'
    },
    btnheart: {
        width: 40,
        height: 40,
        backgroundColor: '#a9a9a9',
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderRadius: 10,
        marginRight: 20,
    },
    btndownload: {
        width: 40,
        height: 40,
        backgroundColor: '#a9a9a9',
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderRadius: 10
    },
    viewImage: {
        flex: 0.4,
        width: 400,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    btnChoseImage: {
        backgroundColor: '#483d8b',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderStyle: 'solid',
        margin: 5
    }
})
export default UpLoadScreen