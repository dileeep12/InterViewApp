import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import Wrapper from '../Components/Wrapper';
import {Images} from '../Utilities/Images';
import {DeviceHeight, DeviceWidth} from '../Utilities/Config';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Strings } from '../Utilities/Strings';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    logoOffset.value = withSpring(0, {stiffness: 150});
    setTimeout(()=>{navigation.navigate(Strings.ST3)},3000)
  }, []);
  const logoOffset = useSharedValue(-DeviceHeight);
  const moveLogo = useAnimatedStyle(() => ({
    transform: [{translateY: logoOffset.value}],
  }));
  return (
    <View style={styles.container}>
      <Wrapper style={{}}>
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
        <Image
          source={Images.splashBottomRight}
          style={styles.imgStyle3}
          resizeMode="stretch"
        />
        <Animated.View style={moveLogo}>
          <Image
            source={Images.logo}
            style={styles.logo}
            resizeMode="contain"
          />
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
    width: DeviceWidth * 0.6,
    height: DeviceHeight * 0.4,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  imgStyle2: {
    height: DeviceHeight * 0.3,
    width: DeviceWidth * 0.5,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  imgStyle3: {
    height: DeviceHeight * 0.4,
    width: DeviceWidth * 0.7,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  logo: {
    width: '100%',
    alignSelf: 'center',
  },
});
export default SplashScreen;
