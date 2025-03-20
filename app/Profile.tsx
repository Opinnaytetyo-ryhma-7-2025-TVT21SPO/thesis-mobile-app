import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, Pressable, useColorScheme, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getStyles } from '../components/styles';
import { useTheme } from '../components/ThemeContext';
import { router, useLocalSearchParams } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserProfileScreen() {
  const { isDarkMode } = useTheme();
  const styles = getStyles();
  const navigation = useNavigation();
  const userId = Math.floor(Math.random() * 4 + 1).toString();

  interface IUserData {
    name: string,
    height: string,
    weight: string,
    gender: string,
    allergies: string,
    activitylvl: string
  }

  const [userData, setUserData] = useState<IUserData | null>(null)

  const [username, setUsername] = useState<string>('')
  const [userheight, setUserheight] = useState<string>('')
  const [userweight, setUserweight] = useState<string>('')
  const [usergender, setUsergender] = useState<string>('')
  const [userallergies, setUserallergies] = useState<string>('')
  const [useractivitylvl, setUseractivitylvl] = useState<string>('')



  const [loading, setLoading] = useState<boolean>(true)
  const [reload, setReload] = useState<number>(0)

  async function deleteUser() {
    try{
      console.log(`Deleting User`)
      await AsyncStorage.removeItem('user')
      console.log(`User Deleted`)
      setReload(reload + 1)
      console.log(reload)
    } catch(e){
      console.log(`Storage Error: ${e}`)
    }
  }

  async function editUser() {
    try{
      const user = {
        name: username,
        height: userheight,
        weight: userweight,
        gender: usergender,
        allergies: userallergies,
        activitylvl: useractivitylvl
      }
      console.log(`Creating  User`)
      await AsyncStorage.setItem('user', JSON.stringify(user))
      console.log(`User Created`)
      setReload(reload + 1)
      console.log(reload)
    } catch (e) {
      console.log(`Storage Error: ${e}`)
    }
  }

  useEffect(() => {
    async function getUserData(){
      try {
        console.log(`Getting User Data`)
        const user = await AsyncStorage.getItem('user')

        if (user) {
          const userContent = JSON.parse(user) as IUserData
          console.log(`User Data Got`)
          setUsername(userContent.name)
          setUserheight(userContent.height)
          setUserweight(userContent.weight)
          setUsergender(userContent.gender)
          setUserallergies(userContent.allergies)
          setUseractivitylvl(userContent.activitylvl)

          return setUserData(userContent)
        }

      } catch (e){
        console.log(`Storage Error: ${e}`)
      }
      finally {
        setLoading(false)
      }
    }
    getUserData()
  }, [reload])

  const Load = () => {
    if (loading) {
      return (
        <Text>Loading user data...</Text>
      )
    }

    return (
      <View>
        {userData ? (
          <View>
            <View style={styles.profileFieldContainer}>
              <Text>Name: </Text>
              <TextInput 
                value={username}
                onChangeText={setUsername}
              />
            </View>
            <View style={styles.profileFieldContainer}>
              <Text>Height: </Text>
              <TextInput 
                value={userheight}
                onChangeText={setUserheight}

              />
            </View>
            <View style={styles.profileFieldContainer}>
              <Text>Weight: </Text>
              <TextInput 
                value={userweight}
                onChangeText={setUserweight}

              />
            </View>
            <View style={styles.profileFieldContainer}>
              <Text>Gender: </Text>
              <TextInput 
                value={usergender}
                onChangeText={setUsergender}

              />
            </View>
            <View style={styles.profileFieldContainer}>
              <Text>Allergies: </Text>
              <TextInput 
                value={userallergies}
                onChangeText={setUserallergies}

              />
            </View>
            <View style={styles.profileFieldContainer}> 
              <Text>Activity level: </Text>
              <TextInput
                value={useractivitylvl}
                onChangeText={setUseractivitylvl}

              />  
            </View>
          </View>

        ) : (
          <View>
            <Text>Name not found</Text>
            <Text>Height not found</Text>
            <Text>Weight not found</Text>
            <Text>Gender not found</Text>
            <Text>Allergies not found</Text>
            <Text>Activity level not found</Text>
          </View>
        )}
        <View>
          <Button onPress={editUser} color="#00f" title='Save user data'/>
          {/* <Button onPress={deleteUser} color="#f00" title='Delete User Data' disabled={userData===null}/> */}
        </View>
      </View>
    )
  }

  useEffect(() => {
          if (isDarkMode) {
            StatusBar.setBackgroundColor('#171717');
            StatusBar.setBarStyle('light-content');
          } else {
            StatusBar.setBackgroundColor('#f2f2f2');
            StatusBar.setBarStyle('dark-content');
          }
        }, []);



  const profiles = [
    { userId: '1', username: 'User One', imageUrl: 'https://cdn.7tv.app/emote/01F6R3BYFG000AXK0HX1P7HDWX/4x.avif' },
    { userId: '2', username: 'User Two', imageUrl: 'https://cdn.7tv.app/emote/01F6MQ33FG000FFJ97ZB8MWV52/4x.avif' },
    { userId: '3', username: 'User Three', imageUrl: 'https://cdn.7tv.app/emote/01F6NACCD80006SZ7ZW5FMWKWK/4x.avif' },
    { userId: '4', username: 'User Four', imageUrl: 'https://cdn.7tv.app/emote/01F8G9MDAR0009YQPYZYCKHYKQ/4x.avif' },
  ];

  const userProfile = profiles.find(profile => profile.userId === userId);

  const colorScheme = useColorScheme() ? 'dark' : 'light';
  return (
    <View style={styles.pageContainer}>
      {userProfile ? (
      <>
        <Image
        source={{ uri: userProfile.imageUrl }}
        style={styles.profileImageLarge}
        />
        <Text style={styles.usernameText}>{userProfile.username}</Text>
        <Load/>
      </>
      ) : (
      <Text style={styles.usernameText}>User not found</Text>
      )}
      <Pressable 
              className='flex items-center' 
              onPress={() => {
                {/*login logic here*/}
              console.log('Google login pressed');
                // router.push('/Home');
                // axios.get('http://localhost:5000/auth/google')
                window.location.href = 'http://localhost:5000/auth/logout';
                }}
            >
              <AntDesign 
              name="google" 
              size={24} 
              color={colorScheme === 'dark' ? 'white' : 'black'} 
              />
            </Pressable>
    </View>
  );
}