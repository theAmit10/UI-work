import {ImageBackground, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="transparent"
        translucent={true}
      />

      {/* Background Image */}
      <ImageBackground
        source={require('../../assets/image/background.jpg')}
        style={styles.backgroundImage}
        imageStyle={{resizeMode: 'cover'}} // Ensures consistent scaling
        blurRadius={20} // Adds a blur effect
      >
        {/* Overlay Content */}
        <SafeAreaView style={styles.overlay}>
          <Text style={styles.text}>Home</Text>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1, // Ensures the image background covers the entire screen
  },
  overlay: {
    flex: 1,
    padding: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
