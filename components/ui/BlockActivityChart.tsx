import React, { useEffect, useState } from 'react';
import { View, LayoutChangeEvent } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { getStyles } from '../styles';
import { useTheme } from '../ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BlockChart: React.FC = () => {
  const [blockDimensions, setBlockDimensions] = useState({ width: 0, height: 0 });
  const { isDarkMode } = useTheme();
  const styles = getStyles();
    const [userActivityHistory, setUserActivityHistory] = useState([])
    const [alreadyLoadedData, setAlreadyLoadedData] = useState(false);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setBlockDimensions({ width, height });
  };


    const getAsyncStorageUserData = async () => {
      try {
        console.log(`Getting User Data`)
        const user = await AsyncStorage.getItem('user')
        if (user) {
          const userContent = JSON.parse(user)
          if(userContent.activityHistory) {
            setUserActivityHistory(userContent.activityHistory)
          }
        }
      } catch (e){
        console.log(`Storage Error: ${e}`)
      }
  
    }
  
    useEffect(() => {
      if(!alreadyLoadedData) {
        getAsyncStorageUserData()
        setAlreadyLoadedData(true);
      }
   
    }, [])
    


  const generateRandomData = () => {
    return Array.from({ length: 7 }, () => Math.floor(Math.random() * 100));
  };

  return (
    <View onLayout={handleLayout} style={styles.blockContainer}>
      <BarChart
        data={{
          labels: ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              data: userActivityHistory,
            },
          ],
        }}
        width={blockDimensions.width - 32} // Adjust width to fit within the Block
        height={blockDimensions.height - 32} // Adjust height to fit within the Block
        yAxisLabel=""
        yAxisSuffix="Activities"
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
        style={{
          borderRadius: 14,
        }}
      />
    </View>
  );
};

export default BlockChart;