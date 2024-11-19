import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  VirtualizedList,
  ToastAndroid,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { apiCall, DeviceHeight, DeviceWidth, endPoinsts } from '../Utilities/Config';
import { useNavigation } from '@react-navigation/native';
import LongCards from '../Components/LongCards';
import Search from '../Components/Search';
import { Colors } from '../Utilities/Colors';

const Home = () => {
  const navigation = useNavigation();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true); // Show loader
      const response = await apiCall({ url: endPoinsts.getAllData, method: 'GET' });
      if (!response?.error) {
        setAllProducts(response);
        setFilteredProducts(response);
      } else {
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    } finally {
      setIsLoading(false); // Hide loader
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (query) => {
    const filtered = allProducts.filter((item) =>
      item?.title?.toLowerCase().includes(query?.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchData();
    setIsRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: DeviceWidth * 0.95, alignSelf: 'center' }}>
        <Search onSearch={handleSearch} />

        {isLoading ? (
          // Show loader when data is loading
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={Colors.PRIMARY} />
          </View>
        ) : (
          <VirtualizedList
            data={filteredProducts}
            contentContainerStyle={{ paddingBottom: DeviceHeight * 0.15 }}
            initialNumToRender={5}
            renderItem={({ item, index }) =>
              index % 2 === 0 && (
                <View style={styles.row}>
                  <LongCards
                    item={item}
                    onPress={() =>
                      navigation.navigate('ProductDetails', { itemDetails: item })
                    }
                  />
                  {filteredProducts[index + 1] && (
                    <LongCards
                      item={filteredProducts[index + 1]}
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
            getItemCount={(data) => data?.length || 0}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                colors={[Colors.BLACK]}
              />
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
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
