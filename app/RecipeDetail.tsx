import { View, Text, Image, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useTheme } from '../components/ThemeContext'
import { getStyles } from '../components/styles'
import { Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { ChevronLeftIcon, ClockIcon, FireIcon, Square3Stack3DIcon, UsersIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import axios from 'axios';
import Loading from '@/components/ui/loading';

interface RecipeProps {
  uri: string;
  source: string;
}

export default function RecipeDetail(props: RecipeProps) {
  let item = useLocalSearchParams();
  const [isFavourite, setIsFavourite] = useState(false);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState(null);
  const [alreadySearched, setAlreadySearched] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(()=> {
    if(!alreadySearched){
      console.log('finding recipe')
      getRecipeData(item._id);
      setAlreadySearched(true);
    } else { console.log('häh')}
  })

  const { isDarkMode } = useTheme();
  const styles = getStyles();

  const getRecipeData = async (_id) => {
    try{
      // const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/recipes/${_id}`)
      console.log('got meals: ',response.data)
      if(response && response.data){
        console.log(response.data.ingredientsEnglish)
        setRecipe(response.data)
        setLoading(false);
        setImage(response.data.imageUrl)
      }

    }catch(e){
      console.log('error: ', e)
    }
  }

// const ingredientsIndexes = (recipe) => {
//    if(!recipe) return [];
//   let indexes = [];
//   for(let i = 0; i<recipe.length; i++){
//     if(recipe[i]){
//       indexes.push(i);
//     }
//   }
//   return indexes;
//   console.log('moi')
//   console.log(recipe)
// }

  return (
    <ScrollView
          className={`flex-1 ${isDarkMode ? 'bg-[#171717]' : undefined}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={Platform.OS === 'web' ? styles.recipeDetailContainer : undefined}
        >
      <StatusBar style={"light"}/>
      {/* recipe image */}
      <View className="flex-row justify-center">
        <Image
          source={{ uri: image != null ? image : ''}}
          style={{width: wp(98),maxWidth: wp(50) , height: hp(50), borderRadius: 53, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, marginTop: 4}}>
        </Image>
      </View>

      {/* back button */}
      <View className="w-full absolute flex-row justify-between items-center pt-40">
        <Pressable 
          onPress={() => navigation.goBack()} //heittää jostain syystä etusivulle, navigation stack sekaisin todnäk
          className="p-2 rounded-full ml-5 bg-white">
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#f7b333" />
        </Pressable>
        <Pressable onPress={()=>setIsFavourite(!isFavourite)} className="p-2 rounded-full mr-5 bg-white">
          <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavourite ? "red" : "#f7b333"} />
        </Pressable>
      </View>

      {/* recipe info */}
      {
        loading? (
          <Loading size="large" className="mt-16" />
        ):(
          <View className="px-4 flex justify-between space-y-4 pt-8">
            {/* name */}
            <View className="space-y-2">
              <Text style={{fontSize: hp(3)}} className='font-bold flex-1 text-neutral-700'>
                {/* recipes.nameFinnish */}
              </Text>
            </View>

            {/* misc stuff */}
            <View className="flex-row justify-around">
              <View className="flex rounded-full p-2 bg-[#f7b333]">
                <View
                  style={{height: hp(6.5), width: hp(6.5)}}
                  className="bg-white rounded-full flex items-center justify-center"
                  >
                    <ClockIcon size={hp(4)} strokeWidth={2.5} color="#97a093"/>
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text style={{fontSize: hp(2)}} className='font-bold text-neutral-700'>
                    15
                  </Text>
                  <Text style={{fontSize: hp(1.3)}} className='font-bold text-neutral-700'>
                    min
                  </Text>
                </View>
              </View>
              <View className="flex rounded-full p-2 bg-[#f7b333]">
                <View
                  style={{height: hp(6.5), width: hp(6.5)}}
                  className="bg-white rounded-full flex items-center justify-center"
                  >
                    <UsersIcon size={hp(4)} strokeWidth={2.5} color="#97a093"/>
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text style={{fontSize: hp(2)}} className='font-bold text-neutral-700'>
                    4
                  </Text>
                  <Text style={{fontSize: hp(1.3)}} className='font-bold text-neutral-700'>
                    servings
                  </Text>
                </View>
              </View>
              <View className="flex rounded-full p-2 bg-[#f7b333]">
                <View
                  style={{height: hp(6.5), width: hp(6.5)}}
                  className="bg-white rounded-full flex items-center justify-center"
                  >
                    <FireIcon size={hp(4)} strokeWidth={2.5} color="#97a093"/>
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text style={{fontSize: hp(2)}} className='font-bold text-neutral-700'>
                    {
                      recipe?.macros.calories
                    }
                  </Text>
                  <Text style={{fontSize: hp(1.3)}} className='font-bold text-neutral-700'>
                    kcal
                  </Text>
                </View>
              </View>
              <View className="flex rounded-full p-2 bg-[#f7b333]">
                <View
                  style={{height: hp(6.5), width: hp(6.5)}}
                  className="bg-white rounded-full flex items-center justify-center"
                  >
                    <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color="#97a093"/>
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text style={{fontSize: hp(2)}} className='font-bold text-neutral-700'>
                    Easy
                  </Text>
                </View>
              </View>
            </View>
            {/* ingredients */}
            <View className="space-y-2">
               <Text style={{fontSize: hp(2.5)}} className={`font-bold flex-1 ${isDarkMode ? 'text-white' : 'text-neutral-600'}`}>
                  Ingredients
               </Text>
               <View className='space-y-2 ml-3'>
                {
                  
                  recipe.ingredientsEnglish.map(ingredient=>{
                    return (
                      <View key={ingredient} className="flex-row space-x-4">
                        <View style={{height: hp(1.5), width: hp(1.5)}}
                          className='bg-[#f7b333] rounded-full'/>
                            <View className="flex-row space-x-2">
                              {/* <Text>{recipe['mitta string tähän'+i]}</Text> */}
                              <Text style={{fontSize: hp(2)}} className={`font-extrabold ${isDarkMode ? 'text-white' : 'text-neutral-600'} `}>{ingredient}</Text>
                            </View>
                      </View>
                    )
                  })
                }
               </View>
            </View>

            {/* instructions */}
            <View className="space-y-4">
               <Text style={{fontSize: hp(2.5)}} className={`font-bold flex-1 ${isDarkMode ? 'text-white' : 'text-neutral-700'} `}>
                  Instructions
               </Text>
               <Text style={{fontSize: hp(2)}} className={`font-bold flex-1 ${isDarkMode ? 'text-white' : 'text-neutral-700'} `}>
                {
                  recipe?.instructionsEnglish
                }

               </Text>
            </View>
          </View>
        )
      }
    </ScrollView>
  )
}