import React, { useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { Easing, Value, event, useCode, set } from 'react-native-reanimated';
import { usePanGestureHandler } from 'react-native-gesture-handler';

const DragDropScreen = () => {
  const pan = useRef(new Value(0)).current;

  const { gestureHandler, translation, velocity } = usePanGestureHandler();

  useCode(() => set(pan, translation.x), [translation]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={[
            styles.box,
            {
              transform: [{ translateX: pan }, { translateY: pan }],
            },
          ]}
        >
          <Text style={styles.boxText}>Drag Me!</Text>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  boxText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default DragDropScreen;
