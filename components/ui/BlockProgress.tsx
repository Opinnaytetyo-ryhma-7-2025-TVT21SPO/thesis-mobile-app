import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, LayoutChangeEvent, useColorScheme } from 'react-native';
import * as Progress from 'react-native-progress';
import { getStyles } from '../styles';
import { useTheme } from '../ThemeContext';

interface BlockProps {
  onDelete: () => void;
}

const BlockProgress: React.FC<BlockProps> = ({ onDelete }) => {
  const [blockDimensions, setBlockDimensions] = useState({ width: 0, height: 0 });
  const [progress, setProgress] = useState(0);
  const { isDarkMode } = useTheme();
  const styles = getStyles();

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setBlockDimensions({ width, height });
  };

  useEffect(() => {
    setProgress(Math.random());
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
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BlockProgress;