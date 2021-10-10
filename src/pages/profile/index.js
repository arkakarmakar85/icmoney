import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StatusBar, StyleSheet, Image, TextInput, TouchableOpacity, Alert, AsyncStorage, ImageBackground } from "react-native";
import { Container, Content, Item, Button, Form, Input, Label } from 'native-base';

import Loader from "react-native-modal-loader";
import { bg2, loginlogo, addimg } from '../../includes/includes';
import { API_URL, WEB_URL_UPLOADS } from '../../utilies/globals';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { launchImageLibrary } from 'react-native-image-picker';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import axios from 'axios';

const Profile = (props) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [panno, setPanno] = useState("");
    const [aadharno, setAadharno] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [userDetails, setUserDetails] = useState([]);

    const permissionCheck = async () => {
        const granted = await request(
            Platform.select({
                android: PERMISSIONS.ANDROID.CAMERA,
                //android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
                //android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
                ios: PERMISSIONS.IOS.CAMERA,
            }),
        );
        //console.log("granted", RESULTS.GRANTED)
        return granted === RESULTS.GRANTED;

    }

    const uploadProImg = async () => {
        let permissionStatus = await permissionCheck();
        var userDetailsVar = await AsyncStorage.getItem('userDetails');
        //console.log("permissionStatus", permissionStatus)
        if (true) {
            let options = {
                storageOptions: {
                    skipBackup: true,
                    //path: 'images',
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 0,
                },
            };

            //let result = ImagePicker.launchCamera(options, (result) => {
            let result = launchImageLibrary(options, (result) => {
                console.log("result",result.assets)
                if (result.assets.didCancel) {
                    console.log('User cancelled image picker');
                } else if (result.assets.error) {
                    console.log('ImagePicker Error: ', result.assets.error);
                } else if (result.assets.customButton) {
                    console.log(
                        'User tapped custom button: ',
                        result.assets.customButton
                    );
                    alert(result.customButton);
                } else {

                    let localUri = result.assets[0].uri;
                    console.log('localUri = ',localUri);

                    let filename = localUri.split('/').pop();
                    let match = /\.(\w+)$/.exec(filename);
                    let type = match ? `image/${match[1]}` : `image`;
                    console.log('user', JSON.parse(userDetailsVar).id)

                    let formData = new FormData();

                    setSelectedImage(localUri);
                    formData.append('userid', JSON.parse(userDetailsVar).id);
                    formData.append('featureimg', { uri: localUri, name: filename, type });


                    console.log("formData", formData);

                    axios({
                        method: 'post',
                        url: API_URL + 'profilepicupload',
                        data: formData,
                        timeout: 0,
                        headers: { 'Content-Type': 'multipart/form-data' }
                    })
                        .then(function (response) {
                            console.log("response", response.data);
                            //setIsLoading(false);
                            if (response.data.success == true) {

                                Alert.alert(
                                    "Image Upload",
                                    "Well done! Image is uploaded successfully.",

                                    [
                                        { text: "OK", onPress: () => console.log("OK Pressed") }
                                    ],
                                    { cancelable: false }
                                );
                            } else {
                                Alert.alert(
                                    "Image Upload",
                                    "Sorry! Image is not uploaded.",
                                    [
                                        { text: "OK", onPress: () => console.log("OK Pressed") }
                                    ],
                                    { cancelable: false }
                                );
                            }

                        })
                        .catch(function (error) {
                            //setIsLoading(false);
                            console.log(error);
                            Alert.alert(
                                "Image Upload",
                                "Please try again.",
                                [
                                    { text: "OK", onPress: () => console.log("OK Pressed") }
                                ],
                                { cancelable: false }
                            );
                        });
                }
            });
        } else {
            Alert.alert(
                "Image Upload",
                "You have denied camera access. Goto setting to accept permission again.",

                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
        }
    }

    const getuserDetails = async () => {
        let userDetailsVar = await AsyncStorage.getItem('userDetails');
        setUserDetails(JSON.parse(userDetailsVar));


        axios.post(API_URL + 'userdetails', {
            "userid": JSON.parse(userDetailsVar).id,
        })
            .then(async function (response) {
                console.log('response.data', response.data)
                if (response.data.success == true) {
                    setUserDetails(response.data);

                    setName(response.data.name);
                    setPhone(response.data.phone);
                    setPanno(response.data.panno);
                    setAadharno(response.data.aadharno);
                    setSelectedImage(WEB_URL_UPLOADS + response.data.featureimg);

                } else {
                    Alert.alert(
                        "Profile Update",
                        "Sorry could not get any data."
                        [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                        ],
                        { cancelable: false }
                    );
                }


            })
            .catch(function (error) {
                console.log("Error", error)
                Alert.alert(
                    "Profile Update",
                    "Something went wrong.",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                );
            });
    }

    const validateForm = () => {
        //email validation
        let atpos = email.indexOf("@");
        let dotpos = email.lastIndexOf(".");
        let msg = '';
        if (name == '') {
            Alert.alert(
                "Signup",
                "Please enter your name.",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
            return false;
        }
        //pasword validation
        else if (atpos < 1 || (dotpos - atpos < 2)) {
            //   if (21<3) {

            Alert.alert(
                "Signup",
                "Please enter correct email ID",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
            return false;
        } else if (password != repPassword) {
            Alert.alert(
                "Signup",
                "Please enter same  password again.",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
            return false;
        }
        else if (name == "") {
            Alert.alert(
                "Signup",
                "Please enter your name",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
            return false;
        } else if (phone == "" && phone.length == 10) {
            Alert.alert(
                "Signup",
                "Please a valid phone no",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
            return false;
        }

        return (true);
    }

    //api with data and redirection
    const profileUpdate = () => {
        if (validateForm()) {
            axios.post(API_URL + 'profileupdate', {
                "email": email,
                //"password": password,
                "name": name,
                "phone": phone,
                "userid": userDetails.id,
            })
                .then(async function (response) {
                    console.log(response.data);
                    if (response.data.success === true) {
                        Alert.alert(
                            "Profile Update",
                            "Your profile has been updated.",
                            [
                                { text: "OK", onPress: () => console.log("OK Pressed") }
                            ],
                            { cancelable: false }

                        );
                    } else {
                        Alert.alert(
                            "Profile Update",
                            // JSON.stringify(response.data),
                            "Sorry! Could not update your profile. Please try after sometime."
                            [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                            ],
                            { cancelable: false }

                        );
                    }


                })
                .catch(function (error) {
                    console.log("Error", error)
                    Alert.alert(
                        "Profile Update",
                        "Something went wrong.",
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ],
                        { cancelable: false }
                    );
                });
        }

    }

    useEffect(() => {

        const unsubscribe = props.navigation.addListener('focus', () => {
            getuserDetails();
        });

        return unsubscribe;
    }, [props.navigation]);


    return (
        <Container style={{ flex: 1, width: wp('100%') }}>
            <StatusBar barStyle="dark-content" hidden={true} />

            <Content>
                <ImageBackground source={bg2} style={{ width: wp('100%'), height: hp('100%') }}>
                    <View style={styles.headerHolder}>
                        <TouchableOpacity style={styles.profileImgHolder} onPress={uploadProImg}>
                        {selectedImage == null && <Image source={addimg} resizeMode='contain' style={{ position: 'absolute', width: wp('100%'), height: hp('10%'), left: wp('-35%'), top: hp('4%') }} />}

                        {selectedImage != null && <Image source={addimg} resizeMode='contain' style={{ position: 'absolute', width: wp('100%'), height: hp('10%'), left: wp('-35%'), top: hp('4%') }} />}
                        </TouchableOpacity>

                        <View style={styles.profileInfoHolder}>
                            {name!='' && <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '900' }}>{name}</Text>}
                            {phone!='' && <Text style={{ color: '#211F1F', fontSize: 15, fontWeight: '900' }}>{phone}</Text>}
                        </View>
                    </View>
                    <Form style={{ width: wp('80%'), marginLeft: wp('8%'), marginRight: wp('8%') }}>
                        <Item stackedLabel style={{ height: hp('12%') }}>
                            <Label style={{ color: '#706D83' }}>Full Name</Label>
                            <Input style={{ marginTop: hp('1%'), borderRadius: 10, borderColor: '#B6B2C7', borderWidth: 2 }} onChangeText={TextInputValue => {
                                setName(TextInputValue);
                            }}
                                value={name}/>
                        </Item>

                        <Item stackedLabel style={{ height: hp('12%') }}>
                            <Label style={{ color: '#706D83' }}>Phone</Label>
                            <Input style={{ marginTop: hp('1%'), borderRadius: 10, borderColor: '#B6B2C7', borderWidth: 2 }} onChangeText={TextInputValue => {
                                setPhone(TextInputValue);
                            }}
                                keyboardType={"numeric"} value={phone} />
                        </Item>
                        <Item stackedLabel style={{ height: hp('12%') }}>
                            <Label style={{ color: '#706D83' }}>Address</Label>
                            <Input style={{ marginTop: hp('1%'), borderRadius: 10, borderColor: '#B6B2C7', borderWidth: 2 }} onChangeText={TextInputValue => {
                                setAddress(TextInputValue);
                            }}
                                value={address}/>
                        </Item>

                        <Item stackedLabel style={{ height: hp('12%') }}>
                            <Label style={{ color: '#706D83' }}>Panno</Label>
                            <Input style={{ marginTop: hp('1%'), borderRadius: 10, borderColor: '#B6B2C7', borderWidth: 2 }} onChangeText={TextInputValue => {
                                setPanno(TextInputValue);
                            }}
                                value={panno}/>
                        </Item>

                        <Item stackedLabel style={{ height: hp('12%') }}>
                            <Label style={{ color: '#706D83' }}>Aadharno</Label>
                            <Input style={{ marginTop: hp('1%'), borderRadius: 10, borderColor: '#B6B2C7', borderWidth: 2 }} onChangeText={TextInputValue => {
                                setAadharno(TextInputValue);
                            }}
                                value={aadharno}/>
                        </Item>

                        <View style={styles.buttonContainer}>
                            <Button block style={{ backgroundColor: '#489E96', width: wp('50%'), borderRadius: 10 }} onPress={profileUpdate}>
                                <Text style={{ color: 'white' }}> Save  </Text>
                            </Button>
                        </View>
                    </Form>
                </ImageBackground>
            </Content>

        </Container>
    );
}


const styles = StyleSheet.create({
    profileImgHolder: {
        position: 'relative',
        backgroundColor: '#FFFFFF',
        width: wp('30%'),
        height: hp('17%'),
        borderRadius: 200
    },
    profileInfoHolder: {
        paddingTop: hp('4%'),
        padding: wp('3%'),
        //backgroundColor: '#FFFFFF',
        width: wp('45%'),
        height: hp('17%'),
    },
    headerHolder: {
        marginTop: hp('9%'),
        paddingRight: wp('15%'),
        paddingLeft: wp('15%'),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    forgotPassContainer: {
        //backgroundColor: 'red',
        width: wp('80%'),
        //height: hp('10%'),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: hp('1%')
    },
    buttonContainer: {
        paddingTop: hp('4%'),
        width: wp('80%'),
        flexDirection: 'row',
        justifyContent: 'center',
    }
});

export default Profile;