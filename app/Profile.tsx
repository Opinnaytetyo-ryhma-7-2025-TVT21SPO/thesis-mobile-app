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
    age: number,
    allergies: Array<String>
    activitylvl: string,
    activityHistory: number,
    sex: string,
    bmr: number,
  }

  const [userData, setUserData] = useState<IUserData | null>(null)

  const [uheight, setUheight] = useState<number>(0)
  const [uweight, setUweight] = useState<number>(0)
  const [uage, setUage] = useState<number>(0)
  const [uallergies, setUallergies] = useState<String[]>([])
  const [uactivitylvl, setUactivitylvl] = useState<string>('')
  const [editmode, setEditmode] = useState<boolean>(false)
  const [isMale, setIsMale] = useState<string>('');
  const [reload, setReload] = useState<number>(0)
  const [bmr, setBmr] = useState<number>(0)

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
      setUallergies([''])
      setUactivitylvl('')
      setEditmode(false)
      setReload(reload + 1)
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
        activitylvl: uactivitylvl,
        sex: isMale,
        bmr: bmr
      }
      console.log(`Editing  User`)
      await AsyncStorage.setItem('user', JSON.stringify(user))
    } catch (e) {
      console.log(`Storage Error: ${e}`)
    } finally{
      setReload(reload + 1)
      console.log(reload)
    }
  }
  async function saveEdit() {
    try{
      const user = {
        height: uheight,
        weight: uweight,
        age: uage,
        allergies: uallergies,
        activitylvl: uactivitylvl,
        sex: isMale,
        bmr: bmr,
        initialized: true,
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
  useEffect(() => {
    async function getUserData(){
      try {
        console.log(`Getting User Data`)
        const user = await AsyncStorage.getItem('user')

        if (user) {
          const userContent = JSON.parse(user) as IUserData
          console.log(`User Data Got`)
          setUheight(userContent.height)
          setUweight(userContent.weight)
          setUage(userContent.age)
          setUallergies(userContent.allergies)
          setUactivitylvl(userContent.activitylvl)
          setIsMale(userContent.sex)
          setBmr(userContent.bmr)
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
    calculateBMR()
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
            <View>
            <View style={styles.profileFieldContainer}>
              <Text>Maintain Weight</Text>
              <Text>{bmr}</Text>
            </View>
            <View style={styles.profileFieldContainer}>
              <Text>Mild Weight Loss</Text>
              <Text>{bmr * 0.87}</Text> 
            </View>
            <View style={styles.profileFieldContainer}>
              <Text>Weight Loss</Text>
              <Text>{bmr * 0.75}</Text> 
            </View>
            <View style={styles.profileFieldContainer}>
              <Text>Extreme Weight Loss</Text>
              <Text>{bmr * 0.50}</Text> 
            </View>
          </View>
        <View>
        {userData ? (
          editmode ? (
            <View>
            <View style={styles.profileFieldContainer}>
              <Text>Height in cm: </Text>
              <TextInput 
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
              <Text>Weight in Kg: </Text>
              <TextInput 
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
              <Text>Age: </Text>
              <TextInput 
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
              <Text>Activity level: </Text>
              <TextInput
                placeholder='Enter Activity level'
                value={uactivitylvl}
                onChangeText={setUactivitylvl}
              />  
            </View>
            <View style={styles.profileFieldContainer}> 
              <Button onPress={() => setIsMale('male')} color="#87cefa" title='Male'disabled={isMale==='male'}/>
              <Button onPress={() => setIsMale('female')} color="#db7093" title='Female'disabled={isMale==='female'}/>
            </View>
          </View>

          ) : (

            <View>
            <View style={styles.profileFieldContainer}>
              <Text>Height: </Text>
              <Text>{uheight} cm</Text>
            </View>
            <View style={styles.profileFieldContainer}>
              <Text>Weight: </Text>
              <Text>{uweight} Kg</Text>
            </View>
            <View style={styles.profileFieldContainer}> 
              <Text>Age: Yrs</Text>
              <Text>{uage}</Text>
            </View>
            <View style={styles.profileFieldContainer}>
              <Text>Allergies: </Text>
              <Text>{uallergies}</Text>
            </View>
            <View style={styles.profileFieldContainer}> 
              <Text>Activity level: </Text>
              <Text>{uactivitylvl}</Text>
            </View>
            <View style={styles.profileFieldContainer}> 
              <Text>Sex: </Text>
              <Text>{isMale}</Text>
            </View>
            <View style={styles.profileFieldContainer}> 
              <Text>BMR: </Text>
              <View>{bmr}</View>
            </View>
            
          </View>   
          )
        ) : (
          <View>
            <Text>Height not found</Text>
            <Text>Weight not found</Text>
            <Text>Age not found</Text>
            <Text>Allergies not found</Text>
            <Text>Activity level not found</Text>
            <Text>Sex not found</Text>
            <Text>BMR not calculated</Text>

          </View>
        )}
        <View>
          {editmode !== true ? <Button onPress={editUser} color="#daa520" title='Edit User'/> : undefined}
        </View>
        <View>
        {editmode !== false ? <Button onPress={saveEdit} color="#228b22" title='Save Edit'/> : undefined}
        </View>
        <View>
        {editmode !== false ? <Button onPress={deleteUser} color="#ff4500" title='Delete User'/> : undefined}
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