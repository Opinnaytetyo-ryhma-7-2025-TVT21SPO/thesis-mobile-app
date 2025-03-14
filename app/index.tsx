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
  const styles = getStyles();

  const handlePress = async () => {
    setLogo(require('../assets/images/logo2.png'));

    // Fetch user ID from the database
    // const fetchUserId = async () => {
    //   const response = await fetch('https://example.com/api/user'); // Replace with your API endpoint
    //   const data = await response.json();
    //   return data.id;
    // };

    // Dummy data
    const userId = Math.floor(Math.random() * 4) + 1;

    // Uncomment the following lines to use the actual fetching logic
    // const userId = await fetchUserId();

    setTimeout(() => {
      router.replace({
        pathname: '/Home',
        params: { userId },
      });
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