import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  VirtualizedList,
  ToastAndroid,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  apiCall,
  DeviceHeight,
  DeviceWidth,
  endPoinsts,
} from '../Utilities/Config';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {lightTheme, darkTheme} from '../Utilities/Themes'; 
import LongCards from '../Components/LongCards';
import Search from '../Components/Search';
import CustomButton from '../Components/CustomButton';
import { toggleTheme } from '../Redux/Actions';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Access current theme state from Redux
  const themeState = useSelector(state => state?.theme);
  const theme = themeState === 'light' ? lightTheme : darkTheme;

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch product data
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await apiCall({
        url: endPoinsts.getAllData,
        method: 'GET',
      });
      if (!response?.error) {
        setAllProducts(response);
        setFilteredProducts(response);
      } else {
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = query => {
    const filtered = allProducts.filter(item =>
      item?.title?.toLowerCase().includes(query?.toLowerCase()),
    );
    setFilteredProducts(filtered);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchData();
    setIsRefreshing(false);
  };

  // Toggle the theme and update Redux state
  const changeTheme = () => {
    const newTheme = themeState === 'light' ? 'dark' : 'light';
    console.log("newThme",newTheme,themeState)
    dispatch(toggleTheme(newTheme));
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
      {/* Header with Theme Toggle Button */}
      <View style={[styles.header, {backgroundColor: theme.primary}]}>
        <TouchableOpacity
          style={[styles.toggleButton, {backgroundColor: theme.secondary}]}
          onPress={()=>changeTheme()}>
          <Text style={[styles.toggleText, {color: theme.text}]}>
            {themeState === 'light' ? 'Dark Mode' : 'Light Mode'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{width: DeviceWidth * 0.95, alignSelf: 'center'}}>
        <Search onSearch={handleSearch} theme={theme} />

        {isLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={theme.primary} />
          </View>
        ) : (
          <VirtualizedList
            data={filteredProducts}
            contentContainerStyle={{paddingBottom: DeviceHeight * 0.15}}
            initialNumToRender={5}
            renderItem={({item, index}) =>
              index % 2 === 0 && (
                <View style={styles.row}>
                  <LongCards
                    item={item}
                    theme={theme}
                    onPress={() =>
                      navigation.navigate('ProductDetails', {itemDetails: item})
                    }
                  />
                  {filteredProducts[index + 1] && (
                    <LongCards
                      item={filteredProducts[index + 1]}
                      theme={theme}
                      onPress={() =>
                        navigation.navigate('ProductDetails', {
                          itemDetails: filteredProducts[index + 1],
                        })
                      }
                    />
                  )}
                </View>
              )
            }
            keyExtractor={(item, index) => index.toString()}
            getItem={(data, index) => data[index]}
            getItemCount={data => data?.length || 0}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                colors={[theme.primary]}
              />
            }
          />
        )}
      </View>
      <View style={{position: 'absolute', alignSelf: 'center', bottom: 20}}>
        <CustomButton
          buttonText={'See Favourites'}
          onPress={() => navigation.navigate('FavouritesScreen')}
          buttonStyle={{backgroundColor: theme.primary}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  toggleButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
