import { Platform, StatusBar, StyleSheet } from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  statusBar: {
    height: STATUSBAR_HEIGHT
  },
  headerView: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
    width: '90%',
    height: 40,
    backgroundColor: 'white',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  favIcon: {
    height: 30,
    width: 30,
  },
  closeIcon: {
    height: 16,
    width: 16,
  },
  searchIcon: {
    padding: 10,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  flagContainer: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    paddingTop: 50
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
  cardHeaderStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default styles;