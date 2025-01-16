import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';

// Wave animation with React Native Reanimated
const WaveAnimation = () => {
  const { width, height } = Dimensions.get('window');
  const [waveOffset, setWaveOffset] = useState(new Animated.Value(0));

  // Wave path logic to create a sine wave
  const createWavePath = (offset) => {
    const path = [];
    for (let i = 0; i < width; i++) {
      const y = Math.sin((i + offset) / 100) * 20 + 100; // sine wave math
      path.push(`${i === 0 ? 'M' : 'L'} ${i} ${y}`);
    }
    path.push(`L ${width} ${height} L 0 ${height} Z`); // Close the path
    return path.join(' ');
  };

  // Reanimated wave animation
  const waveStyle = Animated.interpolateNode(waveOffset, {
    inputRange: [0, width],
    outputRange: [0, -width],
    extrapolate: Animated.Extrapolate.CLAMP,
  });

  // Start the animation
  useEffect(() => {
    const interval = setInterval(() => {
      setWaveOffset((prev) => prev + 1);
    }, 16); // Update every frame (60fps)

    return () => clearInterval(interval);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Svg width={width} height={height}>
          <Animated.Path
            d={createWavePath(waveOffset)}
            fill="lightblue"
            animatedProps={{
              d: Animated.interpolateNode(waveOffset, {
                inputRange: [0, width],
                outputRange: [0, -width],
              }),
            }}
          />
        </Svg>
      </View>
    </GestureHandlerRootView>
  );
};

export default WaveAnimation;
