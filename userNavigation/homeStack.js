import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../signin/welcomeScreen';

const Stack = createStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='Home' component={HomeScreen} />
    </Stack.Navigator>
  );
}