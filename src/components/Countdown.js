import React from 'react';
import {Text,View,TouchableOpacity} from 'react-native'
import { useTimer } from 'react-timer-hook';

function MyTimer({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

return (
    <View style={{textAlign: 'center'}}>
      
      <View style={{display:'flex',flexDirection:'row'}}>
        {hours!=0 && <Text style={{color:'white',fontSize:30}}>{hours<10 && 0}{hours}:</Text>}
        <Text style={{color:'white',fontSize:50,fontWeight:'bold'}}>{minutes<10 && 0}{minutes}:</Text>
        <Text style={{color:'white',fontSize:50,fontWeight:'bold'}}>{seconds<10 && 0}{seconds}</Text>
      </View>
      
    </View>
  );
}

export default function Countdown() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 180); // 10 minutes timer
  return (
    <View>
      <MyTimer expiryTimestamp={time} />
    </View>
  );
}

