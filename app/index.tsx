import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { View, Pressable, Image, Text, useColorScheme, StatusBar, Platform, TextInput } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useTheme } from '../components/ThemeContext'
import { AntDesign } from '@expo/vector-icons';
import { Redirect, useRouter } from 'expo-router';
import { getStyles } from '../components/styles';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import "../global.css";
import axios from 'axios';



export default function LoginScreen() {
  const colorScheme = useColorScheme() || 'light';
  const router = useRouter();
  const styles = getStyles();
  const { isDarkMode } = useTheme();

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
      <View className="h-full w-full flex pt-40 -pt-10 items-center">
        {/*Google Logo*/}
          <View className="w-80 mt-40">
            <Text 
            style={{fontSize: hp(3)}}
            className={`flex font-extrabold ${isDarkMode ? 'text-white' : 'text-black'}`}>Please login</Text>
        
            <View className="flex w-full items-center mx-4 space-y-4 mt-20">
              <View className={`p-5 rounded-2xl w-full mb-2 ${isDarkMode ? 'bg-white' : 'bg-black/5'}`}>
                <TextInput placeholder='Email' placeholderTextColor={'gray'}/>
              </View>              
              <View className={`p-5 rounded-2xl w-full mb-2 ${isDarkMode ? 'bg-white' : 'bg-black/5'}`}>
                <TextInput placeholder='Password' placeholderTextColor={'gray'} secureTextEntry/>
              </View>              
              <View className="w-full">
                <Pressable className="w-full bg-sky-400 p-3 rounded-2xl mb-3">
                  <Text className="text-xl font-bold text-white text-center">Login</Text>
                </Pressable>
              </View>              
            </View>
          </View>

          <Animated.View entering={FadeInUp.delay(200).duration(1000).springify()}>
            
            <Pressable 
              className={`flex items-center`} 
              onPress={() => {
                {/*login logic here*/}
              console.log('Google login pressed');
                // router.push('/Home');
                // axios.get('http://localhost:5000/auth/google')
                window.location.href = 'http://localhost:5000/auth/google';
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
              <Pressable 
              className='flex items-center' 
              onPress={() => {
                //login logic
              console.log('Guest login pressed');
                router.push('/Home');
                
              
              }}
            >
              <AntDesign 
              name="user" 
              size={24} 
              color={colorScheme === 'dark' ? 'white' : 'black'} 
              />
            </Pressable>
            <Text style={{ color: colorScheme === 'dark' ? 'white' : 'black' }}>
              Guest access
            </Text>
          </Animated.View>
      </View>
    </View>
  );
}