import React from 'react';
import { ThemeProvider, useTheme } from '../components/ThemeContext';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, Tabs, Link } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { getStyles } from '@/components/styles';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { IconSymbol } from '@/components/ui/IconSymbol';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen 
          name="index"
          options={{
            headerShown: false,
            title: 'Login',
          }} />
        <Stack.Screen name="(tabs)" options={{ headerShown : false }} />
        <Stack.Screen name="+not-found" />"
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
