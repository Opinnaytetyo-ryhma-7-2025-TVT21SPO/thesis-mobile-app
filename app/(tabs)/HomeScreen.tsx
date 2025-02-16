import React, { useState } from 'react';
import { View, StyleSheet, Platform, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Block from '@/components/Block';

export default function HomeScreen() {
  const [blockDimensions, setBlockDimensions] = useState({ width: 0, height: 0 });

  const handleLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setBlockDimensions({ width, height });
  };

  return (
    <ScrollView contentContainerStyle={styles.grid}>
      <Block>
        <View onLayout={handleLayout} style={styles.chartContainer}>
          <LineChart
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [
                {
                  data: [20, 45, 12, 80, 99, 43],
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
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </Block>
      <Block>
        <View onLayout={handleLayout} style={styles.chartContainer}>
          <LineChart
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [
                {
                  data: [95, 45, 122, 12, 99, 43],
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
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </Block>
      <Block>
        <View onLayout={handleLayout} style={styles.chartContainer}>
          <LineChart
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [
                {
                  data: [95, 45, 122, 12, 99, 43],
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
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </Block>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: Platform.OS === 'android' ? 'column' : 'row',
    flexWrap: Platform.OS === 'web' ? 'wrap' : 'nowrap',
    padding: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});