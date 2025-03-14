import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getStyles } from '../styles';
import { useTheme } from '../ThemeContext';
import { router } from 'expo-router';

interface BlockRecipeProps {
  recipeId: string;
  title: string;
  image: string;
}

const BlockRecipe: React.FC<BlockRecipeProps> = ({ recipeId, title, image }) => {
  const { isDarkMode } = useTheme();
  const styles = getStyles();

  const handlePress = () => {
    router.push({
      pathname: '/[recipe]',
      params: { recipeId },
    });
  };

  return (
    <Pressable style={styles.blockContainer} onPress={handlePress}>
      <Image
        source={{ uri: image }}
        style={styles.recipeImage}
      />
      <Text style={styles.recipeTitle}>{title}</Text>
    </Pressable>
  );
};

export default BlockRecipe;