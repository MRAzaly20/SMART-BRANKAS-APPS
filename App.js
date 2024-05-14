import { useRef, useEffect, useState } from 'react';
import { Button, View, Animated, Easing, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { IconComponentProvider, Icon, IconButton, HStack } from '@react-native-material/core';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
//import { Animated } from 'react-native-reanimated';
import * as styles from './ui_app/ui';
import { WebView } from 'react-native-webview';
import LottieView from 'lottie-react-native';
import { AnimationProvider, useAnimation } from './AnimationContext';
import { Settings } from './settings';
import {FaceId} from './items/FaceId';
import {DataBase} from './items/FaceDatabase';
import {CCTV} from './items/Streaming';
//import Routes from './userNavigation'
//import { UserRootNavigator } from './userNavigation/RootNavigator';
import { LoginScreen } from './signin/userSignin'
import { Start } from './items/AuthFinger';
import { Tracker } from './SIMTracker';

const image = { uri: 'https://wallpapercave.com/wp/wp4791757.jpg' };

function HomeScreen({ navigation }) {

  const animationProgress = useRef(new Animated.Value(0));
  const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);
  const { setAnimationComplete } = useAnimation();

  const animation = useRef(null);
  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    Animated.loop(
      Animated.timing(animationProgress.current, {
        toValue: 1,
        duration: 2500,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  }, []);
  setTimeout(() => {
    navigation.navigate('Setting')
    setAnimationComplete(true);
  }, 5000);

  return (
    <View style={{ flex: 1 }}>
      {/* <Button
        style={{position: 'relative', left: 0, top: 100}}
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      /> */}
      <AnimatedLottieView
        // autoPlay
        loop
        style={{ width: 100, height: 100, position: 'relative', left: 250, top: 180 }}
        source={require("./assets/padlock.json")}
        progress={animationProgress.current}
      />
      <AnimatedLottieView
        // autoPlay
        loop
        style={{ width: 430, height: 500, position: 'relative', right: 50 }}
        source={require("./assets/Secure.json")}
        progress={animationProgress.current}
      />

    </View>
  );
}

function ProfileScreen({ navigation }) {
  const animation = useRef(null);
  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    //animation.current?.play();
  }, []);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Notifications"
        onPress={() => navigation.navigate('Notifications')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 400,
          height: 400,
          backgroundColor: '#eee',
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('./assets/Scr.json')}
      />
      <Button
        title="Restart Animation"
        onPress={() => {
          animation.current?.reset();
          animation.current?.play();
        }}
      />
    </View>
  );
}

function Routers({ navigation }) {
  return (
    <View>
      <LoginScreen></LoginScreen>
    </View>
  );
}
const Stack = createStackNavigator();

function MyStack() {
  const { animationComplete } = useAnimation();
  return (

    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {animationComplete ? null : (
        <Stack.Screen name="Home" component={HomeScreen} />
      )}
      <Stack.Screen name="Setting" component={Settings} />
      <Stack.Screen name="DatabaseUser" component={DataBase} />
      <Stack.Screen name="FaceId" component={FaceId} />
      <Stack.Screen name="CCTV" component={CCTV} />
      <Stack.Screen name='MAPS' component={Tracker}/>
    </Stack.Navigator>

  );
}

export default function App() {
  return (

    <NavigationContainer>
      <AnimationProvider>
        <MyStack />

      </AnimationProvider>
    </NavigationContainer>
  );
}
