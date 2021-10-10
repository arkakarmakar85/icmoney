import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StatusBar, StyleSheet, Image, TextInput, TouchableOpacity, Alert, AsyncStorage, ImageBackground } from "react-native";
import { Container, Content, Item, Button, Form, Input, Label } from 'native-base';

import Loader from "react-native-modal-loader";
import { bg1, loginlogo } from '../../includes/includes';
import { API_URL } from '../../utilies/globals';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
const Signup = (props) => {
    // const [email, setEmail] = useState("");

    useEffect(() => {

    }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [repPassword, setRepPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    //form validation total
    const validateForm = () => {
        //email validation
        let atpos = email.indexOf("@");
        let dotpos = email.lastIndexOf(".");
        let msg = '';
        //pasword validation
        if (atpos < 1 || (dotpos - atpos < 2)) {
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
        } else if (password == "") {
            Alert.alert(
                "Signup",
                "Please enter a password",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
            return false;
        } else if (password == "") {
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
    const signUpProcess = () => {
        if (validateForm()) {
            axios.post(API_URL + 'usereg', {
                "email": email,
                "password": password,
                "name": name,
                "phone": phone,
            })
                .then(async function (response) {
                    console.log(response.data)
                    if (response.data.success === true) {

                        Alert.alert(
                            "Signup",
                            // JSON.stringify(response.data),
                            "We have sent a OTP to your email.",
                            [
                                { text: "OK", onPress: () => console.log("OK Pressed") }
                            ],
                            { cancelable: false }

                        );

                        props.navigation.navigate('Enterotp', {
                            'email': email
                        });
                    } else {
                        Alert.alert(
                            "Signup",
                            // JSON.stringify(response.data),
                            response.data.msg,
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
                        "Signup",
                        "Something went wrong.",
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ],
                        { cancelable: false }
                    );
                });
        }

    }
    return (
        <Container style={{ flex: 1, width: wp('100%') }}>
            <StatusBar barStyle="dark-content" hidden={true} />

            <Content>
                <ImageBackground source={bg1} style={{ width: wp('100%'), height: hp('100%') }}>
                    <View style={{ marginTop: hp('15%') }}>
                        <View style={styles.tag}>
                            <Text style={{ fontSize: 23, fontWeight: '900' }}>Signup</Text>
                        </View>
                        <View style={styles.tag}>
                            <Text style={{ fontSize: 18, fontWeight: '100', color: '#918F9D' }}>Welcome to IC Money</Text>
                        </View>
                    </View>
                    <Form style={{ width: wp('80%'), marginLeft: wp('8%'), marginRight: wp('8%') }}>
                        <Item stackedLabel style={{ height: hp('12%') }}>
                            <Label style={{ color: '#706D83' }}>Full Name</Label>
                            <Input style={{ marginTop: hp('1%'), borderRadius: 10, borderColor: '#B6B2C7', borderWidth: 2 }} onChangeText={TextInputValue => {
                                setName(TextInputValue);
                            }}
                                autoCapitalize='none' />
                        </Item>
                        <Item stackedLabel style={{ height: hp('12%') }}>
                            <Label style={{ color: '#706D83' }}>Email</Label>
                            <Input style={{ marginTop: hp('1%'), borderRadius: 10, borderColor: '#B6B2C7', borderWidth: 2 }} onChangeText={TextInputValue => {
                                setEmail(TextInputValue);
                            }}

                                autoCapitalize='none' />
                        </Item>
                        <Item stackedLabel style={{ height: hp('12%') }}>
                            <Label style={{ color: '#706D83' }}>Phone</Label>
                            <Input style={{ marginTop: hp('1%'), borderRadius: 10, borderColor: '#B6B2C7', borderWidth: 2 }} onChangeText={TextInputValue => {
                                setPhone(TextInputValue);
                            }}
                                keyboardType='numeric'
                                autoCapitalize='none' />
                        </Item>
                        <Item stackedLabel style={{ height: hp('12%') }}>
                            <Label style={{ color: '#706D83' }}>Password</Label>
                            <Input style={{ marginTop: hp('1%'), borderRadius: 10, borderColor: '#B6B2C7', borderWidth: 2 }} onChangeText={TextInputValue => {
                                setPassword(TextInputValue);
                            }}
                                secureTextEntry={true}
                                autoCapitalize='none' />
                        </Item>
                        <TouchableOpacity style={styles.forgotPassContainer} onPress={() => {
                            props.navigation.navigate('Login');
                        }}>
                            <Text style={{ fontWeight: '900' }}>Back to Login</Text>
                        </TouchableOpacity>
                        <View style={styles.buttonContainer}>
                            <Button block onPress={() => {
                                signUpProcess();
                            }} style={{ backgroundColor: '#489E96', width: wp('50%'), borderRadius: 10 }}>
                                <Text style={{ color: 'white' }}>Signup</Text></Button>
                        </View>
                    </Form>
                </ImageBackground>
            </Content>

        </Container>
    );
}


const styles = StyleSheet.create({
    tag: {
        height: hp('6%'),
        //backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'center'
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

export default Signup;