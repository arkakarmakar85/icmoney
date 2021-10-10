import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StatusBar, StyleSheet, Image, TextInput, TouchableOpacity, Alert, AsyncStorage, ImageBackground } from "react-native";
import { Container, Item, Button,Form, Input, Label,Content } from 'native-base';

import Loader from "react-native-modal-loader";
import { bg1, loginlogo } from '../../includes/includes';
import { API_URL } from '../../utilies/globals';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
const Login = (props) => {
    // const [email, setEmail] = useState("");
    const isloggedIn = async () => {
        console.log("isloggedin")
        let value = await AsyncStorage.getItem('userDetails');


        //await AsyncStorage.clear()
        if (value !== null) {
            props.navigation.navigate('Dashboard');
        } else {
            props.navigation.navigate('Login');
        }

    }

    useEffect(() => {
        isloggedIn();
    }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
                "Login",
                "Please enter correct email ID",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
            return false;
        } else if (password == "") {
            Alert.alert(
                "Login",
                "Please enter a password",
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
    const loginProcess = () => {
        let thisCopy = this;
        if (validateForm()) {
            axios.post(API_URL + 'usrlogin', {
                "email": email,
                "password": password

            })
                .then(async function (response) {
                    console.log("response", response.data);
                    if (response.data.success === true) {
                        await AsyncStorage.setItem('userDetails', JSON.stringify(response.data));
                        props.navigation.navigate('Dashboard');
                    } else {
                        Alert.alert(
                            "Login",
                            "Sorry! Username or password is not correct.",
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
                        "User Name or password is not correct",
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ],
                        { cancelable: false }
                    );
                });
        }

    }
    return (
        <Container style={{ flex: 1, width: wp('100%')}}>
            <StatusBar barStyle="dark-content" hidden={true} />

            <Content>
                <ImageBackground source={bg1} style={{ width: wp('100%'), height: hp('100%') }}>
                    <View style={styles.logoContainer}>
                        <Image source={loginlogo} resizeMode={'contain'} style={{ marginTop: hp('10%') }} />
                    </View>
                    <View style={styles.tag}>
                        <Text style={{ fontSize: 23, fontWeight: '900' }}>Hello! Welcome to IC Money</Text>
                    </View>
                    <View style={styles.tag}>
                        <Text style={{ fontSize: 18, fontWeight: '100', color: '#918F9D' }}>Welcome to Login</Text>
                    </View>
                    <Form style={{width: wp('80%'), marginLeft: wp('8%'), marginRight: wp('8%')}}>
                        <Item stackedLabel style={{height: hp('12%')}}>
                            <Label style={{color: '#706D83'}}>Email</Label>
                            <Input style={{marginTop:hp('1%'), borderRadius: 10, borderColor: '#B6B2C7', borderWidth:2}} onChangeText={TextInputValue => {
                        setEmail(TextInputValue);
                        }}
                        autoCapitalize='none'
                        />
                        </Item>
                        <Item stackedLabel style={{height: hp('12%')}}>
                            <Label style={{color: '#706D83'}}>Password</Label>
                            <Input style={{marginTop:hp('1%'), borderRadius: 10, borderColor: '#B6B2C7', borderWidth:2}} onChangeText={TextInputValue => {
                            setPassword(TextInputValue);
                        }}
                        secureTextEntry={true}
                        autoCapitalize='none'
                        />
                        </Item>
                        <TouchableOpacity style={styles.forgotPassContainer}>
                            <Text style={{fontWeight: '900'}}>Forgot Password ?</Text>
                            {/* props.navigation.navigate('Signup'); */}
                        </TouchableOpacity>
                        <View style={styles.buttonContainer}>
                            <Button block style={{backgroundColor: '#489E96', width: wp('50%'), borderRadius: 10}} onPress={() => {
                                loginProcess();
                            }}><Text style={{color: 'white'}}> Login </Text></Button>
                        </View>

                    </Form>
                    <TouchableOpacity style={styles.tag} onPress={()=>{
                        props.navigation.navigate('Signup');
                    }}>
                        <Text style={{ fontSize: 18, fontWeight: '100', color: '#706D7D' }}>Dont't Have an account?</Text>
                        <Text style={{ fontSize: 18, fontWeight: '900', color: '#281B31' }}> Signup</Text>
                    </TouchableOpacity>
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