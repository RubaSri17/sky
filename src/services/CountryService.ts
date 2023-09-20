import axios from 'axios';

export const fetchCountryData = async (countryName: string) => {
  try {
    console.log("countryName", countryName)
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${countryName}?fullText=true&fields=name,capital,currencies,flags,languages,area,population,timezones`,
    );
    console.log("????", response)
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`Error: ${response.statusText}`);
    }
  } catch (error: any) {
    throw new Error(error.toString()); 
  }
};
