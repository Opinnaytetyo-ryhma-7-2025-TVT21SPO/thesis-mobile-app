import { View, Text, Pressable, Image, Platform, FlatList, ListRenderItem } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import { recipeData } from '../../assets/index'
import { useState } from 'react';
import { getStyles } from '../../components/styles';
import { useTheme } from '../../components/ThemeContext';
import Loading from './loading';
import ImageCacher from './imageCacher';


type RecipeCardProps = {
    strMealThumb: string;
    idMeal: string;
    strMeal: string;
};
interface RecipesProps {
    categories: Array<any>;
    meals: Array<RecipeCardProps>;

}

export default function Recipes({ categories, meals }: RecipesProps) {
  const [isLoadingNext, setIsLoadingNext] = useState(false);
  const styles = getStyles();
  const { isDarkMode } = useTheme();

  return (
    <View className="mx-4 space-y-3">
    <Text 
    style={Platform.OS === 'web' ? { fontSize: hp(3), marginTop: hp(2) } : { fontSize: hp(3) }}
    className={`semi-bold ${isDarkMode ? 'text-white' : undefined}`}>Recipes</Text>
      <View>
        {
            categories.length == 0 || meals.length == 0 ? (
                <Loading size="large" className="mt-20"/>
            ) : (
                <MasonryList
                    data={meals}
                    keyExtractor={(item): string => item.idMeal}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem= {({ item, i }: { item: unknown; i: number }) => (
                        <RecipeCard
                            item={item as RecipeCardProps}
                            index={i}
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

const RecipeCard = ({item, index}: {item: RecipeCardProps; index: number}) => {
    const styles = getStyles();
    let isEven = index%2==0;
    const { isDarkMode } = useTheme();
    return (
        <View>
            <Pressable
                style={{width: '100%', paddingLeft: isEven? 0 : 8, paddingRight: isEven? 8 : 0}}
                className="flex justify-center mb-4 space-y-1"
                >
                    {/* <Image source={{uri: item.strMealThumb}}
                        style={{width: "100%", height: index%3==0? hp(25):hp(35), borderRadius: 35}}
                        className="bg-black/5">
                    </Image> */}
                    <ImageCacher />
                    <Text 
                        style={Platform.OS === 'web' ? styles.categoryTitle : {fontSize: hp(2)}}
                        className={`font-semibold ml-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                        {
                            item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + '...' : item.strMeal
                        }
                    </Text>
            </Pressable>
        </View>
    )
}