import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert,
  } from 'react-native';
  import React from 'react';
  import AppHeader from '../Components/AppHeader';
  import {Colors} from '../Utilities/Colors';
  import {DeviceHeight, DeviceWidth} from '../Utilities/Config';
  import {useRoute} from '@react-navigation/native';
  import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
  import {useSelector, useDispatch} from 'react-redux';
  import { setFav } from '../Redux/Actions'; // Assuming you have a setFav action
  
  const ProductDetails = () => {
    const routes = useRoute();
    const {itemDetails} = routes.params;
    const dispatch = useDispatch();
  
    // Get favorites list from Redux state
    const {getFavourites} = useSelector(state => state);
  
    // Check if the item is already in favorites
    const isFavorite = getFavourites?.some(item => item.id === itemDetails.id);
  
    // Function to toggle the favorite status
    const toggleFavorite = () => {
      let updatedFavorites;
  
      if (isFavorite) {
        // Remove item from favorites if it's already there
        updatedFavorites = getFavourites.filter(item => item.id !== itemDetails.id);
        dispatch(setFav(updatedFavorites));  // Dispatch the updated list to Redux
        Alert.alert(
          'Removed from Favorites',
          `${itemDetails?.title} has been removed from your favorites.`
        );
      } else {
        // Add item to favorites if it's not there
        updatedFavorites = [...getFavourites, itemDetails];
        dispatch(setFav(updatedFavorites));  // Dispatch the updated list to Redux
        Alert.alert(
          'Added to Favorites',
          `${itemDetails?.title} has been added to your favorites.`
        );
      }
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <AppHeader backButton />
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={{position: 'absolute', right: 18, top: 10}}
            onPress={toggleFavorite}>
            <Icons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={30}
              color={isFavorite ? Colors.RED : Colors.BLACK}
            />
          </TouchableOpacity>
          <Image
            source={{uri: itemDetails?.image}}
            style={styles.imageStyle}
            resizeMode="contain"
          />
          <View style={styles.bottomContainer}>
            <Text style={{fontSize: 16, fontWeight: '700', color: Colors.BLACK}}>
              {itemDetails?.title}
            </Text>
            <Text style={{color: Colors.BLACK, fontWeight: '600'}}>
              ₹{itemDetails?.price}
            </Text>
            <Text style={{color: Colors.GREY, fontWeight: '600'}}>
              {itemDetails?.description}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default ProductDetails;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.WHITE,
    },
    imageStyle: {height: DeviceHeight / 3, width: '80%', alignSelf: 'center'},
    bottomContainer: {
      width: DeviceWidth * 0.9,
      alignSelf: 'center',
      marginTop: 8,
    },
  });
  