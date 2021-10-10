import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StatusBar, StyleSheet, Image, TextInput, TouchableOpacity, Alert, AsyncStorage, ImageBackground } from "react-native";
import { Container, Content, Item, Button, Form, Input, Label } from 'native-base';

import Loader from "react-native-modal-loader";
import { bg1, loginlogo } from '../../includes/includes';
import { API_URL } from '../../utilies/globals';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';

const Login = (props) => {
    // const [email, setEmail] = useState("");

    useEffect(() => {

    }, []);

    const [otp, setOtp] = useState("");
    const { email } = props.route.params; //caching from route 
    // const { email }="bikikarmakar@gmail.com";

    const validateForm = () => {
        if (otp == "") {
            Alert.alert(
                "OTP Verification",
                "Please enter OTP",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
            return false;
        }

        return (true);
    }

    const processVerify = () => {
        if (validateForm()) {
            console.log({
                "email": email,
                "otp": otp
            });
            axios.post(API_URL + 'otpverify', {
                "email": email,
                "otp": otp
            })
                .then(async function (response) {
                    console.log(response);
                    if (response.data.success == 'true') {

                        // await AsyncStorage.setItem('userDetails', JSON.stringify(response.data));
                        Alert.alert(
                            "Verify OTP",
                            "Success! Congratulations You are verified.",
                            [
                                { text: "OK", onPress: () => console.log("OK Pressed") }
                            ],
                            { cancelable: false }

                        );
                        // props.navigation.navigate('Signup');
                        props.navigation.navigate('Login');
                    } else {
                        Alert.alert(
                            "Verify OTP",
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
                    Alert.alert(
                        "Login",
                        "User Name or password is not correct.",
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
                            <Text style={{ fontSize: 23, fontWeight: '900' }}>Please verify with OTP</Text>
                        </View>
                    </View>

                    <Form style={{ width: wp('80%'), marginLeft: wp('8%'), marginRight: wp('8%') }}>
                        <Item stackedLabel style={{ height: hp('12%') }}>
                            <Label style={{ color: '#706D83' }}>OTP</Label>
                            <Input style={{ marginTop: hp('1%'), borderRadius: 10, borderColor: '#B6B2C7', borderWidth: 2 }} onChangeText={TextInputValue => {
                                setOtp(TextInputValue);
                            }}
                            keyboardType='numeric'/>
                        </Item>
                        <TouchableOpacity style={styles.forgotPassContainer} onPress={() => {
                            props.navigation.navigate('Login');
                        }}>
                            <Text style={{ fontWeight: '900' }}>Back to Login</Text>
                        </TouchableOpacity>
                        <View style={styles.buttonContainer}>
                            <Button block style={{ backgroundColor: '#489E96', width: wp('50%'), borderRadius: 10 }} onPress={() => {
                                processVerify();
                            }}>
                                <Text style={{ color: 'white' }}> Verify OTP </Text>
                            </Button>
                        </View>

                    </Form>
                </ImageBackground>
            </Content>

        </Container>
    );
}


const styles = StyleSheet.create({
    logoContainer: {
        height: hp('35%'),
        //backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'center'
    },
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

export default Login;