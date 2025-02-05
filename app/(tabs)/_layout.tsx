import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Platform, Dimensions, StyleSheet } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import ExploreScreen from '@/app/screens/ExploreScreen';
import SettingsScreen from '@/app/screens/SettingsScreen';
import HomeScreen from '@/app/screens/HomeScreen';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const { width: initialScreenWidth } = Dimensions.get('window');
const initialDrawerWidth = Math.min(initialScreenWidth * 0.250, 200); // 25% of the screen width or 300px, whichever is smaller
const initialIsNarrowScreen = initialScreenWidth < 600; // Define a threshold width for narrow screens

const styles = StyleSheet.create({
  drawerStyle: {
    width: initialDrawerWidth,
  },
});

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      backBehavior='history'
      screenOptions={{
        headerShown: false,
        drawerType: Platform.OS === 'web' ? 'permanent' : 'front',
        drawerStyle: Platform.OS === 'web' ? styles.drawerStyle : {},
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Drawer.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          drawerIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color }) => <FontAwesome name="cog" size={24} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
}

function TabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'dark'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
        tabBarItemStyle: Platform.select({
          default: {},
        }),
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome name="cog" size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const [isNarrowScreen, setIsNarrowScreen] = useState(initialIsNarrowScreen);

  useEffect(() => {
    const handleResize = ({ window }: { window: { width: number } }) => {
      setIsNarrowScreen(window.width < 600);
    };

    const subscription = Dimensions.addEventListener('change', handleResize);

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        {isNarrowScreen ? <TabNavigator /> : <DrawerNavigator />}
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}