import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { Platform, Dimensions, StyleSheet } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import AntDesign from '@expo/vector-icons/AntDesign';
import { IconSymbol } from '@/components/ui/IconSymbol';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import ExploreScreen from '@/app/(tabs)/ExploreScreen';
import SettingsScreen from '@/app/(tabs)/SettingsScreen';
import HomeScreen from '@/app/(tabs)/HomeScreen';
import { Tabs } from 'expo-router';


export default function TabLayout() {
    const colorScheme = useColorScheme();
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'green' }}>
        <Tabs.Screen
            name="HomeScreen"
            options={{
                title: 'Home',
                tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
                headerShown: false
            }}
        />
        <Tabs.Screen
            name="SettingsScreen"
            options={{
                title: 'Settings',
                tabBarIcon: ({ color }) => <AntDesign size={28} name="setting" color={color} />,
                headerShown: false
            }}
        />
        <Tabs.Screen name="+not-found" />
    </Tabs>
  );
}