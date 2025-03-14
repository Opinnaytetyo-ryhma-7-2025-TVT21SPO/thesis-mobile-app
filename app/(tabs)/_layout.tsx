import React from 'react';
import { Tabs } from 'expo-router';
import { ThemeProvider, useTheme } from '@/components/ThemeContext';
import { getStyles } from '@/components/styles';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { IconSymbol } from '@/components/ui/IconSymbol';

function TabLayoutContent() {
  const { isDarkMode } = useTheme();
  const styles = getStyles();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: isDarkMode ? '#fff' : '#000',
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#000' : '#fff',
        },
      }}
    >
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
        name="(user)/[userId]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="[recipe]"
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