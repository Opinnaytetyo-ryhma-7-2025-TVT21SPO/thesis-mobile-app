import React, { useEffect, useState } from 'react';
import { View, Text, Image, StatusBar, Pressable, useColorScheme, Button, TextInput, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getStyles } from '../components/styles';
import { useTheme } from '../components/ThemeContext';
import { router, useLocalSearchParams } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

export default function UserProfileScreen() {
  const { isDarkMode } = useTheme();
  const styles = getStyles();
  const navigation = useNavigation();
  const userId = Math.floor(Math.random() * 4 + 1).toString();

  interface IUserData {
    height: number,
    weight: number,
    weightHistory: Array<Object>
    age: number,
    allergies: Array<String>
    activityHistory: Array<Object>,
    sex: string,
    bmr: number,
  }

  const [userData, setUserData] = useState<IUserData | null>(null)

  const [uheight, setUheight] = useState<number>(0)
  const [uweight, setUweight] = useState<number>(0)
  const [uage, setUage] = useState<number>(0)
  const [uallergies, setUallergies] = useState<String>("")
  const [editmode, setEditmode] = useState<boolean>(false)
  const [isMale, setIsMale] = useState<string>('');
  const [reload, setReload] = useState<number>(0)
  const [bmr, setBmr] = useState<number>(0)
  const [weightHistory, setWeightHistory] = useState<Array<Object>>([])

  async function deleteUser() {
    try{
      console.log(`Deleting User`)
      await AsyncStorage.removeItem('user')
      console.log(`User Deleted`)
    } catch(e){
      console.log(`Storage Error: ${e}`)
    } finally{
      setUheight(0)
      setUweight(0)
      setUage(0)
      setIsMale('')
      setUallergies('')
      setEditmode(false)
      console.log(reload)
    }
  }

  async function editUser() {
    setEditmode(true)
    try{
      const user = {
        height: uheight,
        weight: uweight,
        age: uage,
        allergies: uallergies,
        sex: isMale,
        bmr: bmr
      }
      console.log(`Editing  User`)
      await AsyncStorage.setItem('user', JSON.stringify(user))
    } catch (e) {
      console.log(`Storage Error: ${e}`)
    } finally{
      setReload(reload + 1)
      getUserData();
      parseAllergies();
      calculateBMR();
      console.log(reload)
    }
  }
  async function saveEdit() {
    try{

      const allergiesArray = await saveAllergies(uallergies)
      let weightHistoryArray = await AsyncStorage.getItem('weightHistory')
      let newWeightHistory = []
      newWeightHistory.concat(weightHistoryArray)
      newWeightHistory.push({weight: uweight, time: Date.now()})

      const user = {
        height: uheight,
        weight: uweight,
        weightHistory: newWeightHistory,
        age: uage,
        allergies: allergiesArray,
        sex: isMale,
        initialized: true,
      }
      console.log(`Editing  User`)
      await AsyncStorage.setItem('user', JSON.stringify(user))
      console.log(`User Edited`)
    } catch (e) {
      console.log(`Storage Error: ${e}`)
    } finally{
      setEditmode(false)
      getUserData();
      parseAllergies();
      calculateBMR();
    }
  }

  async function getUserData(){
    try {
      console.log(`Getting User Data`)
      const user = await AsyncStorage.getItem('user')

      if (user) {
        const userContent = JSON.parse(user) as IUserData
        console.log(`User Data Got`)
        setUheight(userContent.height)
        setUweight(userContent.weight)
        setWeightHistory(weightHistory.concat(userContent.weightHistory))
        setUage(userContent.age)
        setIsMale(userContent.sex)
        console.log('User Data: ', userContent)
        return setUserData(userContent)
      } else{
        setUserData(null)
        console.log('No User Data Found')
      }
      parseAllergies();
      calculateBMR()
    } catch (e){
      console.log(`Storage Error: ${e}`)
    }
  }

  useEffect(() => {
    getUserData()
    
  }, [])

  const parseAllergies = async () =>  {
    const currentUserData = await AsyncStorage.getItem('user')
    const currentAllergiesArray = currentUserData.allergies
    let newAllergiesString = ""
    if(currentAllergiesArray){
      for (let i = 0; i < currentAllergiesArray.length; i++) {
        if(newAllergiesString !== ""){
          newAllergiesString = newAllergiesString + ", "
        }
        newAllergiesString = newAllergiesString + currentAllergiesArray[i]
      }
      setUallergies(newAllergiesString)
    }
    
  }

  const saveAllergies = async (userInput) => {
    if(userInput == ''){
      return userInput;
    }
    let userInputString = userInput;
    let userInputArray = userInputString.split(',')
    let cleanedUserInputArray = userInputArray.map((str: string) => str.trim());
    return cleanedUserInputArray;
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
  
  const calculateBMR = () => {
    if (isMale === 'male'){
      const BMR = (10 * uweight) + (6.25 * uheight) - (5 * uage + 5)
      setBmr(BMR)
    }else if (isMale === 'female'){
      const BMR = (10 * uweight) + (6.25 * uheight) - (5 * uage -161)
      setBmr(BMR)
    }
  }

  return (
    <View style={styles.pageContainer}>
      {userProfile ? (
      <>
        <Image
        source={{ uri: userProfile.imageUrl }}
        style={styles.profileImageLarge}
        />
          <Text style={styles.usernameText}>{userProfile.username}</Text>
            {
              bmr == 0 || editmode == true ? undefined :
              <View>
            <View style={styles.profileFieldContainer}>
              <Text style={styles.profileText}>Maintain Weight</Text>
              <Text style={styles.profileText}>{bmr}cal</Text>
            </View>
            <View style={styles.profileFieldContainer}>
              <Text style={styles.profileText}>Mild Weight Loss</Text>
              <Text style={styles.profileText}>{bmr * 0.87}cal</Text> 
            </View>
            <View style={styles.profileFieldContainer}>
              <Text style={styles.profileText}>Weight Loss</Text>
              <Text style={styles.profileText}>{bmr * 0.75}cal</Text> 
            </View>
            <View style={styles.profileFieldContainer}>
              <Text style={styles.profileText}>Extreme Weight Loss</Text>
              <Text style={styles.profileText}>{bmr * 0.50}cal</Text> 
            </View>
          </View>
}
        <View>
        {userData ? (
          editmode ? (
            <View>
            <View style={styles.profileFieldContainer}>
              <Text style={styles.profileText}>Height in cm: </Text>
              <TextInput
                style={styles.profileText} 
                defaultValue={uheight.toString()}
                onChange={(event)=>{
                   const num = parseFloat(event.nativeEvent.text)
                  if(isNaN(num)){
                    console.log(event)
                    return
                  }
                  setUheight(num)
                }}
                keyboardType="numeric"
                value={uheight.toString()}
              />
            </View>
            <View style={styles.profileFieldContainer}>
              <Text style={styles.profileText}>Weight in Kg: </Text>
              <TextInput 
                style={styles.profileText}
                defaultValue={uweight.toString()}
                onChange={(event)=>{
                   const num = parseFloat(event.nativeEvent.text)
                  if(isNaN(num)){
                    console.log(event)
                    return
                  }
                  setUweight(num)
                }}
                keyboardType="numeric"
                value={uweight.toString()}
              />
            </View>
            <View style={styles.profileFieldContainer}>
              <Text style={styles.profileText}>Age: </Text>
              <TextInput 
                style={styles.profileText}
                defaultValue={uage.toString()}
                onChange={(event)=>{
                   const num = parseFloat(event.nativeEvent.text)
                  if(isNaN(num)){
                    console.log(event)
                    return
                  }
                  setUage(num)
                }}
                keyboardType="numeric"
                value={uage.toString()}
              />
            </View>
            <View style={styles.profileFieldContainer}>
              <Text style={styles.profileText}>Allergies: </Text>
              <TextInput
                style={styles.profileText} 
                defaultValue={uallergies as string}
                onChange={(event)=>{
                   const text = event.nativeEvent.text
                  
                  setUallergies(text)
                }}
                keyboardType="default"
                value={uallergies as string}
              />
            </View>
            <View style={styles.profileFieldContainer}> 
            <View style={styles.buttonView}>
              <Button onPress={() => setIsMale('male')} color='#0a7ea4' title='Male'disabled={isMale==='male'}/>
            </View>
            <View style={styles.buttonView}></View>
              <Button onPress={() => setIsMale('female')} color="#673ab7" title='Female'disabled={isMale==='female'}/>
            </View>
          </View>

          ) : (

            <View>
            <View style={styles.profileFieldContainer}>
              <Text style={styles.profileText}>Height: </Text>
              <Text style={styles.profileText}>{uheight} cm</Text>
            </View>
            <View style={styles.profileFieldContainer}>
              <Text style={styles.profileText}>Weight: </Text>
              <Text style={styles.profileText}>{uweight} Kg</Text>
            </View>
            <View style={styles.profileFieldContainer}> 
              <Text style={styles.profileText}>Age:</Text>
              <Text style={styles.profileText}>{uage}</Text>
            </View>
            <View style={styles.profileFieldContainer}>
              <Text style={styles.profileText}>Allergies: </Text>
              <Text style={styles.profileText}>{uallergies}</Text>
            </View>
            <View style={styles.profileFieldContainer}> 
              <Text style={styles.profileText}>Sex: </Text>
              <Text style={styles.profileText}>{isMale}</Text>
            </View>
            <View style={styles.profileFieldContainer}> 
              <Text style={styles.profileText}>BMR: </Text>
              <View style={styles.profileText}>{bmr}cal</View>
            </View>
            
          </View>   
          )
        ) : (
          <View>
            <Text style={styles.profileText}>Height not found</Text>
            <Text style={styles.profileText}>Weight not found</Text>
            <Text style={styles.profileText}>Age not found</Text>
            <Text style={styles.profileText}>Allergies not found</Text>
            <Text style={styles.profileText}>Sex not found</Text>
            <Text style={styles.profileText}>BMR not calculated</Text>

          </View>
        )}
        <View style={styles.buttonView}>
          {editmode !== true ? <Button onPress={editUser} color='#e26a00' title='Edit User'/> : undefined}
        </View>
        <View style={styles.buttonView}>
        {editmode !== false ? <Button onPress={saveEdit} color='#e26a00' title='Save Edit'/> : undefined}
        </View>
        <View style={styles.buttonView}>
        {editmode !== false ? <Button onPress={deleteUser} color='#e26a00' title='Delete User'/> : undefined}
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