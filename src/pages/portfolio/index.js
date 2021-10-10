/* eslint-disable prettier/prettier */
import * as React from 'react';
import { useState, useEffect } from 'react';

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
  Linking,
  AsyncStorage
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { bg1, loginlogo } from '../../includes/includes';
import { Container, Item, Button, Form, Input, Label, Content, Card, CardItem, Body } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { width, height } = Dimensions.get('screen');
import axios from 'axios';
import { API_URL } from '../../utilies/globals';


const Portfolio = (props) => {

  const [userportfolioDetails, setUserportfolioDetails] = useState(null);
  const [portfolioDetails, setPortfolioDetails] = useState(null);

  const getUsserProfile = async () => {
    let userDetailsVar = await AsyncStorage.getItem('userDetails');

    axios.post(API_URL + 'getCustomerDetials', {
      "email": JSON.parse(userDetailsVar).email

    })
      .then(async function (response) {
        console.log("response", response.data);
        if (response.data.success === true) {
          setUserportfolioDetails(response.data.res);
          getCustomerPortfolio(response.data.res);
        } else {
          Alert.alert(
            "Portfolio",
            "Sorry! Could not fetch portfolio data.",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }

          );
        }

      })
      .catch(function (error) {
        Alert.alert(
          "Portfolio",
          "Sorry! Could not fetch portfolio data",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        );
      });
  }

  const getCustomerPortfolio = (details) => {
    axios.post(API_URL + 'getCustomerPortfolio', {
      "customerid": details.cutomerid
    })
      .then(async function (response) {
        console.log("response", response.data);
        if (response.data.success === true) {
          setPortfolioDetails(response.data.res);
        } else {
          Alert.alert(
            "Portfolio",
            "Sorry! Could not fetch portfolio data.",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }

          );
        }

      })
      .catch(function (error) {
        Alert.alert(
          "Portfolio",
          "Sorry! Could not fetch portfolio data",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        );
      });
  }


  useEffect(() => {
    getUsserProfile();
  }, []);


  return (

    <ImageBackground
      source={bg1}
      style={styles.container}
      resizeMode="cover">

      <StatusBar barStyle="dark-content" hidden={true} />
      <Text style={styles.dashboard_text}>Portfolio</Text>
      {userportfolioDetails != null && <Card style={{marginBottom: hp('5%')}}>
        <CardItem header button onPress={() => { }} style={{ backgroundColor: '#d2e8b0' }}>
        <Text style={{ fontWeight: 'bold' }}>User Details: </Text>
        </CardItem>
        <CardItem button onPress={() => { }} style={{ backgroundColor: '#eceddc' }}>
          <Body style={styles.portfolioContent, {height: hp('20%')}}>

            <Text style={{ fontWeight: 'bold' }}>Name: </Text>
            <Text>{userportfolioDetails.name}</Text>


            <Text style={{ fontWeight: 'bold' }}>Email: </Text>
            <Text>{userportfolioDetails.email}</Text>


            <Text style={{ fontWeight: 'bold' }}>Phone: </Text>
            <Text>{userportfolioDetails.phone}</Text>



            <Text style={{ fontWeight: 'bold' }}>Pan: </Text>
            <Text>{userportfolioDetails.pan}</Text>


            <Text style={{ fontWeight: 'bold' }}>Address: </Text>
            <Text>{userportfolioDetails.address}</Text>

          </Body>
        </CardItem>
        <CardItem style={{ backgroundColor: '#b5f2d3' }} footer button onPress={() => {
          Linking.openURL('https://icmoneymart.com/admin/Managepage/folioprint/' + userportfolioDetails.cutomerid);
        }}>
          <Text style={{ color: 'blue', fontWeight: 'bold' }}>Download Portfolio</Text>
        </CardItem>
      </Card>}

      <Content>
        {userportfolioDetails != null && portfolioDetails != null &&
          portfolioDetails.map((details,index) =>
            <Card style={{ marginBottom: hp('5%') }} key={index}>
              <CardItem header button onPress={() => { }} style={{ backgroundColor: '#d1e562' }}>
                <Text style={{ fontWeight: 'bold' }}>Folio No: </Text>
                <Text>{details.foliono}</Text>
              </CardItem>
              <CardItem button onPress={() => { }} style={{ backgroundColor: '#e9f2b8' }}>
                <Body>
                  <View style={styles.portfolioContent}>
                    <Text style={{ fontWeight: 'bold' }}>Scheme Name: </Text>
                    <Text>{details.schemename}</Text>
                  </View>


                  {/* <Text style={{ fontWeight: 'bold' }}>Type: </Text>
                  <Text>{details.phone}</Text> */}
                  <View style={styles.portfolioContent}>
                  <Text style={{ fontWeight: 'bold' }}>NAV: </Text>
                  <Text>{details.nav}</Text>
                  </View>

                  <View style={styles.portfolioContent}>
                  <Text style={{ fontWeight: 'bold' }}>Unit: </Text>
                  <Text>{details.unit}</Text>
                  </View>

                  <View style={styles.portfolioContent}>
                  <Text style={{ fontWeight: 'bold' }}>Current Value: </Text>
                  <Text>{details.schemetype}</Text>
                  </View>

                  <View style={styles.portfolioContent}>
                  <Text style={{ fontWeight: 'bold' }}>Cost Value: </Text>
                  <Text>{details.costvalue}</Text>
                  </View>
                </Body>
              </CardItem>

            </Card>
          )}

      </Content>
    </ImageBackground>

  );
};

const styles = StyleSheet.create({
  portfolioContent: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
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
    color: 'black',
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

export default Portfolio;
