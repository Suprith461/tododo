import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Timer from "./../screens/Timer/Timer"
import AddLabelScreen from "./../screens/Timer/AddLabelScreen"
import { createStackNavigator } from '@react-navigation/stack';

const TimerNavStack = createStackNavigator();

export function TimerStack(){
   
    return(
        <TimerNavStack.Navigator >
            <TimerNavStack.Screen name="timerMain" component={Timer} options={{headerShown:false}}/>
            <TimerNavStack.Screen name="addLabel" component={AddLabelScreen}/>
        </TimerNavStack.Navigator>
    )
}