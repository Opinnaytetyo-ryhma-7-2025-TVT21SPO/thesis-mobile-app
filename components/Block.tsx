import React from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import { ReactNode } from 'react';

const { width, height } = Dimensions.get('window');

const Block = ({ children }: { children: ReactNode }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: 800,
    maxWidth: Platform.OS === 'android' ? width - 32 : (width / 2) - 32,
    height: 600,
    maxHeight: Platform.OS === 'android' ? height / 3 : height / 4,
    padding: 16,
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
});

export default Block;