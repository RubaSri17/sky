import CountryDetails from "@/components/CountryDetails/CountryDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import styles from "./styles";
import ThemeContext from "@/services/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgUri } from "react-native-svg";

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

    const getCountryDetailsFromStore = async (favoriteCountries: [string]) => {
        try {
            favoriteCountries.map(async (country) => {
                const cachedData = await retrieveData(country);
                console.log(cachedData)
                if (cachedData != null) {
                    setCountryData(countryData => [...countryData, cachedData[0]])
                }
            })
        } catch (e: any) {
            console.log(e.toString())
        }
    }

    const retrieveData = async (key: string) => {
        try {
            const data = await AsyncStorage.getItem(key);
            return data != null ? JSON.parse(data) : null;
        } catch (error) {
            // Handle error
            return null;
        }
    };


    const renderItem = ({ item }: { item: CountryData }) => (
        <View style={[styles.cardStyle, isDark && { borderColor: "white" }]}>
					<View style={styles.cardHeaderStyle}>
            <View style={styles.flagContainer}>
              <SvgUri
                height="60" width="60"
                uri={item.flags.svg}
              />
            </View>
            {/* <TouchableOpacity onPress={handleAddToFavorite}>
              <Image
                source={favoriteCountries.includes(countryData[0]?.name.common ?? "") ? Images.icons.fav : Images.icons.unFav}
                style={styles.favIcon}
              />
            </TouchableOpacity> */}
          </View>
            <CountryDetails leftKey="Country" value={item?.name?.common ?? ""}></CountryDetails>
            <CountryDetails leftKey="Capital" value={item?.capital?.map(item => item).join(', ') ?? ""}></CountryDetails>
            <CountryDetails leftKey="Population" value={item?.population?.toString()}></CountryDetails>
            <CountryDetails leftKey="Currency" value={item?.currencies[Object.keys(item.currencies)[0]].name + " (" + item?.currencies[Object.keys(item?.currencies)[0]].symbol + ")"} ></CountryDetails>
            <CountryDetails leftKey="TimeZone" value={item?.timezones?.map(item => item).join(', ') ?? ""}></CountryDetails>
            <CountryDetails leftKey="Area" value={item?.area?.toString()}></CountryDetails>
            <CountryDetails leftKey="Languages Spoken" value={Object.values(item?.languages).join(", ")}></CountryDetails>
        </View>
    )

    const emptyView = () => {
        return (
            <View style={styles.noDataFound}>
                <Text>
                    No favorite countries found
                </Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.containerStyle}>
            <View >
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
        </SafeAreaView>

    )
}

export default FavoriteCountryScreen;