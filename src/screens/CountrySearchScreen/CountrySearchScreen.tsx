import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SvgUri } from "react-native-svg";
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles'

import { fetchCountryData } from '../../services/CountryService'
import { useTheme } from "../../hooks";
import ThemeContext from "../../services/ThemeContext";

import CountryDataView from '@/components/CountryDetails/CountryDetails';
import { ApplicationScreenProps } from 'types/navigation';

const CountrySearchScreen = ({ navigation }: ApplicationScreenProps) => {
  const [countryName, setCountryName] = useState("");
  const [countryData, setCountryData] = useState<CountryData[] | null>(null);
  const [favoriteCountries, setFavoriteCountries] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { Images } = useTheme();
  const theme = useContext(ThemeContext);
  const isDark = (theme === 'dark');

  // Reset fields
  const clearSearch = () => {
    setCountryName("");
    setCountryData(null)
  };

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
        setFavoriteCountries(JSON.parse(storedFavoriteCountries))
      }
    } catch (error) {
      // handle error
    }
  };

  // To Fav & unFav countries
  const handleAddToFavorite = async () => {
    try {
      if (!countryData) {
        return;
      }
      const countryName = countryData[0].name.common.toLowerCase();
      const isCountryFavorite = favoriteCountries.includes(countryName);
      let updatedFavoriteCountries = [...favoriteCountries];
      if (isCountryFavorite) {
        // Remove the country from the favorite list
        updatedFavoriteCountries = updatedFavoriteCountries.filter(
          (country) => country !== countryName
        );
      } else {
        // Add the country to the favorite list
        updatedFavoriteCountries.push(countryName.toLowerCase());
      }
      setFavoriteCountries(updatedFavoriteCountries);

      // Store the updated favorite country list in storage
      await AsyncStorage.setItem(
        "favoriteCountries",
        JSON.stringify(updatedFavoriteCountries)
      );
    } catch (error) {
      // Handle error
    }
  };

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

   //To Store data to the async storage
  const storeData = async (key: string, data: any) => {
    try {
      await AsyncStorage.setItem(key.toLowerCase(), JSON.stringify(data));
    } catch (error) {
      // Handle error
    }
  };

  //API call to search based on country name
  const handleSearch = async () => {
    setCountryData(null);
    if (countryName !== "") {
      try {
        const cachedData = await retrieveData(countryName.toLocaleLowerCase());
        if (cachedData) {
          setCountryData(cachedData);
        } else {
          setIsLoading(true)
          const countryResponse = await await fetchCountryData(countryName);
          if (countryResponse !== undefined) {
            setIsLoading(false)
            setCountryData(countryResponse);
            await storeData(countryName, countryResponse);
          }
        }
      } catch (error: any) {
        setIsLoading(false)
        Alert.alert('Error', error.toString())
      }
    }
  }

  return (
    <SafeAreaView style={styles.containerStyle}>
      <View style={styles.headerView}>
        <View
          style={[
            styles.inputContainer,
            isDark && {
              backgroundColor: "rgba(255, 255, 255, 0)",
              borderColor: "rgba(255, 255, 255, 0.6)",
              borderWidth: 1,
            },
          ]}
        >
          <TextInput
            placeholder="Search Country by Country name"
            placeholderTextColor={"#999c9e"}
            style={[styles.textInput, isDark && { color: "white" }]}
            value={countryName}
            onChangeText={(countryName) => {
              setCountryName(countryName)
            }}
            onEndEditing={async () => {
              handleSearch()
            }}
            maxLength={100}
            autoCorrect={false}
          />
          {countryName !== "" && (
            <TouchableOpacity onPress={clearSearch}>
              <Image
                source={isDark ? Images.icons.closeDark : Images.icons.close}
                style={styles.closeIcon}
              />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={async () => {
          navigation.navigate('FavoriteCountry')
        }}>
          <Image source={Images.icons.favorite} style={styles.favIcon} />
        </TouchableOpacity>
      </View>

      {countryData && countryData?.length > 0 ?
        (<View style={[styles.cardStyle, isDark && { borderColor: "white" }]}>
          <View style={styles.cardHeaderStyle}>
            <View style={styles.flagContainer}>
              <SvgUri
                height="60" width="60"
                uri={countryData[0].flags.svg}
              />
            </View>
            <TouchableOpacity onPress={handleAddToFavorite}>
              <Image
                source={favoriteCountries.includes(countryData[0]?.name.common.toLowerCase() ?? "") ? Images.icons.fav : Images.icons.unFav}
                style={styles.favIcon}
              />
            </TouchableOpacity>
          </View>
          <CountryDataView countryData = {countryData[0]} />
        </View>) : (
          isLoading && (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color={isDark ? "white" : 'black'} />
            </View>
          )
        )
      }
    </SafeAreaView>
  );
}
export default CountrySearchScreen;
