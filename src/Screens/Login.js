import {
  View,
  Text,
  Image,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Wrapper from '../Components/Wrapper';
import {Images} from '../Utilities/Images';
import {DeviceHeight, DeviceWidth} from '../Utilities/Config';
import {TextInput} from 'react-native-paper';
import {Colors} from '../Utilities/Colors';
import Icons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../Components/CustomButton';
import {Formik} from 'formik';
import {
  loginValidationSchema,
  signupValidationSchema,
} from '../Components/ValidationSchema';
import axios from 'axios';
import {Strings} from '../Utilities/Strings';
import {useDispatch} from 'react-redux';
import {setUserData} from '../Redux/Actions';
import {useNavigation} from '@react-navigation/native';
const Login = ({moveToSign}) => {
  const [checked, setChecked] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleCheck = () => {
    setChecked(prev => !prev);
  };
  const handleFormSubmit = async (values, actions) => {
    try {
      const response = await axios.post(
        'https://tor.appdevelopers.mobi/api/login',
        {
          phone: values.phone,
          password: values.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response?.data?.status) {
        ToastAndroid.show(response?.data?.message, ToastAndroid.LONG);
        dispatch(setUserData(response?.data));
        navigation.navigate(Strings.ST6);
      } else {
        actions.resetForm();
        ToastAndroid.show(response?.data?.message, ToastAndroid.LONG);
      }
    } catch (error) {
      console.error(error);
      ToastAndroid.show(
        'An error occurred. Please try again.',
        ToastAndroid.SHORT,
      );
    }
  };
  return (
    <View style={styles.container}>
      <Wrapper>
        <Image
          source={Images.logo}
          style={[styles.logo]}
          resizeMode="contain"
        />
        <Image
          source={Images.leftBottom}
          style={styles.imgStyle3}
          resizeMode="stretch"
        />
        <Text style={[styles.textIdStyle, {fontSize: 24}]}>Sign In</Text>
        <Text
          style={[
            styles.textIdStyle,
            {color: Colors.GREY, marginVertical: 16},
          ]}>
          {'Hi ! Welcome back, you\nhave been missed '}
        </Text>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{phone: '', password: ''}}
          onSubmit={(values, action) => {
            handleFormSubmit(values, action);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
            touched,
          }) => (
            <>
              <Text style={styles.textIdStyle}>Phone</Text>
              <TextInput
                mode="flat"
                activeUnderlineColor="transparent"
                underlineColor="transparent"
                textColor={'#000'}
                placeholderTextColor={Colors.GREY}
                cursorColor={Colors.GREY}
                placeholder="123456"
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
                keyboardType="phone-pad"
                style={styles.textInputStyle}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <MaterialIcon
                        name="phone"
                        color={Colors.GREY}
                        size={20}
                      />
                    )}
                  />
                }
              />
              {touched.phone && errors.phone && (
                <Text
                  style={{
                    fontSize: 12,
                    color: 'red',
                    alignSelf: 'center',
                  }}>
                  {errors.phone}
                </Text>
              )}
              <Text style={styles.textIdStyle}>Password</Text>
              <TextInput
                mode="flat"
                activeUnderlineColor="transparent"
                underlineColor="transparent"
                secureTextEntry={securePassword} // use securePassword here
                textColor={'#000'}
                placeholderTextColor={Colors.GREY}
                cursorColor={Colors.GREY}
                placeholder="password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                keyboardType="default"
                style={styles.textInputStyle}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <Icons
                        name="lock-closed-outline"
                        color={Colors.GREY}
                        size={20}
                      />
                    )}
                  />
                }
                right={
                  <TextInput.Icon
                    icon={() => (
                      <MaterialIcon
                        name={securePassword ? 'eye-off' : 'eye-outline'}
                        color={Colors.GREY}
                        size={20}
                        onPress={() => setSecurePassword(prev => !prev)} // toggle visibility
                      />
                    )}
                  />
                }
              />

              {touched.password && errors.password && (
                <Text
                  style={{
                    fontSize: 12,
                    color: 'red',
                    alignSelf: 'center',
                  }}>
                  {errors.password}
                </Text>
              )}

              <View
                style={{
                  width: DeviceWidth * 0.85,
                  alignSelf: 'center',
                  alignItems: 'flex-end',
                  marginBottom: 12,
                }}>
                <Text
                  style={{
                    color: '#000',
                    textDecorationLine: 'underline',
                    fontWeight: '500',
                  }}>
                  Forget password ?
                </Text>
              </View>
              <CustomButton buttonText={'Sign In'} onPress={handleSubmit} />
            </>
          )}
        </Formik>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: DeviceWidth * 0.85,
            alignSelf: 'center',
            marginTop: 18,
          }}>
          <View style={styles.line} />
          <Text style={styles.text}>or</Text>
          <View style={styles.line} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <TouchableOpacity
            style={{
              height: 45,
              width: 45,
              borderRadius: 45 / 2,
              borderWidth: 1.5,
              borderColor: Colors.BUTTONCOLOR,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialIcon name="google" color="#000" size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 45,
              width: 45,
              borderRadius: 45 / 2,
              borderWidth: 1.5,
              borderColor: Colors.BUTTONCOLOR,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            <MaterialIcon name="apple" color="#000" size={25} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: DeviceWidth * 0.85,
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 12,
            justifyContent: 'center',
          }}>
          <Text style={styles.signinText}>Don't have an account?</Text>
          <Text
            style={[
              styles.signinText,
              {
                fontWeight: '700',
                textDecorationLine: 'underline',
                color: '#000',
              },
            ]}
            onPress={moveToSign}>
            {' '}
            Sign Up
          </Text>
        </View>
        <Text
          style={[
            styles.signinText,
            {
              width: DeviceWidth * 0.85,
              alignSelf: 'center',
              textAlign: 'center',
            },
          ]}>
          By login or sign up, you agree to our terms of use and privacy policy
        </Text>
      </Wrapper>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: DeviceWidth * 0.8,
    height: DeviceHeight * 0.18,
    alignSelf: 'center',
  },
  imgStyle3: {
    height: DeviceHeight * 0.2,
    width: DeviceWidth * 0.6,
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  textInputStyle: {
    backgroundColor: '#fff',
    width: DeviceWidth * 0.85,
    alignSelf: 'center',
    borderWidth: 1,
    marginVertical: 12,
    borderRadius: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderColor: Colors.GREY,
    height: 50,
  },
  textIdStyle: {
    color: '#000',
    fontWeight: '700',
    fontSize: 15,
    width: DeviceWidth * 0.85,
    alignSelf: 'center',
  },
  signinText: {
    color: Colors.GREY,
    fontSize: 15,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.BUTTONBORDERCOLOR,
  },
  text: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#000',
  },
});
export default Login;
