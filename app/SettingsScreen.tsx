import React, { useEffect, useState } from 'react';
import { View, Text, Switch, StatusBar } from 'react-native';
import { useTheme } from '@/components/ThemeContext';
import { getStyles } from '@/components/styles';

const SettingsScreen: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const styles = getStyles();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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
          <Text style={styles.textStyles}>Dark Mode </Text>
          <Switch
            onValueChange={toggleTheme}
            value={isDarkMode}
            /* doesn't seem to work properly? */
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>
      </View>
    </View>
  );
};

export default SettingsScreen;