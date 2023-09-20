
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        paddingTop: 8,
        paddingLeft: 16,
        paddingRight: 16,
    },
    cardStyle: {
        flexDirection: 'column',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,
        margin: 16,
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 16
    },
    noDataFound: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headingStyle: {
        paddingTop: 8,
        paddingBottom: 8,
        fontSize: 16,
        fontWeight: '800',
        color: '#6e6178',
    },
    cardHeaderStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      },
      flagContainer: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
      },
})
export default styles;
