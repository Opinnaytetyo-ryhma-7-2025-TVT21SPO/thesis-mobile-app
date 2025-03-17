import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '../components/ThemeContext'
import { getStyles } from '../components/styles'
import { Platform } from 'react-native'

const RecipeDetail = (props) => {
  console.log(props.route.params)

  const { isDarkMode } = useTheme();
  const styles = getStyles();

  return (
    <View
          className={`flex-1 ${isDarkMode ? 'bg-[#171717]' : undefined}`}
          style={Platform.OS === 'web' ? styles.pageContainer : undefined}
        >
      <Text>RecipeDetail</Text>
    </View>
  )
}

export default RecipeDetail