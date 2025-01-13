import {Button, View} from 'react-native';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';

export default function Main() {
  const width = useSharedValue(100);

  const handlePress = () => {
    width.value = withSpring(width.value + 50);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
      }}>
      <Animated.View
        style={{
          width,
          height: 100,
          backgroundColor: 'violet',
          borderRadius: 10,
        }}
      />
      <Button onPress={handlePress} title="Click me" color="red" />
    </View>
  );
}
