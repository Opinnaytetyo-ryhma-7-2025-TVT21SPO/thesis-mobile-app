import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { getStyles } from '../../components/styles';
import { useTheme } from '../../components/ThemeContext';
import BlockRecipe from '../../components/ui/BlockRecipe';

export default function RecipeScreen() {
  const { isDarkMode } = useTheme();
  const styles = getStyles();
  const [recipes, setRecipes] = useState<{ recipeId: string; title: string; image: string }[]>([]);

  useEffect(() => {
    // Fetch data from the database
    const fetchData = async () => {
      // const response = await fetch('https://example.com/api/recipes'); // Replace with your API endpoint
      // const data = await response.json();
      // setRecipes(data);

      // Dummy data
      const dummyData = [
        { recipeId: '1', title: 'Recipe 1', image: 'https://preview.redd.it/just-realized-that-aboba-is-saying-the-word-aboba-in-the-v0-wj15zu9q4jid1.gif?format=png8&s=b1a9e75d8cb0a8519a524f3f764607cda8980efa' },
        { recipeId: '2', title: 'Recipe 2', image: 'https://cdn.7tv.app/emote/01F6MDTQ3G0005TFYTWP1ZFQG9/4x.avif' },
        { recipeId: '3', title: 'Recipe 3', image: 'https://cdn.7tv.app/emote/01F6R3BYFG000AXK0HX1P7HDWX/4x.avif' },
        { recipeId: '4', title: 'Recipe 3', image: 'https://cdn.7tv.app/emote/01F6R3BYFG000AXK0HX1P7HDWX/4x.avif' },
      ];
      setRecipes(dummyData);
    };

    fetchData();
  }, []);

  return (
    <View style={styles.pageContainer}>
      <ScrollView contentContainerStyle={styles.grid}>
        {recipes.map((recipe) => (
          <BlockRecipe
            key={recipe.recipeId}
            recipeId={recipe.recipeId}
            title={recipe.title}
            image={recipe.image}
          />
        ))}
      </ScrollView>
    </View>
  );
}