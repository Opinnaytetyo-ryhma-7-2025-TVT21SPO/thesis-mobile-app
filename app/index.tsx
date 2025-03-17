import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { View, Pressable, Image, Text, useColorScheme, StatusBar } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getStyles } from '../components/styles';
import "../global.css";



export default function LoginScreen() {
  const colorScheme = useColorScheme() || 'light';
  const router = useRouter();
  const styles = getStyles();

  useEffect(() => {
    StatusBar.setBackgroundColor('#6464f1');
    StatusBar.setBarStyle('light-content');
  }, []);
  
  return (
    <View style={[styles.index, { justifyContent: 'flex-start', alignItems: 'flex-start' }]}>
      <Image 
      source={colorScheme === 'dark' 
        ? require('../assets/images/bg_dark.png') 
        : require('../assets/images/bg.png')} 
      style={{ width: '100%', height: '100%', position: 'absolute', top: 0 }} 
      />
      {/* login stuff */}
      <View className="h-full w-full flex justify-around pt-40 -pt-10 items-center">
        {/*Google Logo*/}
          <Animated.View entering={FadeInUp.delay(200).duration(1000).springify()}>
            <Pressable 
              className='flex items-center' 
              onPress={() => {
                {/*login logic here*/}
              console.log('Google login pressed');
                router.push('/Home');
              
              }}
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
          </Animated.View>
      </View>
    </View>
  );
}