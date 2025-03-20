import { View, Text, TextInput, Platform } from 'react-native'
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import React, { useEffect, useContext, useState } from 'react'
import { useTheme } from '../components/ThemeContext'
import { StatusBar, ScrollView } from 'react-native'
import { getStyles } from '../components/styles';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import RecipeCategories from '@/components/ui/RecipeCategories'
import axios from 'axios';
import "../global.css";
import Recipes from '@/components/ui/recipes'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const RecipeScreen = () => {
  const { isDarkMode } = useTheme();
  const styles = getStyles();
  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [keepSpinning, setKeepSpinning] = useState(true);
  const [allergies, setAllergies] = useState<Array<Object>>([]);


  //this is deprecated
  const [keepSpinningItSeppo, setKeepSpinningItSeppo] = useState(true);

  useEffect(()=> {
    getAsyncStorageUserData();
    getCategories();
    getRecipes();
    if (isDarkMode) {
      StatusBar.setBackgroundColor('#171717');
      StatusBar.setBarStyle('light-content');
    } else {
      StatusBar.setBackgroundColor('#f2f2f2');
      StatusBar.setBarStyle('dark-content');
    }
  },[]);

  interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
  }

  interface Meal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
  }

  const handleChangeCategory = (category: string): void => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  };
  const getAsyncStorageUserData = async () => {
    try {
      console.log(`Getting User Data`)
      const user = await AsyncStorage.getItem('user')
      if (user) {
        const userContent = JSON.parse(user)
        setAllergies(userContent.allergies)
      }
    } catch (e){
      console.log(`Storage Error: ${e}`)
    }
} 
  const getCategories = async () => {
    try{
      // const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php')
      // const response = await axios.get('http://localhost:5000/recipes/categories/filtered')
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/recipes/categories/filtered`)
      /* console.log('got categories: ',response.data) */
      if (response && response.data){
        
        if(allergies.length!==0) {
          console.log('allergies')
          console.log(allergies)
          let filteredCategories = [];
          for (let i = 0; i < response.data.length; i++) {
            let currentCategory = response.data[i];
            console.log(currentCategory.termEnglish)
            if(!allergies.includes(currentCategory.termEnglish)){
              filteredCategories.push(currentCategory)
            }
          }
          setCategories(filteredCategories)
        } else {
          console.log('no allergies')
          setCategories(response.data)
        }
        
        
      }
    }catch(e){
      console.log('error: ', e)
    }
  }
 

  const getRecipes = async (category="potato") => {
    setKeepSpinning(true);
    try{
      // const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/recipes/filtered/${category}`)
      /* console.log('got meals: ',response.data) */
      if (response && response.data.message == 'none'){
        setKeepSpinning(false);
      } else if (response && response.data){


        if(allergies.length!==0) {
          console.log('allergies')
          console.log(allergies)
          let filteredRecipes = [];
          for (let i = 0; i < response.data.length; i++) {
            let currentRecipe = response.data[i];
            console.log(currentRecipe.ingredientsEnglish)
            let allergic = false;
            for (let u = 0; u < currentRecipe.ingredientsEnglish.length ; u++ ){
              if(allergies.includes(currentRecipe.ingredientsEnglish[u])){
                allergic = true;
              }
            }
            for (let u = 0; u < currentRecipe.allergens.length ; u++ ){
              if(allergies.includes(currentRecipe.allergens[u])){
                allergic = true;
              }
            }
            if(!allergic){
              filteredRecipes.push(currentRecipe)
            }
          }
          setMeals(filteredRecipes)
        } else {
          console.log('no allergies')
          setMeals(response.data)
        }
        setKeepSpinning(false);
        console.log('set meals');
        console.log(response.data);
      }
    }catch(e){
      console.log('error: ', e)
    }
  }

  return (
    <View
      className={`flex-1 ${isDarkMode ? 'bg-[#171717]' : undefined}`}
      style={Platform.OS === 'web' ? styles.pageContainer : undefined}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}
        className="space-y-6 pt-14 w-[50%]"
      >
        {/* Search bar */}
        <View 
          className={`mx-4 ${Platform.OS === 'web' ? 'my-10' : 'my-1'} flex-row items-center rounded-full bg-gray-200 dark:bg-gray-800 p-[6px]`}
          style={Platform.OS === 'web' ? styles.searchBar : undefined}
        >
          <TextInput
            placeholder="Search for recipes"
            placeholderTextColor="#a0aec0"
            style={{fontSize: hp(1.7)}}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <View className="bg-white dark:bg-gray-700 rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </View>
        </View>

        {/* Categories */}
        <View className={`mx-0 ${Platform.OS === 'web' ? 'my-[-20]' : 'my-1'}`}>
          { categories.length>0 && <RecipeCategories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} keepSpinning={keepSpinning}/>}
        </View>


        {/* Recipes */}
        <View>
          <Recipes meals={meals} categories={categories} keepSpinning={keepSpinning} />
        </View>
        
        {/* No Recipes Found */}
        {meals.length == 0 && keepSpinning == false && <Text className={`text-center ${isDarkMode ? 'text-white' : undefined}`}>No recipes found</Text>}
      </ScrollView>
    </View>
  )
}

export default RecipeScreen