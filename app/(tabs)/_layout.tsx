import React from 'react';
import { Tabs } from 'expo-router';
import { ThemeProvider, useTheme } from '@/components/ThemeContext'; // Adjust the import path as needed
import { getStyles } from '@/components/styles'; // Adjust the import path as needed
import AntDesign from '@expo/vector-icons/AntDesign';
import { IconSymbol } from '@/components/ui/IconSymbol';

function TabLayoutContent() {
  const { isDarkMode } = useTheme();
  const styles = getStyles();
  const tabActiveColor = 'green';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDarkMode ? '#fff' : '#000',
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#000' : '#fff',
        },
      }}
    >
      <Tabs.Screen
        name="HomeScreen"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          tabBarActiveTintColor: tabActiveColor,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="SettingsScreen"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <AntDesign size={28} name="setting" color={color} />,
          tabBarActiveTintColor: tabActiveColor,
          headerShown: false,
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