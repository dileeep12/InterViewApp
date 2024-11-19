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
import {useRoute} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {setFav} from '../Redux/Actions';
import {lightTheme, darkTheme} from '../Utilities/Themes'; // Import the theme objects
import { DeviceHeight, DeviceWidth } from '../Utilities/Config';

const ProductDetails = () => {
  const route = useRoute();
  const {itemDetails} = route.params || {};
  const dispatch = useDispatch();

  // Get the current theme from Redux state
  const theme = useSelector(state => state?.theme || 'light');
  const getFavourites = useSelector(state => state?.getFavourites || []);

  // Check if the item is already in favorites
  const isFavorite = getFavourites.some(item => item.id === itemDetails?.id);

  // Function to toggle the favorite status
  const toggleFavorite = () => {
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = getFavourites.filter(
        item => item.id !== itemDetails?.id,
      );
      dispatch(setFav(updatedFavorites));
      Alert.alert(
        'Removed from Favorites',
        `${itemDetails?.title || 'This item'} has been removed from your favorites.`,
      );
    } else {
      updatedFavorites = [...getFavourites, itemDetails];
      dispatch(setFav(updatedFavorites));
      Alert.alert(
        'Added to Favorites',
        `${itemDetails?.title || 'This item'} has been added to your favorites.`,
      );
    }
  };

  // Select the theme object based on the current theme
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: currentTheme.background}]}>
      <AppHeader backButton header={'Favourites'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={[styles.favoriteIcon, {color: currentTheme.text}]}
          onPress={toggleFavorite}>
          <Icons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={30}
            color={isFavorite ? currentTheme.primary : currentTheme.text}
          />
        </TouchableOpacity>
        {itemDetails?.image && (
          <Image
            source={{uri: itemDetails?.image}}
            style={styles.imageStyle}
            resizeMode="contain"
          />
        )}
        <View style={[styles.bottomContainer, {backgroundColor: currentTheme.inputBackground}]}>
          <Text style={[styles.titleText, {color: currentTheme.text}]}>
            {itemDetails?.title || 'No Title Available'}
          </Text>
          <Text style={[styles.priceText, {color: currentTheme.text}]}>
            ₹{itemDetails?.price || '0.00'}
          </Text>
          <Text style={[styles.descriptionText, {color: currentTheme.placeholderText}]}>
            {itemDetails?.description || 'No Description Available'}
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
  },
  favoriteIcon: {
    position: 'absolute',
    right: 18,
    top: 10,
    zIndex: 1,
  },
  imageStyle: {
    height: DeviceHeight / 3,
    width: '80%',
    alignSelf: 'center',
  },
  bottomContainer: {
    width: DeviceWidth * 0.9,
    alignSelf: 'center',
    marginTop: 16,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: '400',
  },
});
