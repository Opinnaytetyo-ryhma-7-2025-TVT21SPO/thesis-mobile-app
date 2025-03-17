import { View, Text, ScrollView, TouchableOpacity, Image, Platform } from 'react-native'
import React from 'react'
import Animated, { FadeInDown } from 'react-native-reanimated';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { getStyles } from '../styles';
import { useTheme } from '../../components/ThemeContext'
import { categoryData } from '../../assets/index'
import "../../global.css";

interface RecipeCategoriesProps {
    activeCategory: string;
    handleChangeCategory: (category: string) => void;
    categories: Array<{ idCategory: string; strCategory: string; strCategoryThumb: string; strCategoryDescription: string }>;
    }

const RecipeCategories: React.FC<RecipeCategoriesProps> = ({ categories, activeCategory, handleChangeCategory }) => {

    const styles = getStyles();
    const { isDarkMode } = useTheme();

  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{paddingHorizontal: 15}}
        >
        {
            categories.map((category, index) => {
                let isActive = category.strCategory == activeCategory;
                let activeButtonClass = isActive ? 'bg-[#3d3ded]' : undefined;
                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleChangeCategory(category.strCategory)}
                        className="flex items-center space-y-1"
                    >
                        <View className={"rounded-full p-[6px] " +activeButtonClass}>
                            <Image
                                source={{uri: category.strCategoryThumb}}
                                style={{height: hp(6), width: hp(6)}}
                                className="rounded-full">

                            </Image>
                        </View>
                        <Text 
                            className={`${isDarkMode ? 'text-white' : undefined}`} 
                            style={Platform.OS === 'web' ? styles.categoryTitle : undefined}
                        >
                            {category.strCategory}
                        </Text>
                    </TouchableOpacity>
                )
            })
        }
      </ScrollView>
    </Animated.View>
    )
}

export default RecipeCategories