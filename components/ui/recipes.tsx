import { View, Text, Pressable, Image, Platform, FlatList, ListRenderItem } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { recipeData } from '../../assets/index'
import { useState } from 'react';
import { getStyles } from '../styles';
import { useTheme } from '../ThemeContext';
import Loading from './loading';
import ImageCacher from './imageCacher';
import { Route, useNavigation } from 'expo-router';


type RecipeCardProps = {
    imageUrl: any;
    _id: any;
    nameEnglish: any;
    navigation: any;
    route: any;
};
interface RecipesProps {
    categories: Array<any>;
    meals: Array<RecipeCardProps>;
    keepSpinning: boolean;
}

interface ItemProps {
    item: RecipeCardProps
}

export default function Recipes({ categories, meals, keepSpinning }: RecipesProps) {
  const [isLoadingNext, setIsLoadingNext] = useState(false);
  const styles = getStyles();
  const { isDarkMode } = useTheme();
  const navigation = useNavigation();

  console.log('OLLAAN RESEPTIKOMENNOSSA APUA')
  console.log(categories.length);
  console.log(meals.length);

  return (
    <View className="mx-4 space-y-3">
    <Text 
    style={Platform.OS === 'web' ? { fontSize: hp(3), marginTop: hp(2) } : { fontSize: hp(3) }}
    className={`semi-bold ${isDarkMode ? 'text-white' : undefined}`}>Recipes</Text>
      <View>
        {
            
            keepSpinning ? (
                <Loading size="large" className="mt-20"/>
            ) : (
                <MasonryList
                    data={meals}
                    keyExtractor={(item): string => item._id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem= {({ item, i }) => (
                        <RecipeCard
                            item={item as RecipeCardProps}
                            index={i}
                            navigation={navigation}
                        />
                    )}
                /* refreshing={isLoadingNext}
                onRefresh={() => refetch({ first: ITEM_CNT })} */
                onEndReachedThreshold={0.1}
                /* onEndReached={() => loadNext(ITEM_CNT)} */
            />
            )
        }
        
      </View>
    </View>
  )
}

const RecipeCard = ({item, index, navigation}: {item: any; index: number, navigation: any }) => {
    const styles = getStyles();
    let isEven = index%2==0;
    const { isDarkMode } = useTheme();
    /* console.log(item) */
    return (
        <Animated.View entering={FadeInDown.delay(index*100).duration(600).springify().damping(12)}>
            <Pressable
                style={{width: '100%', paddingLeft: isEven? 0 : 8, paddingRight: isEven? 8 : 0}}
                className="flex justify-center mb-4 space-y-1"
                onPress={() => navigation.navigate('RecipeDetail', item)}
                >
                    <Image source={{uri: item.imageUrl}}
                        style={{width: "100%", height: index%3==0? hp(25):hp(35), borderRadius: 35}}
                        className="bg-black/5">
                    </Image>
                    {/* <ImageCacher 
                        uri={item.strMealThumb}
                        source={{uri: item.strMealThumb}}
                        style={{width: "100%", height: index%3==0? hp(25):hp(35), borderRadius: 35}}
                        className="bg-black/5"/> */}
                    <Text 
                        style={Platform.OS === 'web' ? styles.categoryTitle : {fontSize: hp(2)}}
                        className={`font-semibold ml-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                        {
                            item.nameEnglish.length > 20 ? item.nameEnglish.slice(0, 20) + '...' : item.nameEnglish
                        }
                    </Text>
            </Pressable>
        </Animated.View>
    )
}