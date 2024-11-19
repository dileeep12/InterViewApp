import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Strings} from './Utilities/Strings';
import SplashScreen from './Screens/SplashScreen';
import SignUpLogin from './Screens/SignUpLogin';
import Intro from './Screens/Intro';
import Home from './Screens/Home';
import ProductDetails from './Screens/ProductDetails';
const Router = () => {
  const Stack = createNativeStackNavigator();
  const screenOptions = {headerShown: false};
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={Strings.ST1} component={SplashScreen} />
      <Stack.Screen name={Strings.ST2} component={SignUpLogin} />
      <Stack.Screen name={Strings.ST3} component={Intro}/>
      <Stack.Screen name={'Home'} component={Home}/>
      <Stack.Screen name={'ProductDetails'} component={ProductDetails}/>
    </Stack.Navigator>
  );
};

export default Router;
