import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import Wrapper from '../Components/Wrapper';
import {Images} from '../Utilities/Images';
import {DeviceHeight, DeviceWidth} from '../Utilities/Config';
import Animated from 'react-native-reanimated';
import {Strings} from '../Utilities/Strings';
import {Colors} from '../Utilities/Colors';
import CustomButton from '../Components/CustomButton';

const Intro = () => {
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
        <Animated.View style={{top: -DeviceHeight * 0.05}}>
          <Image
            source={Images.logo}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>
        <Animated.Text style={styles.quoteStyle}>{Strings.ST4}</Animated.Text>
        <CustomButton buttonText={Strings.ST5}/>
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
    color: Colors.GREY,
    fontSize: 23,
    fontWeight: '700',
    // width: DeviceWidth * 0.8,
    textAlign: 'center',
    alignSelf: 'center',
    lineHeight: 27,
  },
});
export default Intro;
