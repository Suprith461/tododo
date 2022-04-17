import { StyleSheet, Text, View ,TouchableOpacity, Modal,Easing,FlatList,Dimensions,TouchableHighlight,ToastAndroid} from 'react-native';
import {useDispatch,useSelector} from 'react-redux'
import  React,{useState,useRef,useEffect} from 'react';
import { MaterialCommunityIcons,MaterialIcons ,Ionicons} from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {readLabels,stopWatchSaveSession} from './../../redux/timer/timerActions'
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import Countdown from './../../components/Countdown'
import StopWatch from './../../components/StopWatch'
import CurrentTime from './../../components/CurrentTime'
import { useStopwatch } from 'react-timer-hook';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import { Audio } from 'expo-av';



export default function StopWatchScreen({navigation}){
    
    const [timerModalStatus,setTimerModalStatus]= useState(false);
    const [labelModalStatus,setLabelModalStatus] = useState(false);
    const [mode,setMode] = useState('stopwatch')
    const [labelName,setLabelName] = useState("unlabelled");
    const [labelColor,setLabelColor] = useState("black")
    const [pickedTime,setPickedTime] = useState(false);
    const [cuurentHeightOfLabelModal,setCurrentHeightOfLabelModal] = useState(20);
    const [distractionCount,setDistractionCount] = useState(0);
    const [distractionMessage,setDistractionMessage] = useState("Start working again!");
    const [abortModal,setAbortModal] = useState(false);
    const [musicModalShow,setMusicModalShow] = useState(false);
    const [sound,setSound] = useState(null);
    const [tempSound,setTempSound] = useState(null);
    const [audioName,setAudioName] = useState("None");
    const [finalAudioName,setFinalAudioName] = useState(null)
    const [targetHours,setTargetHours]=useState(0);
    const [activeTargetHour,setActiveTargetHour] = useState(0);
    const progressBarRef = useRef(null)

    const labelData = useSelector(state=>state.timer.readLabelsPayload);
    const height = Dimensions.get("screen").height
    
    const dispatch = useDispatch();
    const {
      seconds,
      minutes,
      hours,
      days,
      isRunning,
      start,
      pause,
      reset,
    } = useStopwatch({ autoStart: true });
    
    const distractionMessages = [
      "Don't get distracted!",
      "Focus on your work!",
      "Stop dreaming!",
      "Stay focused!"
  ];

  
  const audioData = [
    {id:0,audioName:"None",location:"None"},
    {id:1,audioName:"Tick-Tick",location:'../../../assets/tick-tick.wav'},
    {id:4,audioName:"Crickets",location:'../../../assets/cricket.wav'},
    {id:5,audioName:"Cafe",location:'../../../assets/cafe.wav'},
    {id:6,audioName:"Wind",location:'../../../assets/trees.wav'},
    {id:7,audioName:"Ocean",location:'../../../assets/ocean-waves.wav'},

  ]

  function returnTargetTimeData(){
    const res=[]
    let temp=0
    while(temp!=24){
      res.push(temp)
      temp=temp+0.5
    }
    return res
  }
   
   
    useEffect(()=>{
      //setLabelModalStatus(true)
      dispatch(readLabels())
      activateKeepAwake()

    },[navigation.isFocused()])

    useEffect(()=>{
      
      Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: false,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        playThroughEarpieceAndroid: false
     })
     
     ;return async ()=>{
      
      if(sound!=null){
        await sound.unloadasync()}
      } 
      
    },[navigation.isFocused()])

     //To start playing the sound automatically whenever finalaudio name changes 
    useEffect(async ()=>{
        console.log("finalAudio name useffect hook tyriggered")
        if(finalAudioName!=null && finalAudioName!="None"){
              playSound(finalAudioName)
          }
      
    },[finalAudioName])

    useEffect(async ()=>{
      if(tempSound!=null){
        await tempSound.playAsync().then(async ()=>{
          console.log('Playing Sound');
        })
      }
    },[tempSound])

   
    function handleAbort(){
      setAbortModal(true)
      
    }

    async function handleDiscard(){
      setAbortModal(false)
      deactivateKeepAwake()
      reset()
      setDistractionCount(0)
      if(finalAudioName!=null && sound!=null && finalAudioName!="None"){
        await sound.unloadAsync();
      }
    }

    async function handleSave(){
      dispatch(stopWatchSaveSession({labelColor:labelColor,labelText:labelName,hours:hours,minutes:minutes,distractions:distractionCount}))
      ToastAndroid.show('Session Completed.', ToastAndroid.SHORT);
      setAbortModal(false)
      setDistractionCount(0)
      deactivateKeepAwake()
      reset()
      if(finalAudioName!=null && sound!=null && finalAudioName!="None"){
        await sound.unloadAsync();
      }
    }

    async function handlePause(){
      if(isRunning){
        pause()
        if(finalAudioName!=null && sound!=null && finalAudioName!="None"){
          await sound.pauseAsync()
        }
      }else{
        start()
        if(finalAudioName!=null && sound!=null && finalAudioName!="None"){
          
          await sound.playAsync();
        }
        
      }
    }
   

   
    


    function returnPath(path){
      if(path=='../../../assets/tick-tick.wav'){
        return require('../../../assets/tick-tick.wav')
      }else if( path=='../../../assets/cricket.wav'){
        return require('../../../assets/cricket.wav')
      }else if(path=='../../../assets/cafe.wav'){
        return require('../../../assets/cafe.wav')
      }else if(path=='../../../assets/trees.wav'){
        return require('../../../assets/trees.wav')
      }else if(path=='../../../assets/ocean-waves.wav'){
        return require('../../../assets/ocean-waves.wav')
      }
    }

    async function playSound(path) {  
      console.log("path",path)
      if(path!=null && path!="None"){
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
          returnPath(path),{isLooping:true}
        );
        setSound(sound);
        console.log('Playing Sound');
        await sound.playAsync()
      }
     }

     async function playSoundOnce(path) { 
       if(path!=null && path!="None"){
        console.log('Loading Sound once');
        const {sound } = await Audio.Sound.createAsync(
          returnPath(path)
        );
        setTempSound(sound); 
       } 

     }

  function LabelComponent({color,index,label}){
    return(
      <TouchableOpacity style={{display:'flex',flexDirection:'row',height:50}} onPress={()=>{setLabelName(label);setLabelModalStatus(false);setLabelColor(color)}}>
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
      <TouchableOpacity style={{display:'flex',flexDirection:'row',height:50}} onPress={()=>{setLabelModalStatus(false);navigation.navigate("addLabel")}}>
        <View style={{display:'flex',flex:0.25,alignItems:'center',justifyContent:"center"}}>
        
        </View>
        <View style={{display:'flex',flex:0.75,justifyContent:"center"}}>
          <Text >Add label</Text>
        </View>
      </TouchableOpacity>
    )
  }

  function SelectWorkTargetComp({data}){
    return(
      <View style={{height:50,display:'flex',width:100,alignItems:'center',justifyContent:'center'}}>
        <Text style={{display:'flex',flex:1,fontSize:18,color:'gray'}}>{data}</Text>
      </View>
    )
  }
 

  
  function handleAudioSelection(location){

    setAudioName(location);
  }
  
  function AudioSelectionElement({name,location}){
    console.log("location and name",location,name)
    const checked = (location==audioName)?true:false;
    return(
      <TouchableOpacity onPress={()=>{handleAudioSelection(location);playSoundOnce(location)}} style={{width:'95%',borderBottomColor:'#00000050',borderBottomWidth:1,height:50,display:'flex',flexDirection:'row',alignItems:'center',paddingHorizontal:20}}>
        <Text style={{color:checked?'#299ec4':'black',fontWeight:'700',fontSize:15,display:'flex',flex:0.9}}>{name}</Text>
        {checked && <Ionicons name="checkmark-sharp" size={28} color="#299ec4" />}
      </TouchableOpacity>
    )
  }
  function HeaderAudioSelection(){
    return(
        <View style={{width:"95%",height:60,marginHorizontal:20,marginVertical:10,display:'flex',flexDirection:'row'}}>
          <TouchableOpacity onPress={()=>{setMusicModalShow(false)}} style={{diplay:'flex',flex:0.1}}><Ionicons name="arrow-back" size={24} color="black" /></TouchableOpacity>
          <Text style={{display:'flex',flex:0.7,color:'black',fontSize:18,fontWeight:'600',marginHorizontal:10}}>White Noise</Text>
          <TouchableOpacity onPress={()=>{console.log("SET pressed",audioName);setFinalAudioName(audioName);setMusicModalShow(false)}} style={{display:'flex',flex:0.2}}><Text style={{color:'black',fontSize:18,fontWeight:'600',marginHorizontal:10}}>SET</Text></TouchableOpacity>
        </View>
    );
  }
  

  function returnElapsedTime(){
    let res = hours
    if(minutes>30){
      res+=0.5
    }
    return res
  }


    return(
        <View style={styles.rootView}>
         

            <View style={{display:'flex',height:40,width:'100%',alignItems:'flex-end',justifyContent:'flex-end',marginTop:40,borderColor:'white'}}>
                <TouchableOpacity style={styles.targetHours} onPress={()=>{setTimerModalStatus(true)}}>
                    <Text style={{color:'white',fontSize:20,fontWeight:'700',marginHorizontal:10}}>{returnElapsedTime()}{returnElapsedTime()<targetHours && targetHours>0 && "/"+targetHours}</Text>
                </TouchableOpacity>
            </View>

            {/*Should show current time here */}
            <View style={{width:"100%",height:25,}}>
              <CurrentTime/>
            </View>

            {/*All the text part comes here */}
            <View style={{height:180,width:"90%",marginHorizontal:"5%",display:'flex',alignItems:'center',justifyContent:"flex-end"}}>
                  {mode=="timer"&&<TouchableOpacity><Text style={{color:"#FFFFFF90",fontSize:16}}>Comment/Note...</Text></TouchableOpacity>}
                  <Text style={{color:"#FFFFFF",fontSize:16}}>{distractionMessage}</Text>
                  
                  <StopWatch 
                    seconds={seconds}
                    minutes={minutes}
                    hours={hours}
                    days={days}
                    isRunning={isRunning}
                    start={start}
                    pause={pause}
                    reset={reset}/>
       
                  
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
                       distractionCount==0?
                       <TouchableOpacity onPress={()=>{setDistractionCount(distractionCount+1);setDistractionMessage(distractionMessages[(distractionCount+1)%4])}} style={{display:'flex',alignItems:'center',justifyContent:'center',flex:1}}>
                        <Text style={{color:'white',fontSize:15,fontWeight:"700"}}>
                          Hit Me
                        </Text>
                        <Text style={{color:'white',fontSize:15,fontWeight:"700"}}>
                          When you are distracted!
                        </Text>
                      </TouchableOpacity>:
                      <TouchableOpacity onPress={()=>{setDistractionCount(distractionCount+1);setDistractionMessage(distractionMessages[(distractionCount+1)%4])}} style={{display:'flex',alignItems:'center',justifyContent:'center',flex:1}}>
                        <Text style={{color:'white',fontSize:40,fontWeight:"700"}}>
                          {distractionCount}
                        </Text>
                       
                      </TouchableOpacity>
                    )
                  }
                </AnimatedCircularProgress>
            </View>

            {/*All the buttons like resume ,pause,stop */}
            <View style={{width:"100%",height:100,marginVertical:"2%",display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                  <TouchableOpacity onPress={()=>{setMusicModalShow(true);}} style={{position:'absolute',left:10}}><MaterialIcons name="music-note" size={25} color="#FFFFFF50" /></TouchableOpacity>
                  <TouchableOpacity style={{borderColor:"gray",borderWidth:0.5,paddingHorizontal:20,paddingVertical:10,borderRadius:20,marginHorizontal:5,width:125,display:'flex',alignItems:'center',justifyContent:'center'}} onPress={handlePause} ><Text style={{fontSize:13,color:'white'}}>{isRunning && "Pause"}{!isRunning && "Resume"}</Text></TouchableOpacity>
                  <TouchableOpacity style={{borderColor:"gray",borderWidth:0.5,paddingHorizontal:20,paddingVertical:10,borderRadius:20,marginHorizontal:5,width:125,display:'flex',alignItems:'center',justifyContent:'center'}} onPress={handleAbort}><Text style={{fontSize:13,color:'white'}}>Abort</Text></TouchableOpacity>
            </View>

            {/*Label section */}
            <TouchableOpacity style={{width:"100%",height:30,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}} onPress={()=>{setLabelModalStatus(true)}}>
              <Text style={{color:'gray',fontWeight:'500',paddingHorizontal:5}}>{labelName}</Text>
              
              
              <MaterialCommunityIcons name="label-outline" size={30} color="gray" style={{transform: [{rotateY: '180deg'}]}}/>
            </TouchableOpacity>

            {/*Modal for selecting music */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={musicModalShow}
              style={{display:'flex',flex:1,alignItems:'center',justifyContent:"center"}}
              onRequestClose={()=>setMusicModalShow(false)}
                
              
            >
              <View style={{display:'flex',flex:1,backgroundColor:'#FFFFFF20'}}>
                <TouchableOpacity style={{display:'flex',flex:0.2,width:'100%'}} onPress={()=>{setMusicModalShow(false)}}></TouchableOpacity>
                <View style={{display:"flex",flex:0.6,backgroundColor:'white',zIndex:10,marginHorizontal:20,borderRadius:5}}>
                
                  <FlatList
                    data={audioData}
                    CellRendererComponent={({item})=>(<AudioSelectionElement name={item.audioName} location={item.location}/>)}
                    keyExtractor={item=>item.id}
                    extraData={audioName}
                    ListHeaderComponent={HeaderAudioSelection}
                   />
                  
                </View>
                <TouchableOpacity style={{display:'flex',flex:0.2}} onPress={()=>{setMusicModalShow(false)}}></TouchableOpacity>
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

            {/*Modal for labels */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={labelModalStatus}
              style={{display:'flex'}}
              onRequestClose={()=>setLabelModalStatus(false)}
            
              
            >
              <TouchableOpacity style={{display:'flex',width:'100%',height:height-cuurentHeightOfLabelModal}} onPress={()=>{setLabelModalStatus(false)}}></TouchableOpacity>
              <View
                onLayout={(event)=>{
                  setCurrentHeightOfLabelModal(event.nativeEvent.layout.height)

                }} 
                style={{display:"flex",width:"100%",backgroundColor:'white',position:'absolute',bottom:5,zIndex:10}}>
                
                <FlatList
                  ListFooterComponent={LabelSectionFooter}
                  data={labelData}
                  CellRendererComponent={({item})=>(<LabelComponent color={item.labelColor} label={item.labelText} index={item.ID}/>)}
                  keyExtractor={item=>item.index}
                />

               
              
              </View>
            </Modal>



            {/*Modal in the center for selecting time */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={timerModalStatus}
                onRequestClose={() => {
               
                    setTimerModalStatus(!timerModalStatus);
                }}>
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
                          renderItem={(data, index) => {
                            
                            return <SelectWorkTargetComp data={data}/>
                          }}
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
                        <TouchableOpacity onPress={()=>setTimerModalStatus(!timerModalStatus)}><Text style={{color:'#34ebb1',margin:20,marginRight:30}}>CANCEL</Text></TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setTargetHours(activeTargetHour);setTimerModalStatus(false)}}><Text style={{color:'#34ebb1',margin:20,marginLeft:30}}>SET</Text></TouchableOpacity>
                        
                    </View>
                </View>
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
  