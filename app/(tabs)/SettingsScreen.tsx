import React from 'react';
import { View, Text, Switch } from 'react-native';
import { useTheme } from '@/components/ThemeContext'; // Adjust the import path as needed
import { getStyles } from '@/components/styles'; // Adjust the import path as needed

const SettingsScreen: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const styles = getStyles();

  return (
    <View style={styles.pageContainer}>
      <View style={styles.settingsContainer}>
        <Text style={styles.textStyles}>Settings</Text>
        <View style={styles.checkboxContainer}>
          <Text style={styles.textStyles}>Dark Mode </Text>
          <Switch
            onValueChange={toggleTheme}
            value={isDarkMode}
          />
        </View>
      </View>
    </View>
  );
};

export default SettingsScreen;