import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../home';
import Settings from '../settings';
import Profile from '../profile';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
    return <Home />;
};

const SettingsScreen = () => {
    return <Settings />;
};

const ProfileScreen = () => {
    return <Profile />;
}
const App = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    );
  };