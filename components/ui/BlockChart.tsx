import React, { useState } from 'react';
import { View, TouchableOpacity, Text, LayoutChangeEvent, useColorScheme } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { getStyles } from '../styles';
import { useTheme } from '../ThemeContext';

interface BlockProps {
  onDelete: () => void;
}

const Block: React.FC<BlockProps> = ({ onDelete }) => {
  const [blockDimensions, setBlockDimensions] = useState({ width: 0, height: 0 });
  const { isDarkMode } = useTheme();
  const styles = getStyles();


  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setBlockDimensions({ width, height });
  };

  const generateRandomData = () => {
    return Array.from({ length: 6 }, () => Math.floor(Math.random() * 100));
  };

  return (
    <View onLayout={handleLayout} style={styles.blockContainer}>
      <LineChart
        data={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              data: generateRandomData(),
            },
          ],
        }}
        width={blockDimensions.width - 32} // Adjust width to fit within the Block
        height={blockDimensions.height - 32} // Adjust height to fit within the Block
        yAxisLabel=""
        yAxisSuffix="kg"
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          borderRadius: 14,
        }}
      />
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Block;