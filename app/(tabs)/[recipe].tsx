import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { getStyles } from '../../components/styles';
import { useTheme } from '../../components/ThemeContext';
import { useLocalSearchParams } from 'expo-router';

export default function RecipeDetailScreen() {
  const { isDarkMode } = useTheme();
  const styles = getStyles();
  const { recipeId } = useLocalSearchParams();

  interface Recipe {
    recipeId: string;
    title: string;
    description: string;
    image: string;
  }

  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    // Fetch recipe details based on the recipeId
    // const fetchRecipe = async () => {
    //   const response = await fetch(`https://example.com/api/recipes/${recipeId}`);
    //   const data = await response.json();
    //   setRecipe(data);
    // };

    const fetchRecipe = () => {
      const dummyData = {
      recipeId: Array.isArray(recipeId) ? recipeId[0] : recipeId,
      title: 'Dummy Recipe Title',
      description: 'This is a dummy description for the recipe.',
      image: 'https://cdn.7tv.app/emote/01F8WC915800093DKN3F0P6EV2/4x.webp'
      };
      setRecipe(dummyData);
    };

    if (recipeId) {
      fetchRecipe();
    }
  }, [recipeId]);

  if (!recipe) {
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.recipeDescription}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.pageContainer}>
      <Text>Recipe ID: {recipeId}</Text>
      <Image
        source={{ uri: recipe.image }}
        style={styles.recipeImageLarge}
      />
      <Text style={styles.recipeTitle}>{recipe.title}</Text>
      <Text style={styles.recipeDescription}>{recipe.description}</Text>
    </View>
  );
}