import { View, Text, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import { icons } from '../assets/icons';
import { getStyles } from './styles';
import { useTheme } from '../components/ThemeContext';
import Animated, { interpolate, withSpring, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { LabelPosition } from '@react-navigation/bottom-tabs/lib/typescript/commonjs/src/types';

interface TabBarButtonProps {
  routeName: string;
  isFocused: boolean;
  label: string | ((args: { focused: boolean; color: string; position: string; children: string }) => React.ReactNode);
  primaryColor: string;
  secondaryColor: string;
  color: string;
  position: LabelPosition
}

const TabBarButton = (props: TabBarButtonProps) => {
  const { routeName, isFocused, label, color } = props;

  const scale = useSharedValue(0);

  useEffect(() => {
        scale.value = withSpring(
            typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused,
            {duration: 350}
        );
    }, [scale, isFocused]);

  // Call useTheme inside the component
  const { isDarkMode } = useTheme();
  const styles = getStyles();

    const animatedIconStyle = useAnimatedStyle(() => {
        const scaleValue = interpolate(
            scale.value,
            [0, 1],
            [0.8, 1.2]
        )
        const top = interpolate(
            scale.value,
            [0, 1],
            [0, 8]
        )
        return {
            transform: [{ scale: scaleValue }],
            top
        };
    });
    const animatedTextStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            scale.value,
            [0, 1],
            [1, 0]
        )
        return {
            transform: [{ scale: opacity }],
        };
    });
  return (
    <Pressable {...props} style={styles.tabBarButton}>
      <Animated.View style={[animatedIconStyle]}>
              {
                  // Check if the icon exists for the route name
                  icons[routeName]
                      ? icons[routeName]({ color })
                      : null // Fallback if no icon is found
              }
      </Animated.View>
      
      
      <Animated.Text style={[{ 
            color,
            fontSize: 11 
            }, animatedTextStyle]}>
        {typeof label === 'string'
          ? label
          : label({ focused: isFocused, color: isFocused ? '#673ab7' : '#222', position: 'below-icon', children: '' })}
      </Animated.Text>
    </Pressable>
  );
};

export default TabBarButton;