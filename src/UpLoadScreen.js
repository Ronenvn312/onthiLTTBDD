import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Image, FlatList, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../config';
import { getDownloadURL } from 'firebase/storage'
import axios from 'axios';
const UpLoadScreen = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [filedown, setFileDown] = useState("")
    const [imageStorage, setImageStorage] = useState('')
    const [listItem, setListItem] = useState([])
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
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
        const ref = storageRef.child(filename).put(blob);
        try {
            await ref;
            // getDownloadURL(ref.snapshot.ref).then((url) => {
            //     setImageStorage(url)
            // }).then((erro) => console.log(erro))
        } catch (e) {
            Alert.alert('Photo uploaded...!')
        }
        setImage(null)

    }
    const uploadApiItem = () => {
        if(imageStorage !== ""){
            axios.post(`https://6397e2c886d04c76339fe4a8.mockapi.io/api/dat/items`, { name: name, age: age, phone: phone, url: imageStorage }).then((result) => {
            console.log(result.data)
           
        })
        setName('')
        setAge('')
        setPhone('')
        console.log(name + age + phone + "")
        realoadList()
        }

    }
    const realoadList = () => {
        axios.get('https://6397e2c886d04c76339fe4a8.mockapi.io/api/dat/items').then((result) => {
            result.data.map((item) => console.log(item.url))
            setListItem(result.data)
        })
    }
    useEffect(() => {
        axios.get('https://6397e2c886d04c76339fe4a8.mockapi.io/api/dat/items').then((result) => {
            setListItem(result.data)
        })
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

            <View style={styles.formContain}>
                {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
                <View style={styles.input_form}>
                    <Text style={styles.text_form}>Name: </Text>
                    <TextInput
                        value={name}
                        onChangeText={(val) => setName(val)}
                        placeholder='VD: Nguyen Tien Dat'></TextInput>
                </View>
                <View style={styles.input_form}>
                    <Text style={styles.text_form}>Age: </Text>
                    <TextInput
                        value={age}
                        onChangeText={(val) => setAge(val)}
                        style={styles.input_value} placeholder='VD: 12'></TextInput>
                </View>
                <View style={styles.input_form}>
                    <Text style={styles.text_form}>Phone: </Text>
                    <TextInput
                        value={phone}
                        onChangeText={(val) => setPhone(val)}
                        placeholder='VD: 1234567890'></TextInput>
                </View>
                <View style={{ flexDirection: 'row' }}>

                    <TouchableOpacity
                        style={styles.btnChoseImage}
                        onPress={pickImage}>
                        <Image source={require('../assets/Home/choseImage.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnChoseImage}
                        onPress={() => {
                            uploadImage()
                        }}>
                        <Image source={require('../assets/Home/uploadImage.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnChoseImage}
                        onPress={() => {
                            uploadApiItem()
                        }}>
                        <Image source={require('../assets/Home/dowload-icon.png')} />
                    </TouchableOpacity>

                </View>
            </View>
            <ScrollView style={{ flex: 0.2 }}>
                {
                    listItem && listItem.map((item) =>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', margin: 5 }}
                            key={item.id}>
                            {
                                item.url ? 
                                <Image

                                style={{ width: 100, height: 100, marginRight: 5 }}
                                source={{
                                    uri: item.url
                                }} />: 
                                <Image
                                style={{ width: 100, height: 100, marginRight: 5 }}
                                source={{
                                    uri: 'https://firebasestorage.googleapis.com/v0/b/test-b9c57.appspot.com/o/425FEFEB-A783-440D-9617-39F3C889EF27.jpg?alt=media&token=f291d55a-209e-400b-ad35-686f65f8511d'
                                }} />
                            }
                            <View>
                                <Text>Name:  {item.name}</Text>
                                <Text>Age: {item.age}</Text>
                                <Text>Phone: {item.phone}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }


            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#6495ed',
        flex: 1,
        justifyContent: 'flex-start',

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
    },
    formContain: {
        margin: 5,
        alignItems: 'center',
        flex: 0.5,
        backgroundColor: '#f0f8ff',
        width: 400
    },
    input_form: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        width: 250
    },
    text_form: {
        flex: 0.4,
        color: '#483d8b',
        fontSize: 13,
        fontWeight: 'bold'
    },
    input_value: {
        flex: 0.6,
        width: 200
    }

})
export default UpLoadScreen