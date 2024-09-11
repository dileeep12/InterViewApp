import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import SignUp from './SignUp';
import Login from './Login';
import Animations from '../Utilities/Animations';
import Animated from 'react-native-reanimated';
import Wrapper from '../Components/Wrapper';
import {DeviceHeight, DeviceWidth} from '../Utilities/Config';

const SignUpLogin = () => {
  const {loginAnimationStyle, SignAnimationStyle, moveLogin, moveSignUp} =
    Animations();
  return (
    <Wrapper>
      <Animated.View
        style={[
          loginAnimationStyle,
          {position: 'absolute', width: DeviceWidth, height: DeviceHeight},
        ]}>
        <Login moveToSign={moveLogin} />
      </Animated.View>
      <Animated.View
        style={[
          SignAnimationStyle,
          {position: 'absolute', width: DeviceWidth, height: DeviceHeight},
        ]}>
        <SignUp moveToLogin={moveSignUp} />
      </Animated.View>
    </Wrapper>
  );
};
export default SignUpLogin;
