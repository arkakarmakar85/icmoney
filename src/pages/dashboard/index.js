/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  StatusBar,
  ImageBackground,
  AsyncStorage
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { bg2, loginlogo } from '../../includes/includes';
import { Container, Item, Button,Form, Input, Label,Content } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { width, height } = Dimensions.get('screen');

const Dashboard = (props) => {
  const logoutProcess = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate('Login');
  }
  return (

      <ImageBackground
        source={bg2}
        style={styles.container}
        resizeMode="cover">
        <Content>
        <StatusBar barStyle="dark-content" hidden={true} />
        <Text style={styles.dashboard_text}>Dashboard</Text>

        <LinearGradient
          colors={['#e76c8f', '#c941c9']}
          style={styles.button_container}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}>
          <TouchableOpacity
            style={{}}
            onPress={() => props.navigation.navigate('Profile')}>
            <Text style={styles.inner_text}>My Profile</Text>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient
          colors={['#2a6514', '#1ae120']}
          style={styles.button_container}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}>
          <TouchableOpacity
            style={{}}
            onPress={() => props.navigation.navigate('Portfolio')}>
            <Text style={styles.inner_text}>My Portfolio</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* <LinearGradient
          colors={['#0b3b85', '#29dc9b']}
          style={styles.button_container}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}>
          <TouchableOpacity
            style={{}}
            onPress={() => props.navigation.navigate('PurchaseDetails')}>
            <Text style={styles.inner_text}>Play Game</Text>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient
          colors={['#2a6514', '#1ae120']}
          style={styles.button_container}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}>
          <TouchableOpacity
            style={{}}
            onPress={() => props.navigation.navigate('Result2')}>
            <Text style={styles.inner_text}>Result</Text>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient
          colors={['#f5781b', '#f6482b']}
          style={styles.button_container}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}>
          <TouchableOpacity
            style={{}}
            onPress={() => {logoutProcess(); }}>
            <Text style={styles.inner_text}>Exit Game</Text>

          </TouchableOpacity>
        </LinearGradient>*/}
        </Content>
      </ImageBackground>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4889',
    justifyContent: 'center',
  },
  dashboard_text: {
    alignSelf: 'center',
    marginTop: hp('10%'),
    fontSize: (width - 48) * 0.09,
    paddingBottom: 30,
    color: 'white',
    fontWeight: '700',
  },
  button_container: {
    width: '65%',
    height: height / 13,
    alignSelf: 'center',
    borderRadius: 30,
    marginBottom: height / 37,
    justifyContent: 'center',
  },
  inner_text: {
    alignSelf: 'center',
    fontSize: (width - 200) * 0.1,
    color: '#ffff',
  },
});

export default Dashboard;
