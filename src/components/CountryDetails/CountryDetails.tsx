import { Text, View } from "react-native"
import styles from './styles'

interface CountryDetailsProps {
    leftKey: string,
    value: string
}

const CountryDetails: React.FC<CountryDetailsProps> = ({
    leftKey,
    value
}) => {
    return (
        <View style = {styles.viewCintainerStyle}>
            <Text style = {styles.keyStyle}>{leftKey} </Text>
            <Text> : </Text>
          <Text style = {styles.valueStyle}>{value}</Text>
        </View>
    )
}

export default CountryDetails;
