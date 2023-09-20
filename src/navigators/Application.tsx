import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigationContainerRef, } from '@react-navigation/native';
import { useTheme } from '../hooks';
import MainNavigator from './Main';
import { useFlipper } from '@react-navigation/devtools';
import { ApplicationStackParamList } from '../../@types/navigation';
import FavoriteCountryScreen from '@/screens/FavoriteCountryScreen/FavoriteCountryScreen';

const Stack = createStackNavigator<ApplicationStackParamList>();

// @refresh resetconst 
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme();
  const { colors } = NavigationTheme;
  const navigationRef = useNavigationContainerRef();
  useFlipper(navigationRef);
  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} /> 
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={MainNavigator} />
          <Stack.Screen name="FavoriteCountry" component={FavoriteCountryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>);
};


export default ApplicationNavigator;