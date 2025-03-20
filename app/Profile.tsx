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
    username: string,
    height: string,
    weight: string,
    gender: string,
    allergies: string,
    activitylvl: string,
    activityHistory: number
  }

  const [userData, setUserData] = useState<IUserData | null>(null)

  const [uname, setUname] = useState<string>('')
  const [uheight, setUheight] = useState<string>('')
  const [uweight, setUweight] = useState<string>('')
  const [ugender, setUgender] = useState<string>('')
  const [uallergies, setUallergies] = useState<string>('')
  const [uactivitylvl, setUactivitylvl] = useState<string>('')
  const [editmode, setEditmode] = useState<boolean>(false)
  const [activityHistory, setActivityHistory] = useState<number>(0)




  const [reload, setReload] = useState<number>(0)

  async function deleteUser() {
    try{
      console.log(`Deleting User`)
      await AsyncStorage.removeItem('user')
      console.log(`User Deleted`)
    } catch(e){
      console.log(`Storage Error: ${e}`)
    } finally{
      setReload(reload + 1)
      console.log(reload)
    }
  }

  async function editUser() {
    setEditmode(true)   
  }

  async function saveEdit() {
    try{
      const user = {
        username: uname,
        height: uheight,
        weight: uweight,
        gender: ugender,
        allergies: uallergies,
        activitylvl: uactivitylvl,
        activityHistory: activityHistory,
      }
      console.log(`Editing  User`)
      await AsyncStorage.setItem('user', JSON.stringify(user))
      console.log(`User Edited`)
    } catch (e) {
      console.log(`Storage Error: ${e}`)
    } finally{
      setEditmode(false)
      setReload(reload + 1)
      console.log(reload)
    }
  }

  const viewing = () => {
    if (editmode) {
      return (
        <Text>Loading user data...</Text>
      )
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
          setUname(userContent.username)
          setUheight(userContent.height)
          setUweight(userContent.weight)
          setUgender(userContent.gender)
          setUallergies(userContent.allergies)
          setUactivitylvl(userContent.activitylvl)
          console.log('User Data: ', userContent)
          return setUserData(userContent)
        } else{
          setUserData(null)
          console.log('No User Data Found')
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

        <View>
        {userData ? (
          editmode ? (
            <View>
            <View style={styles.profileFieldContainer}>
              <Text>Name: </Text>
              <TextInput 
                placeholder='Enter Name'
                value={uname}
                onChangeText={setUname}
              />
            </View>
            <View style={styles.profileFieldContainer}>
              <Text>Height: </Text>
              <TextInput 
                placeholder='Enter Height in cm'
                value={uheight}
                onChangeText={setUheight}
              />
            </View>
            <View style={styles.profileFieldContainer}>
              <Text>Weight: </Text>
              <TextInput 
                placeholder='Enter Weight in kg'
                value={uweight}
                onChangeText={setUweight}
              />
            </View>
            <View style={styles.profileFieldContainer}>
              <Text>Gender: </Text>
              <TextInput 
                placeholder='Enter Gender'
                value={ugender}
                onChangeText={setUgender}
              />
            </View>
            <View style={styles.profileFieldContainer}>
              <Text>Allergies: </Text>
              <TextInput 
                placeholder='Enter Allergies'
                value={uallergies}
                onChangeText={setUallergies}
              />
            </View>
            <View style={styles.profileFieldContainer}> 
              <Text>Activity level: </Text>
              <TextInput
                placeholder='Enter Activity level'
                value={uactivitylvl}
                onChangeText={setUactivitylvl}
              />  
            </View>
          </View>

          ) : (

            <View>
            <View style={styles.profileFieldContainer}>
              <Text>Name: </Text>
              <Text>{uname}</Text>
            </View>
            <View style={styles.profileFieldContainer}>
              <Text>Height: </Text>
              <Text>{uheight}</Text>
            </View>
            <View style={styles.profileFieldContainer}>
              <Text>Weight: </Text>
              <Text>{uweight}</Text>
            </View>
            <View style={styles.profileFieldContainer}>
              <Text>Gender: </Text>
              <Text>{ugender}</Text>
            </View>
            <View style={styles.profileFieldContainer}>
              <Text>Allergies: </Text>
              <Text>{uallergies}</Text>
            </View>
            <View style={styles.profileFieldContainer}> 
              <Text>Activity level: </Text>
              <Text>{uactivitylvl}</Text>
            </View>
          </View>   
          )
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
          <Button onPress={editUser} color="#0f0" title='Edit User'disabled={editmode===true}/>
          <Button onPress={saveEdit} color="#00f" title='Save Edit' disabled={editmode===false}/>
          <Button onPress={deleteUser} color="#f00" title='Delete User' disabled={userData===null}/>
        </View>
      </View>
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