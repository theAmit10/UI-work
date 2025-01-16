import React from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolation,
  runOnJS,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const SwipeableCardScreen = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotateZ = useSharedValue(0);

  // Reset Position as a Worklet
  const resetPosition = () => {
    'worklet';
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
    scale.value = withSpring(1);
    rotateZ.value = withSpring(0);
  };

  const onSwipeComplete = (direction) => {
    console.log(`Swiped ${direction}`);
  };

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      scale.value = interpolate(
        Math.abs(event.translationX),
        [0, width / 2],
        [1, 0.8],
        Extrapolation.CLAMP // Use correct Extrapolation syntax
      );
      rotateZ.value = interpolate(
        event.translationX,
        [-width / 2, width / 2],
        [-15, 15],
        Extrapolation.CLAMP // Use correct Extrapolation syntax
      );
    })
    .onEnd((event) => {
      const swipeThreshold = width / 3;
      if (event.translationX > swipeThreshold) {
        runOnJS(onSwipeComplete)('right');
      } else if (event.translationX < -swipeThreshold) {
        runOnJS(onSwipeComplete)('left');
      }
      resetPosition();
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
      { rotateZ: `${rotateZ.value}deg` },
    ],
  }));

  return (
    <View style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.card, animatedStyle]}>
          <Text style={styles.cardText}>Swipe Me!</Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  card: {
    width: width * 0.8,
    height: height * 0.5,
    backgroundColor: '#6200ea',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  cardText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SwipeableCardScreen;
