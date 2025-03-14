import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getStyles } from '../../../components/styles';
import { useTheme } from '../../../components/ThemeContext';
import { useLocalSearchParams } from 'expo-router';

export default function UserProfileScreen() {
  const { isDarkMode } = useTheme();
  const styles = getStyles();
  const navigation = useNavigation();
  const { userId } = useLocalSearchParams();

  const handleSettingsPress = () => {
    navigation.navigate('SettingsScreen');
  };

  const profiles = [
    { userId: '1', username: 'User One', imageUrl: 'https://cdn.7tv.app/emote/01F6R3BYFG000AXK0HX1P7HDWX/4x.avif' },
    { userId: '2', username: 'User Two', imageUrl: 'https://cdn.7tv.app/emote/01F6MQ33FG000FFJ97ZB8MWV52/4x.avif' },
    { userId: '3', username: 'User Three', imageUrl: 'https://cdn.7tv.app/emote/01F6NACCD80006SZ7ZW5FMWKWK/4x.avif' },
    { userId: '4', username: 'User Four', imageUrl: 'https://cdn.7tv.app/emote/01F8G9MDAR0009YQPYZYCKHYKQ/4x.avif' },
  ];

  const userProfile = profiles.find(profile => profile.userId === userId);

  return (
    <View style={styles.pageContainer}>
      {userProfile ? (
      <>
        <Image
        source={{ uri: userProfile.imageUrl }}
        style={styles.profileImageLarge}
        />
        <Text style={styles.usernameText}>{userProfile.username}</Text>
      </>
      ) : (
      <Text style={styles.usernameText}>User not found</Text>
      )}
      <TouchableOpacity style={styles.settingsButton} onPress={handleSettingsPress}>
      <Text style={styles.settingsButtonText}>Go to Settings</Text>
      </TouchableOpacity>
    </View>
  );
}