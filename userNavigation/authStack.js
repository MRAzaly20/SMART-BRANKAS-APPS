import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../signin/userSignin';
import SignupScreen from '../signin/userSignup';

const Stack = createStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Signup' component={SignupScreen} />
    </Stack.Navigator>
  );
}