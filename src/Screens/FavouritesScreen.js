import React from 'react';
import {
  SafeAreaView,
  VirtualizedList,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setFav } from '../Redux/Actions';
import AppHeader from '../Components/AppHeader';
import { lightTheme, darkTheme } from '../Utilities/Themes';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const FavoritesScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  // Get favorites list from Redux state
  const favoriteItems = useSelector(state => state?.getFavourites || []);

  // Get current theme from Redux state
  const theme = useSelector(state => state?.theme || 'light');

  // Select the theme object based on the current theme
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  // Remove an item from favorites
  const removeFavorite = itemId => {
    const updatedFavorites = favoriteItems.filter(item => item.id !== itemId);
    dispatch(setFav(updatedFavorites));
    Alert.alert('Removed from Favorites', 'The item has been removed from your favorites.');
  };

  // VirtualizedList item count
  const getItemCount = () => favoriteItems.length;

  // Get item at a specific index
  const getItem = (data, index) => data[index];

  // Render each item
  const renderItem = ({ item }) => (
    <View style={[styles.itemContainer, { backgroundColor: currentTheme.inputBackground }]}>
      <Image source={{ uri: item?.image }} style={styles.itemImage} resizeMode="contain" />
      <View style={styles.itemDetails}>
        <Text style={[styles.itemTitle, { color: currentTheme.text }]}>{item?.title || 'No Title'}</Text>
        <Text style={[styles.itemPrice, { color: currentTheme.secondary }]}>₹{item?.price || '0.00'}</Text>
      </View>
      <TouchableOpacity onPress={() => removeFavorite(item.id)} style={styles.removeIcon}>
        <Icons name="trash-can-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <AppHeader backButton header={'Favourites'} />
      {favoriteItems.length > 0 ? (
        <VirtualizedList
          data={favoriteItems}
          initialNumToRender={10}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          getItemCount={getItemCount}
          getItem={getItem}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: currentTheme.text }]}>You have no items in your favorites!</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 12,
    fontWeight: '600',
  },
  removeIcon: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
