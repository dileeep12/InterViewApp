import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DeviceWidth} from '../Utilities/Config';

const Search = ({onSearch, theme}) => {
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme.inputBackground, borderColor: theme.border},
      ]}>
      <MaterialIcon name="magnify" color={theme.text} size={25} />
      <TextInput
        placeholder="Search..."
        placeholderTextColor={theme.placeholderText}
        cursorColor={theme.cursor}
        onChangeText={onSearch}
        style={[styles.input, {color: theme.text}]}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    width: DeviceWidth * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 12,
    marginVertical: 12,
    borderWidth: 1, // For light/dark theme border
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
});
