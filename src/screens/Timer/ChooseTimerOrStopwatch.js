import { TouchableWithoutFeedback,StyleSheet,TextInput, Text, View ,TouchableOpacity, Modal,Easing,FlatList,Dimensions,TouchableHighlight,ToastAndroid} from 'react-native';
import {useDispatch,useSelector} from 'react-redux'
import  React,{useState,useRef,useEffect} from 'react';
import { MaterialCommunityIcons ,Entypo} from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {readLabels,stopWatchSaveSession} from './../../redux/timer/timerActions'
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import Countdown from './../../components/Countdown'
import StopWatch from './../../components/StopWatch'
import CurrentTime from './../../components/CurrentTime'
import { useStopwatch,useTime,useTimer } from 'react-timer-hook';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';

import ValuePicker from "react-native-picker-horizontal";



export default function ChooseTimerOrStopWatch({navigation}){
    const [timerModalStatus,setTimerModalStatus]= useState(false);
    const [labelModalStatus,setLabelModalStatus] = useState(false);
    const [targetHours,setTargetHours]=useState(0);
    const [activeTargetHour,setActiveTargetHour] = useState(0);
    const [mode,setMode] = useState('timer')
    const [commentsModal,setCommentsModal] = useState(false)
    const [labelName,setLabelName] = useState("unlabelled")
    const progressBarRef = useRef(null)
    const [pickedTime,setPickedTime] = useState(false);
    const [timerSettingsModal,setTimerSettingsModal] = useState(false)
    const clockRef = useRef();
    const [revise,setRevise] = useState("before") 
    const [labelColor,setLabelColor] = useState("black")
    
    const [sessions,setSessions] = useState(1)
    const [tempSessions,setTempSessions] = useState(1)

    const [breakTime,setBreakTime] = useState(1)
    const [breakTimeTemp,setBreakTimeTemp] = useState(1)

    const [reviseTime,setReviseTime] = useState(1)
    const [reviseTimeTemp,setReviseTimeTemp] = useState(1)

    const [workTime,setWorkTime] = useState(1)
    const [workTimeTemp,setWorkTimeTemp] = useState(1)

    const [countdownValueChanged,setCountDownValueChanged] = useState(false);
    const [timerExpired,setTimerExpired] = useState(false)
    const [abortModal,setAbortModal] = useState(false);

    const labelData = useSelector(state=>state.timer.readLabelsPayload);

    const [curentHeightOfLabelModal,setCurrentHeightOfLabelModal] = useState(20);
    const height = Dimensions.get("screen").height
    
    const dispatch = useDispatch();
    
    const [isCountdownRunning,setIsCountDownRunning] = useState(false);
    const [previouslyRunMode,setPreviouslyRunMode] = useState("focus") //revise,break
    
    const [distractionCount,setDistractionCount] = useState(0);
    const [distractionMessage,setDistractionMessage] = useState("Start working again!")
    const [comment,setComment] = useState("Comment/Note...")
    const [commentSecondary,setCommentSecondary] = useState("Comment/Note...")

    
    const [expiryTimeStamp,setExpiryTimeStamp] = useState()
    
    const currentTime = useTime({ format: '12-hour'});
    
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
    } = useTimer({ expiryTimeStamp ,autoStart:true});
  
   
   
    const distractionMessages = [
      "Don't get distracted!",
      "Focus on your work!",
      "Stop dreaming!",
      "Stay focused!"
  ];

  useEffect(()=>{
    const time = new Date();
    time.setSeconds(time.getSeconds() + workTime*60); // 10 minutes timer
    setExpiryTimeStamp(time)
    console.log("Worktime change detected")
  },[workTime])


  useEffect(()=>{
    if(countdownValueChanged){
      //restart(expiryTimeStamp,true)
      setCountDownValueChanged(false)
      console.log("Expiry timestamp changed")
    }
  },[expiryTimeStamp])
    
    
    //To handle abort,save and discard modal
    useEffect(()=>{
      console.log("sessions left",sessions)
      if(timerExpired && sessions==0){
        setAbortModal(true)
      }
    },[timerExpired])


    useEffect(()=>{
      if(timerExpired && sessions>0){
        if(previouslyRunMode=="revise" ){
          if(revise=="before"){
            setPreviouslyRunMode("focus")
          }else if(revise=="after" && sessions>=1){
            setPreviouslyRunMode("break")
            setSessions(sessions-1)
          }
        }else if(previouslyRunMode=="focus"){
          if(revise=="before" && sessions>=1){
            setPreviouslyRunMode("break")
            setSessions(sessions-1)
          }else if(revise=="after"){
            setPreviouslyRunMode("revise")
           
          }
        } else if(previouslyRunMode=="break"){
          if(revise=="before" && sessions>=1){
            setPreviouslyRunMode("revise")
            setSessions(sessions-1)
          }else if(revise=="after" && sessions>=1){
            setPreviouslyRunMode("focus")
            setSessions(sessions-1)
           
          }
        }
      }
    },[timerExpired])

    useEffect(()=>{
      if(previouslyRunMode=="focus" && sessions>0){
        setWorkTime(workTimeTemp)
        setCountDownValueChanged(true)
      }else if(previouslyRunMode=="break" && sessions>0){
        setWorkTime(breakTime)
        setCountDownValueChanged(true)
      }else if(previouslyRunMode=="revise" && sessions>0){
        setWorkTime(reviseTime)
        setCountDownValueChanged(true)
      }
    },[previouslyRunMode])
    
   //To retrieve saved labels on screen launch
    useEffect(()=>{
      dispatch(readLabels())

    },[navigation.isFocused()])

    

  
  async function handleSave(){
    dispatch(stopWatchSaveSession({labelColor:labelColor,labelText:labelName,hours:hours,minutes:minutes,distractions:distractionCount}))
    ToastAndroid.show('Session Completed.', ToastAndroid.SHORT);
    setAbortModal(false)
    setDistractionCount(0)
    deactivateKeepAwake()
    restart()
   
  }
  async function handleDiscard(){
    setAbortModal(false)
    deactivateKeepAwake()
    restart()
    setDistractionCount(0)
   
  }

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
    activateKeepAwake()
    setSessions(tempSessions)
    setWorkTime(workTimeTemp)
    setBreakTime(breakTimeTemp)
    setReviseTime(reviseTimeTemp)
    setCountDownValueChanged(true)
    
    if(revise=="after"){
      setPreviouslyRunMode("focus")
    }else if(revise=="before"){
      setPreviouslyRunMode("revise")
    }
    
    
    setTimerSettingsModal(false)
    navigation.replace("timerScreen",{sessions:tempSessions,workTime:workTimeTemp,breakTime:breakTimeTemp,revise:revise,reviseTime:reviseTimeTemp,countdownValueChanged:true,label:labelName,targetHours:targetHours,comment:comment,commentSecondary:commentSecondary})

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

  function handleReviseClick(){
    if(revise=="after"){
      setRevise("before")
    }else{
      setRevise("after")
    }
  }

  function labelCompOnPress({color,index,label}){
    console.log("Lable comp color",color)
    setLabelName(label);
    setLabelColor(color)
    setLabelModalStatus(false)
  }

  function returnElapsedTime(){
    let res = hours
    if(minutes>30){
      res+=0.5
    }
    return res
  }

  function returnTargetTimeData(){
    const res=[]
    let temp=0
    while(temp!=24){
      res.push(temp)
      temp=temp+0.5
    }
    return res
  }

  function labelSecFooterOnPress(){
    setLabelModalStatus(false);
    navigation.navigate("addLabel")
  }
  
  function handleLabelModalStatus(){
    setLabelModalStatus(!labelModalStatus)
  }
  
  function handleTimerModalStatus(){
    setTimerModalStatus(!timerModalStatus)
  }

  function handleCommentsModalStatus(){
    setCommentsModal(!commentsModal)
  }
  function handleDistractionCount(){
    setDistractionCount(distractionCount+1);
    setDistractionMessage(distractionMessages[(distractionCount+1)%4])
  }

  function handleTimerSettingsModal(){
    setTimerSettingsModal(!timerSettingsModal)
  }

  function hanldeStopwatchPress(){
   
    
    navigation.replace("stopWatchScreen")
  }

  function handleSetWorkTargetHours(){
    setTargetHours(activeTargetHour);
    setTimerModalStatus(false)
  }

  function handleSetComments(){
    setComment(commentSecondary);
    setCommentsModal(false)
  }

  function labelsModalOnLayout(event){
    setCurrentHeightOfLabelModal(event.nativeEvent.layout.height)


  }

  function handleStopWatchClick(){
    navigation.replace("stopWatchScreen")
  }

  

  function handlePauseAndResume(){
    if(isRunning){
      pause()
    }else if(!isRunning){
      resume()
    }
  }
  
  function hanldeAbortTimer(){
    setAbortModal(true)
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

  function SelectWorkTargetComp({data}){
    return(
      <View style={{height:50,display:'flex',width:100,alignItems:'center',justifyContent:'center'}}>
        <Text style={{display:'flex',flex:1,fontSize:18,color:'gray'}}>{data}</Text>
      </View>
    )
  }





function LabelComponent({color,index,label}){
  return(
    <TouchableOpacity style={{display:'flex',flexDirection:'row',height:50}} onPress={labelCompOnPress}>
      <View style={{display:'flex',flex:0.25,alignItems:'center',justifyContent:"center"}}>
        <View style={{height:10,width:10,borderRadius:10,backgroundColor:color}}></View>
      </View>
      <View style={{display:'flex',flex:0.75,justifyContent:"center"}}>
        <Text >{label}</Text>
      </View>
  </TouchableOpacity>
  )

}


function LabelSectionFooter(){
  return(
    <TouchableOpacity style={{display:'flex',flexDirection:'row',height:50}} onPress={labelSecFooterOnPress}>
      <View style={{display:'flex',flex:0.25,alignItems:'center',justifyContent:"center"}}>
      
      </View>
      <View style={{display:'flex',flex:0.75,justifyContent:"center"}}>
        <Text >Add label</Text>
      </View>
    </TouchableOpacity>
  )
}

  

  
  

  function InsideCircularProgress(){

    if( previouslyRunMode=="focus"){

    
    return(
      distractionCount==0?
                       <TouchableOpacity onPress={handleDistractionCount} style={{display:'flex',alignItems:'center',justifyContent:'center',flex:1,width:'100%'}}>
                        <Text style={{color:'white',fontSize:15,fontWeight:"700"}}>
                          Hit Me
                        </Text>
                        <Text style={{color:'white',fontSize:15,fontWeight:"700"}}>
                          When you are distracted!
                        </Text>
                      </TouchableOpacity>:
                      <TouchableOpacity onPress={handleDistractionCount} style={{display:'flex',alignItems:'center',justifyContent:'center',flex:1,width:'100%'}}>
                        <Text style={{color:'white',fontSize:40,fontWeight:"700"}}>
                          {distractionCount}
                        </Text>
                       
                      </TouchableOpacity>
      )
    }else if(previouslyRunMode=="break"){
      return(
      <TouchableOpacity style={{display:'flex',alignItems:'center',justifyContent:'center',flex:1,width:'100%'}}>
        <Text style={{color:'white',fontSize:15,fontWeight:"700"}}>
          Take a break
        </Text>
      
      </TouchableOpacity>)
    }else if(previouslyRunMode=="revise"){
      return(
        <TouchableOpacity  style={{display:'flex',alignItems:'center',justifyContent:'center',flex:1,width:'100%'}}>
            <Text style={{color:'white',fontSize:15,fontWeight:"700"}}>
                 Revise
            </Text>
        </TouchableOpacity>
      )
    }

  }

 
  function flatListLabelsRenderItems({item}){
    return <LabelComponent color={item.labelColor} label={item.labelText} index={item.ID}/>
  }
  function scrollPickerRenderItem(data, index){
                            
    return <SelectWorkTargetComp data={data}/>
  }

  
    return(
        <View style={styles.rootView}>
         

          <View style={{display:'flex',height:40,width:'100%',alignItems:'flex-end',justifyContent:'flex-end',marginTop:40,borderColor:'white'}}>
                <TouchableOpacity style={styles.targetHours} onPress={handleTimerModalStatus}>
                    <Text style={{color:'white',fontSize:20,fontWeight:'700',marginHorizontal:10}}>{returnElapsedTime()}{returnElapsedTime()<targetHours && targetHours>0 && "/"+targetHours}</Text>
                </TouchableOpacity>
            </View>

            {/*Should show current time here */}
            <View style={{width:"100%",height:25}}>
              <CurrentTime/>
            </View>

            {/*All the text part comes here */}
            <View style={{height:180,width:"90%",marginHorizontal:"5%",display:'flex',alignItems:'center',justifyContent:"flex-end"}}>
                  {mode=="timer"?<TouchableOpacity onPress={handleCommentsModalStatus}><Text style={{color:"#FFFFFF90",fontSize:16}}>{comment}</Text></TouchableOpacity>:null}
                  <Text style={{color:"#FFFFFF",fontSize:16}}>{distractionMessage}</Text>
                  
                  {mode=='timer'?
                  <View style={{textAlign: 'center'}}>
                    <View style={{display:'flex',flexDirection:'row'}}>
                      {hours!=0 && <Text style={{color:'white',fontSize:30}}>{hours<10 && 0}{hours}:</Text>}
                      <Text style={{color:'white',fontSize:50,fontWeight:'bold'}}>{minutes<10 && 0}{minutes}:</Text>
                      <Text style={{color:'white',fontSize:50,fontWeight:'bold'}}>{seconds<10 && 0}{seconds}</Text>
                    </View>
      
                  </View>

                  :<StopWatch/>}   
                  
            </View>
            

           {/*The circle */}
           <View style={{height:250,width:"90%",margin:'5%',display:'flex',alignItems:'center',alignContent:'center'}}>
                <AnimatedCircularProgress
                  ref={(ref) => progressBarRef.current = ref}
                  size={250}
                  width={8}
                  fill={0}
                  tintColor="black"
                  onAnimationComplete={() => console.log('onAnimationComplete')}
                  backgroundColor="#FFFFFF50" 
    
                >
                  {
                    ()=>(
                      <InsideCircularProgress/> 
                    )
                  }
                </AnimatedCircularProgress>
            </View>

            {/*Buttons Timer and stopwatch*/}
           
            <View style={{width:"90%",height:100,marginVertical:"5%",marginHorizontal:"3%",display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                  <TouchableOpacity onPress={handleTimerSettingsModal} style={{borderColor:"gray",borderWidth:0.5,paddingHorizontal:30,paddingVertical:10,borderRadius:20,marginHorizontal:5,width:135,display:'flex',alignItems:'center',justifyContent:'center'}} ><Text style={{fontSize:13,color:'white'}}>Timer</Text></TouchableOpacity>
                  <TouchableOpacity onPress={hanldeStopwatchPress} style={{borderColor:"gray",borderWidth:0.5,paddingHorizontal:20,paddingVertical:10,borderRadius:20,marginHorizontal:5,width:125,display:'flex',alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:13,color:'white'}}>Stopwatch</Text></TouchableOpacity>
            </View>
              
            {/* <View style={{width:"90%",height:100,borderWidth:1,borderColor:'white',marginVertical:"5%",width:"100%",display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                  <TouchableOpacity onPress={handlePauseAndResume} style={{borderColor:"gray",borderWidth:0.5,paddingHorizontal:20,paddingVertical:10,borderRadius:20,marginHorizontal:5,marginLeft:60,width:100,display:'flex',alignItems:'center',justifyContent:'center'}} ><Text style={{fontSize:13,color:'white'}}>{!isRunning?"Resume":"Pause"}</Text></TouchableOpacity>
                  <TouchableOpacity onPress={hanldeAbortTimer} style={{borderColor:"gray",borderWidth:0.5,paddingHorizontal:20,paddingVertical:10,borderRadius:20,marginHorizontal:5,width:90,display:'flex',alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:13,color:'white'}}>Abort</Text></TouchableOpacity>
                  <TouchableOpacity onPress={hanldeStopwatchPress} style={{borderColor:"gray",borderWidth:0.5,height:40,width:40,borderRadius:40,marginLeft:10,display:'flex',alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:10,color:'white'}}>Skip</Text></TouchableOpacity>
            </View> */}

            {/*Label section */}
            <TouchableOpacity style={{width:"100%",height:30,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}} onPress={handleLabelModalStatus}>
              <Text style={{color:'gray',fontWeight:'500',paddingHorizontal:5}}>{labelName}</Text>
              
              
              <MaterialCommunityIcons name="label-outline" size={30} color="gray" style={{transform: [{rotateY: '180deg'}]}}/>
            </TouchableOpacity>


            <View style={{width:"100%",height:30,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}} onPress={handleLabelModalStatus}>
              <Text style={{color:'gray',fontWeight:'500',paddingHorizontal:5}}>Sessions {sessions}/{tempSessions}</Text>
            </View>
              

           {/*Labels Modal*/}
            <Modal
              useNativeDriver={true}
              animationType="slide"
              transparent={true}
              visible={labelModalStatus}
              style={{display:'flex'}}
              onRequestClose={handleLabelModalStatus}
              hardwareAccelerated={true}
            >
              <TouchableOpacity style={{display:'flex',width:'100%',height:height-curentHeightOfLabelModal}} onPress={handleLabelModalStatus}></TouchableOpacity>
              <View
                onLayout={labelsModalOnLayout} 
                style={{display:"flex",width:"100%",backgroundColor:'white',position:'absolute',bottom:5,zIndex:10}}>
                
                <FlatList
                  ListFooterComponent={LabelSectionFooter}
                  data={labelData}
                  renderItem={flatListLabelsRenderItems}
                  keyExtractor={item=>item.index}
                  initialNumToRender={10}
                  windowSize={10}
                  removeClippedSubviews={true}
                />

               
              
              </View>
            </Modal>



            {/*Modal in the center for selecting time */}
            <Modal
                hardwareAccelerated={true}
                useNativeDriver={true}
                animationType="slide"
                transparent={true}
                visible={timerModalStatus}
                onRequestClose={handleTimerModalStatus}>
                <View style={styles.centeredView}>

                <View style={styles.modalView}>

                    <View style={{borderBottomWidth:0.5}}>
                        <Text style={styles.modalText}>Today's work target(hours)</Text>
                    </View>

                    <View style={{height:300}}>
                        <ScrollPicker
                          dataSource={returnTargetTimeData()}
                          selectedIndex={0}
                          activeItemTextStyle={{color:'black',fontSize:20,fontWeight:'500'}}
                          renderItem={scrollPickerRenderItem}
                          onValueChange={(data, selectedIndex) => {
                            setActiveTargetHour(data)
                          }}
                          wrapperHeight={300}
                          wrapperColor={"white"}
                          itemHeight={100}
                          highlightColor='black'
                          highlightBorderWidth={2}
                          
                         
                        />
                    </View>
                    <View style={{display:'flex',flexDirection:'row',alignItems:'flex-end', justifyContent:'flex-end'}}>
                        <TouchableOpacity onPress={handleTimerModalStatus}><Text style={{color:'#34ebb1',margin:20,marginRight:30}}>CANCEL</Text></TouchableOpacity>
                        <TouchableOpacity onPress={handleSetWorkTargetHours}><Text style={{color:'#34ebb1',margin:20,marginLeft:30}}>SET</Text></TouchableOpacity>
                        
                    </View>
                </View>
                </View>
            </Modal>
            {/*Modal for comments */}
            <Modal
              hardwareAccelerated={true}
              useNativeDriver={true}
              animationType="fade"
              transparent={true}
              visible={commentsModal}
              style={{display:'flex',flex:1,alignItems:'center',justifyContent:"center"}}
              onRequestClose={handleCommentsModalStatus}
                
              
            >
              <View style={{display:'flex',flex:1,backgroundColor:'#FFFFFF20'}}>
                <TouchableOpacity style={{display:'flex',flex:0.3,width:'100%'}} onPress={handleCommentsModalStatus}></TouchableOpacity>
                <View style={{display:"flex",flex:0.3,backgroundColor:'white',zIndex:10,marginHorizontal:20,borderRadius:5,alignItems:'center'}}>
                  <TextInput
                    onChangeText={(text)=>{setCommentSecondary(text)}}
                    style={{height:150,width:'80%',borderWidth:1,borderColor:'black',fontSize:20,fontWeight:'bold',paddingHorizontal:10,marginVertical:15}}
                    placeholder={"Comment/Note"}
                    autoFocus
                    maxLength={40}
                    multiline
                  />
                  <View style={{display:'flex',flexDirection:'row',alignItems:'flex-end', justifyContent:'flex-end'}}>
                        <TouchableOpacity onPres={handleCommentsModalStatus} ><Text style={{color:'#34ebb1',margin:20,marginRight:30}}>CANCEL</Text></TouchableOpacity>
                        <TouchableOpacity onPress={handleSetComments}><Text style={{color:'#34ebb1',margin:20,marginLeft:30}}>SET</Text></TouchableOpacity>
                        
                    </View>
                
                </View>
                <TouchableOpacity style={{display:'flex',flex:0.4}} onPress={handleCommentsModalStatus}></TouchableOpacity>
              </View>
            </Modal>

            {/*Timer settings modal */}
            <Modal
              hardwareAccelerated={true}
              useNativeDriver={true}
              animationType="slide"
              transparent={true}
              visible={timerSettingsModal}
              style={{display:'flex'}}
              onRequestClose={handleTimerSettingsModal}
            >
              <TouchableOpacity style={{display:'flex',width:'100%',height:"33%",borderColor:'white'}} onPress={handleTimerSettingsModal}></TouchableOpacity>
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
                        onChange={(index) => setReviseTimeTemp(index+1)}
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
                        onChange={(index) => setBreakTimeTemp(index+1)}
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
                        onChange={(index)=>setTempSessions(index+1)}
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

                {/*label button */}
                <TouchableOpacity style={{width:"100%",height:60,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}} onPress={handleLabelModalStatus}>
                  <MaterialCommunityIcons name="label-outline" size={40} color="#00000080" />
                  <Text style={{color:'black',fontWeight:'500',paddingHorizontal:15,fontSize:18}}>{labelName}</Text>
                </TouchableOpacity>

                
               
                <TouchableOpacity style={{width:"100%",height:60,borderWidth:1,borderColor:'white',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}} onPress={handleCommentsModalStatus}>
                  <Entypo name="text" size={40} color="#00000080" />
                  <Text style={{color:'black',fontWeight:'500',paddingHorizontal:15,fontSize:18}}>{comment}</Text>
                </TouchableOpacity>

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
            </Modal>

            {/*Modal displayed when abort is pressed */}
            <Modal
              animationType="fade"
              transparent={true}
              visible={abortModal}
              style={{display:'flex',flex:1,alignItems:'center',justifyContent:"center"}}
              onRequestClose={()=>setAbortModal(false)}
                
              
            >
              <View style={{display:'flex',flex:1,backgroundColor:'#FFFFFF20'}}>
                <TouchableOpacity style={{display:'flex',flex:0.32,width:'100%'}} onPress={()=>{setAbortModal(false)}}></TouchableOpacity>
                <View style={{display:"flex",flex:0.2,backgroundColor:'white',zIndex:10,marginHorizontal:20,borderRadius:5}}>
                    <TouchableHighlight underlayColor="#60aadb40" onPress={handleSave} style={{display:"flex",alignItems:'center',justifyContent:"center",flex:0.33}}><Text style={{color:'green',fontWeight:'700',fontSize:18}}>Completed, Save the Session</Text></TouchableHighlight>
                    <TouchableHighlight underlayColor="#60aadb40" onPress={handleDiscard} style={{display:"flex",alignItems:'center',justifyContent:"center",flex:0.33}}><Text style={{color:'red',fontWeight:'700',fontSize:18}}>Discard</Text></TouchableHighlight>
                    <TouchableHighlight underlayColor="#60aadb40" onPress={()=>{setAbortModal(false)}} style={{display:"flex",alignItems:'center',justifyContent:"center",flex:0.33}}><Text style={{color:'yellow',fontWeight:'700',fontSize:18}}>Continue working</Text></TouchableHighlight>
                  
                
                </View>
                <TouchableOpacity style={{display:'flex',flex:0.48}} onPress={()=>{setAbortModal(false)}}></TouchableOpacity>
              </View>
            </Modal>

            
        </View>
    );
}

const styles = StyleSheet.create({
    rootView: {
      display:'flex',
      flex:1,
      flexDirection:'column',
      backgroundColor:'black'
    },
    targetHours:{
        display:'flex',
        flexDirection:'row',
        backgroundColor:"#FFFFFF40",
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderTopLeftRadius:20,
        borderBottomLeftRadius:20,
        width:80
    },centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width:"90%",
        height:450
      },
       
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize:18,
        marginHorizontal:50

        
      },
  
  });
  