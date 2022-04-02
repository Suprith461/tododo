import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BottomNavigator from './src/navigation/BottomNavigator'
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import 'react-native-gesture-handler';
export default function App() {
  return (
   
    
      <NavigationContainer>
        <StatusBar style="light" />
        <BottomNavigator/>
      </NavigationContainer>
     
     
    
    
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
