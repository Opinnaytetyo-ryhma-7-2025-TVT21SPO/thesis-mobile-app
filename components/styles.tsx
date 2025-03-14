import { StyleSheet, Dimensions, Platform } from 'react-native';
import { useTheme } from './ThemeContext';

const { width, height } = Dimensions.get('window');

export const getStyles = () => {
  const { isDarkMode } = useTheme();

  return StyleSheet.create({
    textStyles: {
      color: isDarkMode ? '#fff' : '#000',
    },
    pageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#000' : '#fff',
    },
    topBar: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      backgroundColor: isDarkMode ? '#333' : '#f8f8f8',
    },
    dateText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#000',
      alignContent: 'center',
    },
    profileImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
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
    settingsButton: {
      padding: 10,
      backgroundColor: '#e26a00',
      borderRadius: 5,
    },
    settingsButtonText: {
      color: '#fff',
      fontSize: 16,
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
      maxWidth: Platform.OS === 'android' ? width - 32 : (width / 3) - 32,
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
    deleteButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: '#e26a00',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#cc5500', // Darker orange outline
    },
    deleteButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    progressText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#e26a00',
    },
    grid: {
      flexDirection: Platform.OS === 'android' ? 'column' : 'row',
      flexWrap: Platform.OS === 'web' ? 'wrap' : 'nowrap',
      padding: 16,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    addButton: {
      position: 'absolute',
      bottom: 30,
      right: 30,
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#e26a00',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
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