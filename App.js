import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BottomNavigator from './src/navigation/BottomNavigator'
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/redux/store'

import 'react-native-gesture-handler';
export default function App() {
  return (
   
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="transluscent" />
        <BottomNavigator/>
      </NavigationContainer>
    </Provider>
     
     
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
