import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import { Colors } from '../Utilities/Colors';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { DeviceWidth } from '../Utilities/Config';
const Search = ({onSearch}) => {
  return (
    <View style={[styles.container]}>
     <MaterialIcon name="magnify" color={Colors.BLACK} size={25}/>
      <TextInput
        placeholder="Search..."
        placeholderTextColor={Colors.BLACK}
        cursorColor={Colors.GREY}
        onChangeText={onSearch}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.LIGHT_GREY,
    width: DeviceWidth * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 12,
    marginVertical:12
  },
});
