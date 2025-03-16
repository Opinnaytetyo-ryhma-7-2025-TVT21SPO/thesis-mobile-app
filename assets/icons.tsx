import React from 'react';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

type IconProps = {
    color?: string;
    size?: number;
  }

  export const icons: Record<string, (props: IconProps) => JSX.Element> = {
        Home: (props)=> <AntDesign name="home" size={26} {...props} />,
        SettingsScreen: (props)=> <FontAwesome name="cogs" size={26} {...props} />,
        RecipeScreen: (props)=> <AntDesign name="book" size={26} {...props} />,
        Profile: (props)=> <AntDesign name="user" size={26} {...props} />,
  }