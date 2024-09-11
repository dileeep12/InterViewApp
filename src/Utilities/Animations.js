import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {DeviceWidth} from './Config';

const Animations = () => {
  const moveView1Offset = useSharedValue(-25);
  const fadeView1Offset = useSharedValue(0);
  const moveView2Offset = useSharedValue(-25);
  const fadeView2Offset = useSharedValue(0);
  const moveView3Offset = useSharedValue(-25);
  const fadeView3Offset = useSharedValue(0);
  const moveView4Offset = useSharedValue(-25);
  const fadeView4Offset = useSharedValue(0);
  const moveLoginOffset = useSharedValue(0);
  const moveSignUpOffset = useSharedValue(DeviceWidth);
  const triggerAnimation1 = () => {
    fadeView1Offset.value = withTiming(1, {duration: 500});
    moveView1Offset.value = withTiming(0, {duration: 500}, () =>
      runOnJS(triggerAnimation2)(),
    );
  };
  const triggerAnimation2 = () => {
    fadeView2Offset.value = withTiming(1, {duration: 500});
    moveView2Offset.value = withTiming(0, {duration: 500}, () =>
      runOnJS(triggerAnimation3)(),
    );
  };
  const triggerAnimation3 = () => {
    fadeView3Offset.value = withTiming(1, {duration: 500});
    moveView3Offset.value = withTiming(0, {duration: 500}, () =>
      runOnJS(triggerAnimation4)(),
    );
  };
  const triggerAnimation4 = () => {
    fadeView4Offset.value = withTiming(1, {duration: 500});
    moveView4Offset.value = withTiming(0, {duration: 500});
  };
  const moveLogin = () => {
    moveLoginOffset.value = withSpring(-DeviceWidth);
    moveSignUpOffset.value = withSpring(0);
  };
  const moveSignUp = () => {
    moveSignUpOffset.value = withSpring(DeviceWidth);
    moveLoginOffset.value = withSpring(0);
  };
  const animationStyle1 = useAnimatedStyle(() => ({
    opacity: fadeView1Offset.value,
    transform: [{translateY: moveView1Offset.value}],
  }));
  const animationStyle2 = useAnimatedStyle(() => ({
    opacity: fadeView2Offset.value,
    transform: [{translateY: moveView2Offset.value}],
  }));
  const animationStyle3 = useAnimatedStyle(() => ({
    opacity: fadeView3Offset.value,
    transform: [{translateY: moveView3Offset.value}],
  }));
  const animationStyle4 = useAnimatedStyle(() => ({
    opacity: fadeView4Offset.value,
    transform: [{translateY: moveView4Offset.value}],
  }));
  const loginAnimationStyle = useAnimatedStyle(() => ({
    transform: [{translateX: moveLoginOffset.value}],
  }));
  const SignAnimationStyle = useAnimatedStyle(() => ({
    transform: [{translateX: moveSignUpOffset.value}],
  }));
  return {
    animationStyle1,
    animationStyle2,
    animationStyle3,
    animationStyle4,
    loginAnimationStyle,
    SignAnimationStyle,
    triggerAnimation1,
    moveLogin,
    moveSignUp
  };
};
export default Animations;
