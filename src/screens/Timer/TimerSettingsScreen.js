import React,{useState,useEffect} from 'react';
import {Text,View,TouchableOpacity} from 'react-native'
import { useStopwatch,useTime } from 'react-timer-hook';

import ValuePicker from "react-native-picker-horizontal";

export default function TimerSettingsScreen(){
    const [revise,setRevise] = useState("before") 
    
    const [sessions,setSessions] = useState(1)
    const [tempSessions,setTempSessions] = useState(1)

    const [breakTime,setBreakTime] = useState(1)
    const [breakTimeTemp,setBreakTimeTemp] = useState(1)

    const [reviseTime,setReviseTime] = useState(1)
    const [reviseTimeTemp,setReviseTimeTemp] = useState(1)

    const [workTime,setWorkTime] = useState(1)
    const [workTimeTemp,setWorkTimeTemp] = useState(1)

    useEffect(()=>{
        console.log("work time changed",workTime)
    },[workTime])

  
    const currentTime = useTime({ format: '12-hour'});

    function valuePickerInterpolateScale(index, itemWidth){
        return { inputRange: [
           itemWidth * (index - 3),
           itemWidth * (index - 2),
           itemWidth * (index - 1),
           itemWidth * index,
           itemWidth * (index + 1),
           itemWidth * (index + 2),
           itemWidth * (index + 3),
         ],
         outputRange: [1,1, 1, 1.8, 1, 1,1]}
       }
     
       function valuePickerInterpolateOpacity(index, itemWidth){
         return {inputRange: [
           itemWidth * (index - 3),
           itemWidth * (index - 2),
           itemWidth * (index - 1),
           itemWidth * index,
           itemWidth * (index + 1),
           itemWidth * (index + 2),
           itemWidth * (index + 3),
         ],
         outputRange: [0.5,0.5, 0.5, 1, 0.5, 0.5,0.5]}
       }
       

    function returnWorkData(){
        const res=[]
        for(let i=1;i<181;i++){
          res.push(i)
        }
    
      }
    
      function returnWorkData(){
        const Items = Array.from(Array(181).keys())
        return Items.slice(1,181)
    
      }
    
      function returnReviseData(){
        const Items = Array.from(Array(121).keys())
        return Items.slice(1,121)
    
      }
    
      function returnBreakData(){
        const Items = Array.from(Array(181).keys())
        return Items.slice(1,121)
    
      }
    
      function returnSessionsData(){
        const Items = Array.from(Array(25).keys())
        return Items.slice(1,25)
    
      }
      function startTimer(){
        setSessions(tempSessions)
        setWorkTime(workTimeTemp)
        setBreakTime(breakTimeTemp)
        setReviseTime(reviseTimeTemp)
        //setTimerSettingsModal(false)
      }

      function calculateTimerEndTime(){
        const totalTime = sessions*(workTime+reviseTime+breakTime)
        const hoursR = Math.floor(totalTime/60)
        const minutes = (totalTime-hoursR*60)
        let resHour = currentTime.hours+hoursR
        let resAmPm = currentTime.ampm
        let resMinutes = minutes+currentTime.minutes
        if(resMinutes>60){
          resHour=resHour+1
          resMinutes=resMinutes-60
        }
        if(resHour>=12){
          if(resAmPm=="am"){
            resAmPm="pm"
          }else if(resAmPm=="pm"){
            resAmPm="am"
          }
        }
        return ""+resHour+" : "+resMinutes+" "+resAmPm
        
  
  
        
  
      }

      function valuePickerRenderItem(item){
        return <ValuePickerChild item={item}/>
      }

      
    function ValuePickerChild({item}){
        return(
          <Text style={{
            width: 40,
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: "center",
            fontWeight:'500',
            color:'black'
           
          }}>{item}</Text>
        )
      }

      function handleReviseClick(){
        if(revise=="after"){
          setRevise("before")
        }else{
          setRevise("after")
        }
      }

    return(
        <View style={{display:"flex",width:"100%",backgroundColor:'white',position:'absolute',bottom:5,zIndex:10,height:"67%"}}>
                <View style={{width:'100%',height:45,alignItems:'center',borderColor:'black',marginTop:10,justifyContent:'center',flexDirection:'row',paddingHorizontal:15}}>
                    <Text style={{flex:0.15,fontSize:15,color:'gray',fontWeight:'700',paddingHorizontal:5}}>Work</Text>
                    <View style={{flex:0.65,alignItems:'center',justifyContent:"center"}}>
                      <ValuePicker
                        useNativeDriver={true}
                        onChange={(index) => setWorkTimeTemp(index)}
                        style={{flex: 1,backgroundColor: '#fff',alignItems: 'center',justifyContent: 'center'}}
                        data={returnWorkData()}
                        passToFlatList={{useNativeDriver:true,windowSize:10,removeClippedSubviews:true,initialNumToRender: 10}}
                        renderItem={valuePickerRenderItem}
                        itemWidth={40}
                        mark={null}
                        interpolateScale={valuePickerInterpolateScale}
                        interpolateOpacity={valuePickerInterpolateOpacity}
                      />
            
                    </View>
                    <Text  style={{flex:0.2,fontSize:15,color:'gray',fontWeight:'700',paddingHorizontal:10}}>minutes</Text>
                </View>

                <View style={{width:'100%',height:45,alignItems:'center',borderColor:'black',marginTop:10,justifyContent:'center',flexDirection:'row',paddingHorizontal:15}}>
                    <Text style={{flex:0.15,fontSize:15,color:'gray',fontWeight:'700',paddingHorizontal:5}}>Revise</Text>
                    <View style={{flex:0.65,alignItems:'center',justifyContent:"center"}}>
                      <ValuePicker
                        useNativeDriver={true}
                        passToFlatList={{useNativeDriver:true,windowSize:10,removeClippedSubviews:true,initialNumToRender: 10}}
                        onChange={(index) => setReviseTimeTemp(index)}
                        style={{flex: 1,backgroundColor: '#fff',alignItems: 'center',justifyContent: 'center'}}
                        data={returnReviseData()}
                        renderItem={valuePickerRenderItem}
                        itemWidth={40}
                        mark={null}
                        interpolateScale={valuePickerInterpolateScale}
                        interpolateOpacity={valuePickerInterpolateOpacity}
                      />
            
                    </View>
                    <Text  style={{flex:0.2,fontSize:15,color:'gray',fontWeight:'700',paddingHorizontal:10}}>minutes</Text>
                </View>

                <View style={{width:'100%',height:45,alignItems:'center',borderColor:'black',marginTop:10,justifyContent:'center',flexDirection:'row',paddingHorizontal:15}}>
                    <Text style={{flex:0.15,fontSize:15,color:'gray',fontWeight:'700',paddingHorizontal:5}}>Break</Text>
                    <View style={{flex:0.65,alignItems:'center',justifyContent:"center"}}>
                      <ValuePicker
                        useNativeDriver={true}
                        passToFlatList={{useNativeDriver:true,windowSize:10,removeClippedSubviews:true,initialNumToRender: 10}}
                        onChange={(index) => setBreakTimeTemp(index)}
                        style={{flex: 1,backgroundColor: '#fff',alignItems: 'center',justifyContent: 'center'}}
                        data={returnBreakData()}
                        renderItem={valuePickerRenderItem}
                        itemWidth={40}
                        mark={null}
                        interpolateScale={valuePickerInterpolateScale}
                        interpolateOpacity={valuePickerInterpolateOpacity}
                      />
            
                    </View>
                    <Text  style={{flex:0.2,fontSize:15,color:'gray',fontWeight:'700',paddingHorizontal:10}}>minutes</Text>
                </View>

                <View style={{width:'100%',height:45,alignItems:'center',borderColor:'black',marginTop:10,justifyContent:'center',flexDirection:'row',paddingHorizontal:15}}>
                    <Text style={{flex:0.2,fontSize:15,color:'gray',fontWeight:'700',paddingHorizontal:5}}>Sessions</Text>
                    <View style={{flex:0.8,alignItems:'center',justifyContent:"center",paddingLeft:15}}>
                      <ValuePicker
                        useNativeDriver={true}
                        passToFlatList={{useNativeDriver:true,windowSize:10,removeClippedSubviews:true,initialNumToRender: 10}}
                        onChange={(index)=>setTempSessions(index)}
                        style={{flex: 1,backgroundColor: '#fff',alignItems: 'center',justifyContent: 'center'}}
                        data={returnSessionsData()}
                        renderItem={valuePickerRenderItem}
                        itemWidth={40}
                        mark={null}
                        interpolateScale={valuePickerInterpolateScale}
                        interpolateOpacity={valuePickerInterpolateOpacity}
                      />
            
                    </View>
                   
                </View>

                {/*Revisebefore and reviseafter button */}
                <View style={{height:80,width:'100%',borderColor:'black',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                  <TouchableOpacity onPress={handleReviseClick} style={{borderWidth:revise=="before"?0:1,borderColor:'gray',borderRadius:20,paddingHorizontal:15,paddingVertical:5,marginHorizontal:10,backgroundColor:revise=="before"?"#00acc2":'white'}}><Text style={{color:revise=="before"?"white":'gray'}}>Revise before</Text></TouchableOpacity>
                  <TouchableOpacity onPress={handleReviseClick} style={{borderWidth:revise=="after"?0:1,borderColor:'gray',borderRadius:20,paddingHorizontal:15,paddingVertical:5,marginHorizontal:10,backgroundColor:revise=="after"?"#00acc2":'white'}}><Text style={{color:revise=="after"?"white":'gray'}}>Revise After</Text></TouchableOpacity>
                </View>

                {/*label button 
                <TouchableOpacity style={{width:"100%",height:60,borderWidth:1,borderColor:'white',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}} onPress={handleLabelModalStatus}>
                  <MaterialCommunityIcons name="label-outline" size={40} color="#00000080" />
                  <Text style={{color:'black',fontWeight:'500',paddingHorizontal:15,fontSize:18}}>{labelName}</Text>
                </TouchableOpacity>

               
                <TouchableOpacity style={{width:"100%",height:60,borderWidth:1,borderColor:'white',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}} onPress={handleCommentsModalStatus}>
                  <Entypo name="text" size={40} color="#00000080" />
                  <Text style={{color:'black',fontWeight:'500',paddingHorizontal:15,fontSize:18}}>{comment}</Text>
                </TouchableOpacity>*/}

                {/*start button */}
                <View style={{height:80,width:'100%',borderColor:'black',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                  <TouchableOpacity onPress={startTimer} style={{borderRadius:60,paddingVertical:15,backgroundColor:"#00acc2",width:'80%',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color:"white",fontSize:18,fontWeight:'700'}}>Start</Text>
                  </TouchableOpacity>
                </View>

                {/*The timer will end text */}
               
                <View style={{paddingVertical:5,width:'100%',display:'flex',alignItems:'center',justifyContent:'center',height:30}}>
                    <Text style={{color:"gray",fontSize:15,fontWeight:'700'}}>Timer will finish at {calculateTimerEndTime()}</Text>
                </View>
               

        
              </View>
    )
}