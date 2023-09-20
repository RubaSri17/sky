import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SvgUri } from "react-native-svg";

import styles from "./styles";

import ThemeContext from "@/services/ThemeContext";
import CountryDataView from '@/components/CountryDetails/CountryDetails';

const FavoriteCountryScreen = () => {
  const [countryData, setCountryData] = useState<CountryData[]>([]);
  const theme = useContext(ThemeContext);
  const isDark = (theme === 'dark');

  useEffect(() => {
    retrieveFavoriteCountries()
  }, [])

  // Retrieve favorite country list from local cache
  const retrieveFavoriteCountries = async () => {
    try {
      const storedFavoriteCountries = await AsyncStorage.getItem(
        "favoriteCountries"
      );
      if (storedFavoriteCountries) {
        getCountryDetailsFromStore(JSON.parse(storedFavoriteCountries))
      }
    } catch (error) {
      // handle error
    }
  };

  // Retrieve country list from local cache
  const getCountryDetailsFromStore = async (favoriteCountries: [string]) => {
    try {
      favoriteCountries.map(async (country) => {
        const cachedData = await retrieveData(country);
        if (cachedData != null) {
          setCountryData(countryData => [...countryData, cachedData[0]])
        }
      })
    } catch (e: any) {
      // handle error
    }
  }

  //To Retrive data from the async storage
  const retrieveData = async (key: string) => {
    try {
      const data = await AsyncStorage.getItem(key);
      return data != null ? JSON.parse(data) : null;
    } catch (error) {
      // Handle error
      return null;
    }
  };

  //Returns Favourite List UI
  const renderItem = ({ item }: { item: CountryData }) => (
    <View style={[styles.cardStyle, isDark && { borderColor: "white" }]}>
      <View style={styles.cardHeaderStyle}>
        <View style={styles.flagContainer}>
          <SvgUri
            height="60" width="60"
            uri={item.flags.svg}
          />
        </View>
      </View>
      <CountryDataView countryData={item} />
    </View>
  )

  //Returns Empty List UI
  const emptyView = () => {
    return (
      <View style={styles.noDataFound}>
        <Text style={styles.noDataFoundTextStyle} >
          No favorite countries found
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.headingStyle}>Favorite countries</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        data={countryData}
        renderItem={renderItem}
        extraData={countryData}
        ListEmptyComponent={emptyView()}
      />
    </View>
  )
}

export default FavoriteCountryScreen;