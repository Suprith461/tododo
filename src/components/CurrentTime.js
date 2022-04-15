import React from 'react';
import { useTime } from 'react-timer-hook';
import {Text,View} from 'react-native'

export default function CurrentTime() {
  const {
    seconds,
    minutes,
    hours,
    ampm,
  } = useTime({ format: '12-hour'});

  return (
    <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-end',marginHorizontal:10}}>
    
        <Text style={{color:'gray',fontWeight:'bold'}}>{hours==0?12:hours}:</Text>
        <Text style={{color:'gray',fontWeight:'bold'}}>{minutes} </Text>
        <Text style={{color:'gray',fontWeight:'bold'}}>{ampm}</Text>
     
    </View>
  );
}