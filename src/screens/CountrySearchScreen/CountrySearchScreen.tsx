/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SvgUri } from "react-native-svg";
import styles from './styles'
import { fetchCountryData } from '../../services/CountryService'
import CountryDetails from '@/components/CountryDetails/CountryDetails';
import { useTheme } from "../../hooks";
import ThemeContext from "../../services/ThemeContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApplicationScreenProps } from 'types/navigation';

interface FlagData {
  png: string;
  svg: string;
  alt: string;
}

interface NameData {
  common: string;
  official: string;
  nativeName: {
    [key: string]: {
      official: string;
      common: string;
    };
  };
}

interface CurrencyData {
  name: string;
  symbol: string;
}

interface LanguageData {
  [key: string]: string;
}

interface CountryData {
  flags: FlagData;
  name: NameData;
  currencies: {
    [key: string]: CurrencyData;
  };
  capital: string[];
  languages: LanguageData;
  area: number;
  population: number;
  timezones: string[];
}

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


  const handleAddToFavorite = async () => {
    try {
      if (!countryData) {
        return;
      }
      const countryName = countryData[0].name.common;
      const isCountryFavorite = favoriteCountries.includes(countryName);
      let updatedFavoriteCountries = [...favoriteCountries];
      if (isCountryFavorite) {
        // Remove the country from the favorite list
        updatedFavoriteCountries = updatedFavoriteCountries.filter(
          (country) => country !== countryName
        );
      } else {
        // Add the country to the favorite list
        updatedFavoriteCountries.push(countryName);
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

  const retrieveData = async (key: string) => {
    try {
      const data = await AsyncStorage.getItem(key);
      return data != null ? JSON.parse(data) : null;
    } catch (error) {
      // Handle error
      return null;
    }
  };

  const storeData = async (key: string, data: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      // Handle error
    }
  };

  const handleSearch = async () => {
    setCountryData(null);
    if (countryName !== "") {
      try {
        const cachedData = await retrieveData(countryName);
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
    <View style={styles.containerStyle}>
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
                source={favoriteCountries.includes(countryData[0]?.name.common ?? "") ? Images.icons.fav : Images.icons.unFav}
                style={styles.favIcon}
              />
            </TouchableOpacity>
          </View>
          <CountryDetails leftKey="Country" value={countryData[0]?.name.common ?? ""}></CountryDetails>
          <CountryDetails leftKey="Capital" value={countryData[0]?.capital.map(item => item).join(', ') ?? ""}></CountryDetails>
          <CountryDetails leftKey="Population" value={countryData[0].population.toString()}></CountryDetails>
          <CountryDetails leftKey="Currency" value={countryData[0].currencies[Object.keys(countryData[0].currencies)[0]].name + " (" + countryData[0].currencies[Object.keys(countryData[0].currencies)[0]].symbol + ")"} ></CountryDetails>
          <CountryDetails leftKey="TimeZone" value={countryData[0].timezones.map(item => item).join(', ') ?? ""}></CountryDetails>
          <CountryDetails leftKey="Area" value={countryData[0].area.toString()}></CountryDetails>
          <CountryDetails leftKey="Languages Spoken" value={Object.values(countryData[0].languages).join(", ")}></CountryDetails>
        </View>) : (
          <View>
            {isLoading && (
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="green" />
              </View>
            )}
          </View>
        )
      }
    </View>
  );
}
export default CountrySearchScreen;
