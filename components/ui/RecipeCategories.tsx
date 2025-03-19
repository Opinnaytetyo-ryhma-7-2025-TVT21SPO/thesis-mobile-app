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
    // categories: Array<{ idCategory: string; strCategory: string; strCategoryThumb: string; strCategoryDescription: string }>;
    categories: Array<{ termEnglish: string }>;
    keepSpinning: boolean;
    }

const RecipeCategories: React.FC<RecipeCategoriesProps> = ({ categories, activeCategory, handleChangeCategory, keepSpinning }) => {

    const styles = getStyles();
    const { isDarkMode } = useTheme();

    const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{paddingHorizontal: 15}}
        >
        {
            keepSpinning == true ? undefined : 
            categories.map((category, index) => {
                let isActive = category.termEnglish == activeCategory;
                let activeButtonClass = isActive ? 'bg-[#3d3ded]' : undefined;
                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleChangeCategory(category.termEnglish)}
                        className="flex items-center space-y-1"
                    >
                        <View className={"rounded-full p-[6px] " +activeButtonClass}>
                            {/* <Image
                                source={{uri: category.strCategoryThumb}}
                                style={{height: hp(6), width: hp(6)}}
                                className="rounded-full">

                            </Image> */}
                            <Text 
                            className={`${isDarkMode ? 'text-white' : undefined}`} 
                            style={Platform.OS === 'web' ? styles.categoryTitle : undefined}
                        >
                            {capitalizeFirstLetter(category.termEnglish)}
                        </Text>
                        </View>
                        
                    </TouchableOpacity>
                )
            })
        }
      </ScrollView>
    </Animated.View>
    )
}

export default RecipeCategories