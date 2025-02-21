import React, { useState } from 'react';
import { View, Pressable, Image, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { getStyles } from '../components/styles'; // Adjust the import path as needed

export default function LoginScreen() {
  const colorScheme = useColorScheme() || 'light';
  const [logo, setLogo] = useState(
    colorScheme === 'dark'
      ? require('../assets/images/logo_dark.png')
      : require('../assets/images/logo.png')
  );
  const router = useRouter();
  const styles = getStyles(colorScheme);

  const handlePress = () => {
    setLogo(require('../assets/images/logo2.png'));
    setTimeout(() => {
      router.replace('../(tabs)/HomeScreen');
    }, 500); // Wait for 500 milliseconds (half a second)
  };

  return (
    <View style={styles.index}>
      <Pressable onPress={handlePress}>
        <Image source={logo} style={styles.logo} />
      </Pressable>
    </View>
  );
}