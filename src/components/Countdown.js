import React,{useState,useEffect} from 'react';
import {Text,View,TouchableOpacity} from 'react-native'
import { useTimer } from 'react-timer-hook';

function MyTimer({setCountDownPause,setCountDownResume, expiryTimestamp,valueChanged ,setValueChanged,setTimerExpired,setIsCountDownRunning}) {

  
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
  } = useTimer({ expiryTimestamp, onExpire: () => {setTimerExpired(true)} });

  useEffect(()=>{
    if(valueChanged){
      restart(expiryTimestamp,true)
      setValueChanged(false)
      setCountDownPause(pause)
      setCountDownResume(start)
    }
  },[expiryTimestamp])

  useEffect(()=>{
    setIsCountDownRunning(isRunning)
  },[isRunning])

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

export default function Countdown({setCountDownResume,setCountDownPause,minutes,valueChanged,setValueChanged,setTimerExpired,setIsCountDownRunning}) {
  
  const time = new Date();
  time.setSeconds(time.getSeconds() + minutes*60); // 10 minutes timer
  return (
    <View>
      <MyTimer setCountDownPause={setCountDownPause} setCountDownResume={setCountDownResume} expiryTimestamp={time} valueChanged={valueChanged} setValueChanged={setValueChanged} setTimerExpired={setTimerExpired} setIsCountDownRunning={setIsCountDownRunning}/>
    </View>
  );
}

