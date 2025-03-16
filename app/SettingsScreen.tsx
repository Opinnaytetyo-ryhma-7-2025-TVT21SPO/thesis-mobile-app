import React, { useEffect } from 'react';
import { View, Text, Switch, StatusBar } from 'react-native';
import { useTheme } from '@/components/ThemeContext';
import { getStyles } from '@/components/styles';

const SettingsScreen: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const styles = getStyles();

  useEffect(() => {
          if (isDarkMode) {
            StatusBar.setBackgroundColor('#171717');
            StatusBar.setBarStyle('light-content');
          } else {
            StatusBar.setBackgroundColor('#f2f2f2');
            StatusBar.setBarStyle('dark-content');
          }
        }, []);

  return (
    <View style={styles.pageContainer}>
      <View style={styles.settingsContainer}>
        <Text style={styles.textStyles}>Settings</Text>
        <View style={styles.checkboxContainer}>
          <Text style={styles.textStyles}>Dark Modeasdasdasdas </Text>
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