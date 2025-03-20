import React, { useState, useEffect } from 'react';
import { View, LayoutChangeEvent, Button } from 'react-native';
import * as Progress from 'react-native-progress';
import { getStyles } from '../styles';
import { useTheme } from '../ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BlockProgress: React.FC = () => {
  const [blockDimensions, setBlockDimensions] = useState({ width: 0, height: 0 });
  const [progress, setProgress] = useState(0);
  const { isDarkMode } = useTheme();
  const styles = getStyles();

  interface IUserData {
    username: string,
    height: string,
    weight: string,
    gender: string,
    allergies: string,
    activitylvl: string
    activityHistory: number
  }

  const [reload, setReload] = useState<number>(0)
  const [userData, setUserData] = useState<IUserData | null>(null)
  const [uactivity, setUactivity] = useState<number>(0)

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setBlockDimensions({ width, height });
  };



  async function saveEdit() {
    try{
      setUactivity(uactivity + 1)
      console.log('uactivity: ', uactivity)
      const user = {
        activityHistory: uactivity,
      }
      console.log(`Editing  User`)
      await AsyncStorage.setItem('user', JSON.stringify(user))
      console.log(`User Edited`)
    } catch (e) {
      console.log(`Storage Error: ${e}`)
    } finally{
      setReload(reload + 1)
      console.log('reload: ', reload)
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
          console.log('user data: ', userContent)
          setUactivity(userContent.activityHistory)
          return setUserData(userContent)
        }
      } catch (e){
        console.log(`Storage Error: ${e}`)
      }
    }
    getUserData()
  }, [reload])

  useEffect(() => {
    setProgress(progress);
    console.log('progress: ', progress)
  }, []);

  const circleSize = Math.min(blockDimensions.width - 32, blockDimensions.height - 32);

  return (
    <View onLayout={handleLayout} style={styles.blockContainer}>
      <Progress.Circle
        progress={progress}
        size={circleSize}
        color="#e26a00"
        unfilledColor="#f3f3f3"
        borderWidth={0}
        thickness={10}
        showsText={true}
        formatText={() => `${Math.round(progress * 100)}%`}
        textStyle={styles.progressText}
      />
    <View>
      <Button title="+1" onPress={saveEdit}/>
    </View>
    </View>
  );
};

export default BlockProgress;