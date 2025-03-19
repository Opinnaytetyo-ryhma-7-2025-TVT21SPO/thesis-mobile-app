import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Image, Pressable, StatusBar, useColorScheme } from 'react-native';
import { Link, router, useLocalSearchParams, useNavigation } from 'expo-router';
import BlockChart from '../components/ui/BlockChart';
import BlockProgress from '../components/ui/BlockProgress';
import { getStyles } from '../components/styles';
import { useTheme } from '../components/ThemeContext';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';

export default function HomeScreen() {
  const { isDarkMode } = useTheme();
  const styles = getStyles();
  const { userId } = useLocalSearchParams();
  const [images, setImage] = useState<{ image: string }[]>([]);

  useEffect(() => {
      // Fetch data from the database
      const fetchData = async () => {
        // const response = await fetch('https://example.com/api/images'); // Replace with your API endpoint
        // const data = await response.json();
        // setImage(data);
  
        // Dummy data
        const images = [
          { imageId: userId, title: 'image 1', image: 'https://cdn.7tv.app/emote/01F6R3BYFG000AXK0HX1P7HDWX/4x.avif' },
          { imageId: userId, title: 'image 2', image: 'https://cdn.7tv.app/emote/01F6MQ33FG000FFJ97ZB8MWV52/4x.avif' },
          { imageId: userId, title: 'image 3', image: 'https://cdn.7tv.app/emote/01F6NACCD80006SZ7ZW5FMWKWK/4x.avif' },
          { imageId: userId, title: 'image 4', image: 'https://cdn.7tv.app/emote/01F8G9MDAR0009YQPYZYCKHYKQ/4x.avif' },
        ];
        setImage(images);
      };
  
      fetchData();
    }, []);

    useEffect(() => {
        if (isDarkMode) {
          StatusBar.setBackgroundColor('#171717');
          StatusBar.setBarStyle('light-content');
        } else {
          StatusBar.setBackgroundColor('#f2f2f2');
          StatusBar.setBarStyle('dark-content');
        }
      }, []);

  const userProfile = images.find(profile => profile.image === userId);

  const colorScheme = useColorScheme() || 'light';
  return (
    <View style={styles.pageContainer}>
      <ScrollView contentContainerStyle={styles.grid}>
        <BlockProgress />
        <BlockChart />
        <Pressable 
              className='flex items-center' 
              onPress={() => {
                {/*login logic here*/}
              console.log('Google login pressed');
                // router.push('/Home');
                // axios.get('http://localhost:5000/auth/google')
                axios.get('http://localhost:5000/protected', { withCredentials: true }).then((res) => {
                  console.log(res);
                
              })}}
            >
              <AntDesign 
              name="google" 
              size={24} 
              color={colorScheme === 'dark' ? 'white' : 'black'} 
              />
            </Pressable>
            <Text style={{ color: colorScheme === 'dark' ? 'white' : 'black' }}>
              Login with Google
            </Text>
      </ScrollView>
    </View>
  );
}