import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import React from 'react';
import {DeviceHeight, DeviceWidth} from '../Utilities/Config';
import {Colors} from '../Utilities/Colors';

const CustomButton = ({buttonText,onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.textStyle}>{buttonText}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    width: DeviceWidth * 0.85,
    alignSelf: 'center',
    paddingVertical: 9,
    backgroundColor: Colors.BUTTONCOLOR,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {},
      android: {
        elevation: 5,
        shadowColor: 'blue',
      },
    }),
  },
  textStyle: {
    color: '#000',
    fontSize: 20,
    fontWeight: '700',
  },
});
export default CustomButton;
