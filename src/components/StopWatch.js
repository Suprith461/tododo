import React from 'react';
import {Text,View,TouchableOpacity} from 'react-native'
import { useStopwatch } from 'react-timer-hook';


export default function Stopwatch({seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,}) {
        
return (
    <View style={{textAlign: 'center'}}>
      
      <View style={{display:'flex',flexDirection:'row'}}>
        {hours!=0 && <Text style={{color:'white',fontSize:50,fontWeight:'bold'}}>{hours<10 && 0}{hours}:</Text>}
        <Text style={{color:'white',fontSize:50,fontWeight:'bold'}}>{minutes<10 && 0}{minutes}:</Text>
        <Text style={{color:'white',fontSize:50,fontWeight:'bold'}}>{seconds<10 && 0}{seconds}</Text>
      </View>
      
    </View>
  );
}



