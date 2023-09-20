import React from 'react';
import { CountrySearchScreen } from '../screens';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// @refresh reset
const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={CountrySearchScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
