import {View, Text, Image, StyleSheet, ToastAndroid} from 'react-native';
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
import {signupValidationSchema} from '../Components/ValidationSchema';
import axios from 'axios';
import {Strings} from '../Utilities/Strings';
import {useDispatch} from 'react-redux';
import {setUserData} from '../Redux/Actions';
import {useNavigation} from '@react-navigation/native';
const SignUp = ({moveToLogin}) => {
  const [checked, setChecked] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleCheck = () => {
    setChecked(prev => !prev);
  };
  const handleFormSubmit = async (values, actions) => {
    setLoader(true);
    try {
      const response = await axios.post(
        'https://tor.appdevelopers.mobi/api/register',
        {
          phone: values.phone,
          password: values.password,
          name: values.name,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      setLoader(false);
      if (response?.data?.message == 'Registration successful') {
        ToastAndroid.show(response?.data?.message, ToastAndroid.LONG);
        dispatch(setUserData(response?.data));
        navigation.navigate(Strings.ST6);
      } else {
        actions.resetForm();
        ToastAndroid.show(response?.data?.message, ToastAndroid.LONG);
      }
    } catch (error) {
      setLoader(false);
      ToastAndroid.show(
        'An error occurred. Please try again.',
        ToastAndroid.SHORT,
      );
    }
  };
  return (
    <View style={styles.container}>
      <Wrapper>
        <Image source={Images.logo} style={styles.logo} resizeMode="contain" />
        <Image
          source={Images.splashBottomRight}
          style={styles.imgStyle3}
          resizeMode="stretch"
        />
        <Text style={[styles.textIdStyle, {fontSize: 24}]}>SignUp</Text>
        <Text
          style={[
            styles.textIdStyle,
            {color: Colors.GREY, marginVertical: 16},
          ]}>
          {'Fill in the below form and add life to\n your car!'}
        </Text>
        <Formik
          validationSchema={signupValidationSchema}
          initialValues={{name: '', phone: '', password: ''}}
          onSubmit={(values, action) => {
            if (checked) {
              handleFormSubmit(values, action);
            } else {
              ToastAndroid.show(
                'Please accept terms & conditions',
                ToastAndroid.LONG,
              );
            }
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
              <Text style={styles.textIdStyle}>Name</Text>
              <TextInput
                mode="flat"
                activeUnderlineColor="transparent"
                underlineColor="transparent"
                textColor={'#000'}
                placeholderTextColor={Colors.GREY}
                cursorColor={Colors.GREY}
                placeholder="Enter your name"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                keyboardType="default"
                style={styles.textInputStyle}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <Icons
                        name="person-sharp"
                        color={Colors.GREY}
                        size={20}
                      />
                    )}
                  />
                }
              />
              {touched.name && errors.name && (
                <Text
                  style={{
                    fontSize: 12,
                    color: 'red',
                    alignSelf: 'center',
                  }}>
                  {errors.name}
                </Text>
              )}
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
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 12,
                }}>
                <MaterialIcon
                  name={checked ? 'checkbox-marked' : 'checkbox-blank-outline'}
                  size={25}
                  onPress={handleCheck}
                  color={Colors.GREY}
                />
                <Text style={{fontWeight: '500', color: '#000'}}>
                  {' '}
                  Agree with{' '}
                </Text>
                <Text
                  style={{
                    color: Colors.GREY,
                    textDecorationLine: 'underline',
                    fontWeight: '500',
                  }}>
                  Terms & Conditions
                </Text>
              </View>
              <CustomButton
                buttonText={'SignUp'}
                onPress={handleSubmit}
                loading={loader}
              />
            </>
          )}
        </Formik>
        <View
          style={{
            width: DeviceWidth * 0.85,
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 12,
            justifyContent: 'center',
          }}>
          <Text style={styles.signinText}>Already have an account?</Text>

          <Text
            style={[
              styles.signinText,
              {
                fontWeight: '700',
                textDecorationLine: 'underline',
                color: '#000',
              },
            ]}
            onPress={moveToLogin}>
            {' '}
            Signin
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
    height: DeviceHeight * 0.4,
    width: DeviceWidth * 0.7,
    position: 'absolute',
    right: 0,
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
});
export default SignUp;
