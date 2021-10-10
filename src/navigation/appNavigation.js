import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "../pages/login";
import Signup from "../pages/signup";
import Profile from "../pages/profile";
import Enterotp from "../pages/Enterotp";
import Dashboard from "../pages/dashboard";
import Portfolio from "../pages/portfolio";




const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ title: 'Login', headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: 'Dashboard', headerShown: false }} />
        <Stack.Screen name="Portfolio" component={Portfolio} options={{ title: 'Portfolio', headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ title: 'Signup', headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile', headerShown: false }} />
        <Stack.Screen name="Enterotp" component={Enterotp} options={{ title: 'Enter otp', headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AppNavigation;
