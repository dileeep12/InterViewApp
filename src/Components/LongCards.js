import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {DeviceHeight, DeviceWidth} from '../Utilities/Config';

const LongCards = ({item, onPress, theme}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {backgroundColor: theme.cardBackground, borderColor: theme.border},
      ]}
      onPress={onPress}>
      <Image
        source={{uri: item?.image}}
        style={styles.imageStyle}
        resizeMode="contain"
      />
      <View
        style={[styles.textContainer, {backgroundColor: theme.cardBackground}]}>
        <Text
          numberOfLines={1}
          style={[styles.productNameText, {color: theme.text}]}>
          {item?.title}
        </Text>
        <Text
          style={[styles.priceTextStyle, {color: theme.text}]}
          numberOfLines={1}>
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
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 12,
    borderWidth: 0.5,
  },
  imageStyle: {
    height: '80%',
    width: '100%',
  },
  priceTextStyle: {
    fontWeight: '700',
    fontSize: 15,
  },
  productNameText: {
    fontSize: 14,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
});
