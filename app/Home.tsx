import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Image, Pressable, StatusBar, useColorScheme, TextInput, Button } from 'react-native';
import { Link, router, useLocalSearchParams, useNavigation } from 'expo-router';
import BlockChartWeight from '../components/ui/BlockWeightChart';
import BlockProgress from '../components/ui/BlockProgress';
import { getStyles } from '../components/styles';
import { useTheme } from '../components/ThemeContext';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BlockWeightChart from '../components/ui/BlockWeightChart';
import BlockActivityChart from '@/components/ui/BlockActivityChart';

export default function HomeScreen() {
  const { isDarkMode } = useTheme();
  const styles = getStyles();
  const { userId } = useLocalSearchParams();
  const [images, setImage] = useState<{ image: string }[]>([]);
  const [reload, setReload] = useState<number>(0)
  
  const [userData, setUserData] = useState<Object>({});
  


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
      async function getUserData(){
        try {
          console.log(`Getting User Data`)
          const user = await AsyncStorage.getItem('user')
          if (user) {
            const userContent = JSON.parse(user)
            console.log(`User Data Got`)
            return setUserData(userContent)
          }
        } catch (e){
          console.log(`Storage Error: ${e}`)
        }
      }
      getUserData()
    }, [reload])

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
        <View className="m-20">
          {userData.initialized !== null ? <Text>Go to your profile to get started!</Text> :
          undefined}
          </View>
        

        {userData.initialized !== null ? undefined :
          <BlockActivityChart />}

        {userData.weightHistory !== null || userData.weightHistory.length !== 0 ? undefined : <BlockWeightChart /> }
          
      </ScrollView>
    </View>
  );
}