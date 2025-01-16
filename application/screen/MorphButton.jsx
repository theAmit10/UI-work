


import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Easing,
} from 'react-native-reanimated';

const MorphButton = () => {
  const [loading, setLoading] = useState(false);

  // Shared values for animation
  const width = useSharedValue(200); // Button width
  const borderRadius = useSharedValue(10); // Border radius
  const textOpacity = useSharedValue(1); // Text opacity

  const handlePress = () => {
    setLoading(true);

    // Start animation
    width.value = withTiming(50, { duration: 500, easing: Easing.inOut(Easing.ease) });
    borderRadius.value = withTiming(50, { duration: 500, easing: Easing.inOut(Easing.ease) });
    textOpacity.value = withTiming(0, { duration: 200 });

    // Simulate an async operation
    setTimeout(() => {
      setLoading(false);

      // Revert animation
      width.value = withTiming(200, { duration: 500, easing: Easing.inOut(Easing.ease) });
      borderRadius.value = withTiming(10, { duration: 500, easing: Easing.inOut(Easing.ease) });
      textOpacity.value = withTiming(1, { duration: 200 });
    }, 3000);
  };

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => ({
    width: width.value,
    borderRadius: borderRadius.value,
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} disabled={loading}>
        <Animated.View style={[styles.button, animatedStyle]}>
          {loading ? (
            <Animated.View style={styles.spinner} />
          ) : (
            <Animated.Text style={[styles.text, textStyle]}>Click Me</Animated.Text>
          )}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#6200ee',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  spinner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'white',
    borderTopColor: 'transparent',
  },
});

export default MorphButton;
