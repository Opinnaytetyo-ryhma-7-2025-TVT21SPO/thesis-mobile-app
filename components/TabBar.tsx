import { View, Text, Pressable, Platform } from "react-native";
import React from "react";
import { getStyles } from '@/components/styles';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

// Define the buildHref function
const buildHref = (routeName: string, params: object | undefined): string => {
  // Replace this logic with your actual URL-building logic
  return `/${routeName}${params ? `?${new URLSearchParams(params as any).toString()}` : ''}`;
};

import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import SettingsScreen from "@/app/SettingsScreen";
import TabBarButton from "./TabBarButton";

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const styles = getStyles();
  const primaryColor = '#3d3ded'; //blue-500
  const secondaryColor = '#8f8f9c'; //gneutral-blue-shifted-700

  if (state.routes[state.index].name === 'index') {
    return null;
  }

  return (
    <Animated.View 
      entering={
      Platform.OS === 'web' 
        ? FadeInUp.delay(200).duration(1000).springify() 
        : FadeInDown.delay(200).duration(1000).springify()
      } 
      style={ styles.tabBar }
    >
      {state.routes.map((route, index) => {
      const { options } = descriptors[route.key];
      const label =
        options.tabBarLabel !== undefined
        ? options.tabBarLabel
        : options.title !== undefined
          ? options.title
          : route.name;

      if(['index', '_sitemap', '+not-found', '[recipe]', 'x_layout'].includes(route.name)) {
        return null;
      }

      const isFocused = state.index === index;

      const onPress = () => {
        const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name, route.params);
        }
      };

      const onLongPress = () => {
        navigation.emit({
        type: 'tabLongPress',
        target: route.key,
        });
      };

      return (
        <TabBarButton
        key={route.name}
        onPress={onPress}
        onLongPress={onLongPress}
        isFocused={isFocused}
        label={label}
        routeName={route.name}
        color={isFocused ? primaryColor : secondaryColor}
        />
      );
      })}
    </Animated.View>
  );
};

export default TabBar;