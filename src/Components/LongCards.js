import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {localImages} from '../Utilities/Images';
import { Colors } from '../Utilities/Colors';
import { DeviceHeight, DeviceWidth } from '../Utilities/Config';
const LongCards = ({item,onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{uri:item?.image}}
        style={{height: '80%', width: '100%'}}
        resizeMode='contain'
      />
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.productNameText}>
          {item?.title}
        </Text>
        <Text style={styles.priceTextStyle} numberOfLines={1}>
          ₹{item?.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default LongCards;

const styles = StyleSheet.create({
  container: {
    width: DeviceWidth / 2.3,
    height: DeviceHeight / 3,
    backgroundColor: Colors.LIGHT_GREY,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight:12,
    borderWidth:0.5
  },
  priceTextStyle: {
    color: Colors.BLACK,
    fontWeight: '700',
    fontSize: 15,
  },
  productNameText: {
    color: Colors.BLACK,
  },
  textContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
});
