import { Text, View } from "react-native"

import styles from './styles'

interface CountryDetailsProps {
  leftKey: string,
  value: string
}

interface CountryDataViewsProps {
  countryData: CountryData
}

const CountryDataView: React.FC<CountryDataViewsProps> = ({
  countryData,
}) => {
  return (
    <View>
      <CountryDetails leftKey="Country" value={countryData?.name.common ?? ""}></CountryDetails>
      <CountryDetails leftKey="Capital" value={countryData?.capital.map(item => item).join(', ') ?? ""}></CountryDetails>
      <CountryDetails leftKey="Population" value={countryData.population.toString()}></CountryDetails>
      <CountryDetails leftKey="Currency" value={countryData.currencies[Object.keys(countryData.currencies)[0]].name + " (" + countryData.currencies[Object.keys(countryData.currencies)[0]].symbol + ")"} ></CountryDetails>
      <CountryDetails leftKey="TimeZone" value={countryData.timezones.map(item => item).join(', ') ?? ""}></CountryDetails>
      <CountryDetails leftKey="Area" value={countryData.area.toString()}></CountryDetails>
      <CountryDetails leftKey="Languages Spoken" value={Object.values(countryData.languages).join(", ")}></CountryDetails>
    </View>
  )
}

const CountryDetails: React.FC<CountryDetailsProps> = ({
  leftKey,
  value
}) => {
  return (
    <View style={styles.viewCintainerStyle}>
      <Text style={styles.keyStyle}>{leftKey} </Text>
      <Text> : </Text>
      <Text style={styles.valueStyle}>{value}</Text>
    </View>
  )
}

export default CountryDataView;
