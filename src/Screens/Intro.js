import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';
import Wrapper from '../Components/Wrapper';
import {Images} from '../Utilities/Images';
import {DeviceHeight, DeviceWidth} from '../Utilities/Config';
import Animated from 'react-native-reanimated';
import {Strings} from '../Utilities/Strings';
import {Colors} from '../Utilities/Colors';
import CustomButton from '../Components/CustomButton';
import Animations from '../Utilities/Animations';
import {useDispatch} from 'react-redux';
import {setIntro} from '../Redux/Actions';

const Intro = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    triggerAnimation1();
  }, []);
  const {
    animationStyle1,
    animationStyle2,
    animationStyle3,
    animationStyle4,
    triggerAnimation1,
  } = Animations();
  const handleStart = type => {
    dispatch(setIntro(true));
    if (type == 'button') {
      navigation.navigate(Strings.ST2);
    }
    navigation.navigate(Strings.ST2);
  };
  return (
    <View style={styles.container}>
      <Wrapper>
        <Image
          source={Images.splashLeftTop}
          style={styles.imgStyle1}
          resizeMode="stretch"
        />
        <Image
          source={Images.splashRightTop}
          style={styles.imgStyle2}
          resizeMode="stretch"
        />
        <Animated.View
          style={[animationStyle1, {marginVertical: DeviceHeight * 0.05}]}>
          <Image
            source={Images.logo}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>
        <Animated.Text style={[styles.quoteStyle, animationStyle2]}>
          {Strings.ST4}
        </Animated.Text>
        <Animated.View style={animationStyle3}>
          <CustomButton buttonText={Strings.ST5} onPress={handleStart} />
        </Animated.View>
        <Animated.View style={[animationStyle4, styles.signupView]}>
          <Text style={styles.signinText}>Already have an account?</Text>
          <Text
            style={[
              styles.signinText,
              {
                fontWeight: '700',
                textDecorationLine: 'underline',
                color: '#000',
              },
            ]}>
            {' '}
            Signin
          </Text>
        </Animated.View>
      </Wrapper>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgStyle1: {
    width: DeviceWidth * 0.5,
    height: DeviceHeight * 0.3,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  imgStyle2: {
    height: DeviceHeight * 0.25,
    width: DeviceWidth * 0.4,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  logo: {
    width: '100%',
    height: DeviceHeight * 0.3,
    alignSelf: 'center',
  },
  quoteStyle: {
    marginBottom: DeviceHeight * 0.08,
    color: Colors.GREY,
    fontSize: 22,
    fontWeight: '700',
    // width: DeviceWidth * 0.8,
    textAlign: 'center',
    alignSelf: 'center',
    lineHeight: 27,
  },
  signupView: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signinText: {
    color: Colors.GREY,
    fontSize: 15,
  },
});
export default Intro;
