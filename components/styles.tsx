import { StyleSheet, Dimensions, Platform } from 'react-native';
import { useTheme } from './ThemeContext';
import '../global.css';


const { width, height } = Dimensions.get('window');

export const getStyles = () => {
  const { isDarkMode } = useTheme();

  return StyleSheet.create({
    textStyles: {
      color: isDarkMode ? '#fff' : '#000',
    },
    tabBar: {
      position: 'absolute',
      bottom: Platform.OS === 'web' ? undefined : 25,
      top: Platform.OS === 'web' ? "0.5%" : undefined,
      maxWidth: Platform.OS === 'web' ? '30%' : undefined,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      backgroundColor: isDarkMode ? '#333' : '#f8f8f8',
      marginHorizontal: Platform.OS === 'web' ? 'auto' : 20,
      paddingVertical: 15,
      borderRadius: 25,
      borderCurve: 'continuous',
      elevation: 10,
      width: Platform.OS === 'web' ? '80%' : undefined,
      left: Platform.OS === 'web' ? '10%' : undefined, // Center horizontally on web
      right: Platform.OS === 'web' ? '10%' : undefined, // Center horizontally on web
      ...(Platform.OS === 'web' && {
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Add drop shadow for web
      }),
    },
    tabBarButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 4,
    },
    pageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#171717' : undefined,
    },
    searchBar: {
      backgroundColor: isDarkMode ? '#fff' : '#000',
      borderRadius: 50,
      borderCurve: 'continuous'
    },
    categoryTitle: {
      color: isDarkMode ? '#fff' : '#000',
    },
    recipeTitle: {
      color: isDarkMode ? '#fff' : '#000',
    },
    profileImageLarge: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 16,
    },
    usernameText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#000',
      marginBottom: 16,
    },
    index: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#000' : '#fff',
    },
    logo: {
      width: 200,
      height: 200,
      resizeMode: 'contain',
    },
    blockContainer: {
      flex: 1,
      minHeight: 250,
      minWidth: 350,
      maxHeight: Platform.OS === 'android' ? height / 3 : height / 4,
      maxWidth: Platform.OS === 'android' ? width - 32 : width / 3 - 32,
      padding: 16,
      margin: 8,
      backgroundColor: isDarkMode ? '#333' : '#fff',
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
    },
    progressText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#e26a00',
    },
    grid: {
      flexDirection: Platform.OS === 'android' ? 'column' : 'row',
      flexWrap: Platform.OS === 'web' ? 'wrap' : 'nowrap',
      marginTop: Platform.OS === 'web' ? "10%" : 0,
      padding: 16,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    recipeImage: {
      width: '100%',
      height: 150,
      borderRadius: 10,
      marginBottom: 8,
      resizeMode: 'contain',
    },
    recipeImageLarge: {
      width: '100%',
      height: 300,
      borderRadius: 10,
      marginBottom: 16,
    },
    recipeTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#000',
    },
    recipeDescription: {
      fontSize: 16,
      color: isDarkMode ? '#fff' : '#000',
      textAlign: 'center',
      paddingHorizontal: 16,
    },
    settingsContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
  });
};