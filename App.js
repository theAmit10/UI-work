import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import './global.css';
import Main from './application/screen/Main';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView>
      <Main />
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
