import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { ThemeProvider, useTheme } from '@/components/ThemeContext';
import { useColorScheme } from 'react-native';
import { getStyles } from '@/components/styles';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBar from '../components/TabBar';

function TabLayoutContent() {
  const { isDarkMode } = useTheme();
  const styles = getStyles();
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
    <Tabs
      tabBar={props => <TabBar {...props} />}
      screenOptions={({ route }) => ({
      headerShown: false,
      gsturesEnabled: false,
      swipeEnabled: false,
      tabBarActiveTintColor: isDarkMode ? '#fff' : '#000',
      tabBarStyle: {
        backgroundColor: isDarkMode ? '#000' : '#fff',
        display: route.name === 'index' ? 'none' : 'flex',
      },
      })}
    >
      <Tabs.Screen
      name="index"
      options={{
        title: 'index',
        href: null,
      }}
      />
      <Tabs.Screen
      name="Home"
      options={{
        title: 'Home',
        tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
      }}
      />
      <Tabs.Screen
      name="SettingsScreen"
      options={{
        title: 'Settings',
        tabBarIcon: ({ color }) => <AntDesign size={28} name="setting" color={color} />,
        href: null,
      }}
      />
      <Tabs.Screen
      name="RecipeScreen"
      options={{
        title: 'Recipes',
        tabBarIcon: ({ color }) => <Entypo name="book" size={24} color={color} />,
      }}
      />
      <Tabs.Screen
      name="[recipe]"
      options={{
        href: null,
      }}
      />
      <Tabs.Screen
      name="x_layout"
      options={{
        href: null,
      }}
      />
      <Tabs.Screen
      name="+not-found"
      options={{
        href: null,
      }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  return (
    <ThemeProvider>
      <TabLayoutContent />
    </ThemeProvider>
  );
}