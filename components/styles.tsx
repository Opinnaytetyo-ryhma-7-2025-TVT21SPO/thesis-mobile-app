import { StyleSheet, Dimensions, Platform } from 'react-native';
import { useTheme } from './ThemeContext'; // Adjust the import path as needed

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
    addButtonText: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end', // Align to the bottom
      alignItems: 'center',
      backgroundColor: 'transparent', // Make background transparent
    },
    modalContent: {
      width: '100%',
      padding: 20,
      backgroundColor: isDarkMode ? '#333' : '#fff',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    modalButton: {
      width: '100%',
      padding: 10,
      marginVertical: 5,
      backgroundColor: '#e26a00',
      borderRadius: 5,
      alignItems: 'center',
    },
    modalButtonText: {
      color: '#fff',
      fontSize: 16,
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