import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { Link } from 'expo-router';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Link replace href="../(tabs)/HomeScreen" asChild>
        <Pressable>
          <Text>Home olet nyt indexissä</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    textDecorationLine: 'underline',
  },
});