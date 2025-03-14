import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Image, Pressable } from 'react-native';
import { Link, router, useLocalSearchParams } from 'expo-router';
import BlockChart from '../../components/ui/BlockChart';
import BlockProgress from '../../components/ui/BlockProgress';
import { getStyles } from '../../components/styles';
import { useTheme } from '../../components/ThemeContext';

export default function HomeScreen() {
  const { isDarkMode } = useTheme();
  const styles = getStyles();
  const currentDate = new Date().toLocaleDateString();
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

  const handlePress = () => {
    router.push({
      pathname: '/(tabs)/(user)/[userId]',
      params: { userId: Array.isArray(userId) ? userId[0] : userId },
    });
  };

  const userProfile = images.find(profile => profile.image === userId);

  return (
    <View style={styles.pageContainer}>
      <View style={styles.topBar}>
        <Text style={styles.dateText}>{currentDate}</Text>
            <Pressable onPress={handlePress}>
              <Image
                source={{ uri: userProfile?.image }}
                style={styles.profileImage}
              />
            </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.grid}>
        <BlockProgress />
        <BlockChart />
      </ScrollView>
    </View>
  );
}