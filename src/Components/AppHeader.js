import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Search from './Search';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { DeviceWidth } from '../Utilities/Config';
import { Colors } from '../Utilities/Colors';
const AppHeader = ({backButton, header,search}) => {
  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.container,
      ]}>
      {backButton && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position:'absolute',
            left: search ? 0 : 18,
          }}>
         <MaterialIcon name="chevron-left-circle" color={Colors.BLACK} size={40}/>
        </TouchableOpacity>
      )}
       <Text style={styles.headerText}>{header ?? ''}</Text>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    width: DeviceWidth,
    backgroundColor: Colors.WHITE,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent:'center',
    flexDirection: 'row',
    paddingVertical: 18,
    paddingHorizontal: 18,
  },
  icon: {
    height: 35,
    width: 35,
  },
  headerText: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: Colors.BLACK,
  },
});
