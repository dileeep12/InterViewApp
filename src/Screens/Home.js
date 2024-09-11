import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Images} from '../Utilities/Images';
import {DeviceHeight, DeviceWidth} from '../Utilities/Config';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '../Components/CustomButton';
import { setLogout } from '../Redux/Actions';
import { useNavigation } from '@react-navigation/native';
import { Strings } from '../Utilities/Strings';

const Home = () => {
  const getUserData = useSelector(state => state?.getUserData);
  const dispatch=useDispatch();
  const navigation=useNavigation()
  console.log(getUserData);
  return (
    <View style={styles.container}>
      <Image
        source={Images.logo}
        style={{
          height: DeviceHeight * 0.3,
          width: DeviceWidth * 0.7,
          marginVertical: 20,
        }}
        resizeMode="contain"
      />
      <Text style={styles.textStyle}>
        {`Welcome ${getUserData?.data?.name}`}
      </Text>
      <CustomButton buttonText={'Logout'} onPress={()=>{
        dispatch(setLogout())
        navigation.navigate(Strings.ST2)
      }}/>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textStyle: {
    color: '#000',
    fontSize: 25,
    fontWeight: '700',
    textTransform: 'capitalize',
    marginBottom:DeviceHeight*0.1
  },
});
export default Home;
