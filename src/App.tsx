import React from 'react';
import { useColorScheme, StatusBar } from 'react-native';
import ApplicationNavigator from './navigators/Application';
import { Provider } from 'react-redux';
import { store } from './store'
import ThemeContext from './services/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={theme}>
      <ApplicationNavigator />
      </ThemeContext.Provider>
    </Provider>
  )
}

export default App;
