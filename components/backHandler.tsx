import { View, Text, BackHandler } from 'react-native'
import { useEffect } from 'react'
import React from 'react'
import { useRouter } from 'expo-router'

const useBackHandler = () => {
  const router = useRouter()

  useEffect(() => {
    const onBackPress = () => {
        router.back()
        return true;
    }

    BackHandler.addEventListener('hardwareBackPress', onBackPress)

    return () => 
      BackHandler.removeEventListener('hardwareBackPress', onBackPress)
  }, []);
  
    return null
}

export default useBackHandler