import { StyleSheet,TextInput, Text, View ,TouchableOpacity, Modal,Easing,FlatList,Dimensions,TouchableHighlight} from 'react-native';
import {useDispatch,useSelector} from 'react-redux'
import  React,{useState,useRef,useEffect} from 'react';
import { MaterialCommunityIcons ,Entypo} from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {readLabels} from './../../redux/timer/timerActions'
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import Countdown from './../../components/Countdown'
import StopWatch from './../../components/StopWatch'
import CurrentTime from './../../components/CurrentTime'
import { useStopwatch } from 'react-timer-hook';
import HorizontalPicker from '@vseslav/react-native-horizontal-picker';
import ValuePicker from "react-native-picker-horizontal";


export default function Timer({navigation}){
    const [timerModalStatus,setTimerModalStatus]= useState(false);
    const [labelModalStatus,setLabelModalStatus] = useState(false);
    const [targetHours,setTargetHours]=useState(0);
    const [activeTargetHour,setActiveTargetHour] = useState(0);
    const [mode,setMode] = useState('timer')
    const [commentsModal,setCommentsModal] = useState(false)
    const [labelName,setLabelName] = useState("unlabelled")
    const progressBarRef = useRef(null)
    const [pickedTime,setPickedTime] = useState(false);
    const [timerSettingsModal,setTimerSettingsModal] = useState(true)
    const clockRef = useRef();
    const [revise,setRevise] = useState("before") 
    

    const labelData = useSelector(state=>state.timer.readLabelsPayload);

    const [cuurentHeightOfLabelModal,setCurrentHeightOfLabelModal] = useState(20);
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
    const [distractionCount,setDistractionCount] = useState(0);
    const [distractionMessage,setDistractionMessage] = useState("Start working again!")
    const [comment,setComment] = useState("Comment/Note...")
    const [commentSecondary,setCommentSecondary] = useState("Comment/Note...")
    useEffect(()=>{
      //setLabelModalStatus(true)
      dispatch(readLabels())

    },[navigation.isFocused()])

    function SelectWorkTargetComp({data}){
      return(
        <View style={{height:50,display:'flex',width:100,alignItems:'center',justifyContent:'center'}}>
          <Text style={{display:'flex',flex:1,fontSize:18,color:'gray'}}>{data}</Text>
        </View>
      )
    }

  function LabelComponent({color,index,label}){
    return(
      <TouchableOpacity style={{display:'flex',flexDirection:'row',height:50}} onPress={()=>{setLabelName(label);setLabelModalStatus(false)}}>
        <View style={{display:'flex',flex:0.25,alignItems:'center',justifyContent:"center"}}>
          <View style={{height:10,width:10,borderRadius:10,backgroundColor:color}}></View>
        </View>
        <View style={{display:'flex',flex:0.75,justifyContent:"center"}}>
          <Text >{label}</Text>
        </View>
    </TouchableOpacity>
    )

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
  function TimerSettingsScrollComp({data}){
    return <Text style={{fontSize:18,fontWeight:'500',alignItems:'center',justifyContent:'center',marginHorizontal:10,borderWidth:1,padding:5,width:40,textAlign:'center'}}>{data}</Text>
  }
    
    return(
        <View style={styles.rootView}>
         

          <View style={{display:'flex',height:40,width:'100%',alignItems:'flex-end',justifyContent:'flex-end',marginTop:40,borderColor:'white'}}>
                <TouchableOpacity style={styles.targetHours} onPress={()=>{setTimerModalStatus(true)}}>
                    <Text style={{color:'white',fontSize:20,fontWeight:'700',marginHorizontal:10}}>{returnElapsedTime()}{returnElapsedTime()<targetHours && targetHours>0 && "/"+targetHours}</Text>
                </TouchableOpacity>
            </View>

            {/*Should show current time here */}
            <View style={{width:"100%",height:25,borderWidth:1,borderColor:'white'}}>
              <CurrentTime/>
            </View>

            {/*All the text part comes here */}
            <View style={{height:180,width:"90%",borderWidth:1,borderColor:'white',marginHorizontal:"5%",display:'flex',alignItems:'center',justifyContent:"flex-end"}}>
                  {mode=="timer"?<TouchableOpacity onPress={()=>{setCommentsModal(true)}}><Text style={{color:"#FFFFFF90",fontSize:16}}>{comment}</Text></TouchableOpacity>:null}
                  <Text style={{color:"#FFFFFF",fontSize:16}}>{distractionMessage}</Text>
                  
                  {mode=='timer'?<Countdown/>:<StopWatch/>}   
                  
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
            <View style={{width:"90%",height:100,borderWidth:1,borderColor:'white',margin:"5%",display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                  <TouchableOpacity style={{borderColor:"gray",borderWidth:0.5,paddingHorizontal:20,paddingVertical:10,borderRadius:20,marginHorizontal:5,width:125,display:'flex',alignItems:'center',justifyContent:'center'}} ><Text style={{fontSize:13,color:'white'}}>Timer</Text></TouchableOpacity>
                  <TouchableOpacity onPress={()=>{setMode('stopwatch');Fullscreen.enableFullScreen();}} style={{borderColor:"gray",borderWidth:0.5,paddingHorizontal:20,paddingVertical:10,borderRadius:20,marginHorizontal:5,width:125,display:'flex',alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:13,color:'white'}}>Stopwatch</Text></TouchableOpacity>
            </View>

            {/*Label section */}
            <TouchableOpacity style={{width:"100%",height:30,borderWidth:1,borderColor:'white',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}} onPress={()=>{setLabelModalStatus(true)}}>
              <Text style={{color:'gray',fontWeight:'500',paddingHorizontal:5}}>{labelName}</Text>
              
              
              <MaterialCommunityIcons name="label-outline" size={30} color="gray" style={{transform: [{rotateY: '180deg'}]}}/>
            </TouchableOpacity>
              

           {/*Labels Modal */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={labelModalStatus}
              style={{display:'flex'}}
              onRequestClose={()=>setLabelModalStatus(false)}
            
              
            >
              <TouchableOpacity style={{display:'flex',borderWidth:1,width:'100%',height:height-cuurentHeightOfLabelModal}} onPress={()=>{setLabelModalStatus(false)}}></TouchableOpacity>
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
            {/*Modal for comments */}
            <Modal
              animationType="fade"
              transparent={true}
              visible={commentsModal}
              style={{display:'flex',flex:1,alignItems:'center',justifyContent:"center"}}
              onRequestClose={()=>setAbortModal(false)}
                
              
            >
              <View style={{display:'flex',flex:1,backgroundColor:'#FFFFFF20'}}>
                <TouchableOpacity style={{display:'flex',flex:0.3,width:'100%'}} onPress={()=>{setCommentsModal(false)}}></TouchableOpacity>
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
                        <TouchableOpacity onPres={()=>{setCommentsModal(false)}} ><Text style={{color:'#34ebb1',margin:20,marginRight:30}}>CANCEL</Text></TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setComment(commentSecondary);setCommentsModal(false)}}><Text style={{color:'#34ebb1',margin:20,marginLeft:30}}>SET</Text></TouchableOpacity>
                        
                    </View>
                
                </View>
                <TouchableOpacity style={{display:'flex',flex:0.4}} onPress={()=>{setCommentsModal(false)}}></TouchableOpacity>
              </View>
            </Modal>

            {/*Timer settings modal */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={timerSettingsModal}
              style={{display:'flex'}}
              onRequestClose={()=>setTimerSettingsModal(false)}
            
              
            >
              <TouchableOpacity style={{display:'flex',width:'100%',height:"33%"}} onPress={()=>{setTimerSettingsModal(false)}}></TouchableOpacity>
              <View style={{display:"flex",width:"100%",backgroundColor:'white',position:'absolute',bottom:5,zIndex:10,height:"67%"}}>
                <View style={{width:'100%',height:45,alignItems:'center',borderColor:'black',marginTop:10,justifyContent:'center',flexDirection:'row',paddingHorizontal:15}}>
                    <Text style={{flex:0.15,fontSize:15,color:'gray',fontWeight:'700',paddingHorizontal:5}}>Work</Text>
                    <View style={{flex:0.65,alignItems:'center',justifyContent:"center"}}>
                      <ValuePicker
                        initialIndex={59}
                        style={{flex: 1,backgroundColor: '#fff',alignItems: 'center',justifyContent: 'center'}}
                        data={returnWorkData()}
                        renderItem={(item) => (
                          <Text style={{
                           
                            width: 40,
                            textAlign: 'center',
                            justifyContent: 'center',
                            alignItems: "center",
                            fontWeight:'500',
                            color:'black'
                           
                          }}>{item}</Text>
                        )}
                        itemWidth={40}
                        mark={null}
                        interpolateScale={
                          (index, itemWidth) => ({
                            inputRange: [
                              itemWidth * (index - 3),
                              itemWidth * (index - 2),
                              itemWidth * (index - 1),
                              itemWidth * index,
                              itemWidth * (index + 1),
                              itemWidth * (index + 2),
                              itemWidth * (index + 3),
                            ],
                            outputRange: [1,1, 1, 1.8, 1, 1,1]
                          })
                        }
                        interpolateOpacity={
                          (index, itemWidth) => ({
                            inputRange: [
                              itemWidth * (index - 3),
                              itemWidth * (index - 2),
                              itemWidth * (index - 1),
                              itemWidth * index,
                              itemWidth * (index + 1),
                              itemWidth * (index + 2),
                              itemWidth * (index + 3),
                            ],
                            outputRange: [0.5,0.5, 0.5, 1, 0.5, 0.5,0.5]
                          })
                        }
                      />
            
                    </View>
                    <Text  style={{flex:0.2,fontSize:15,color:'gray',fontWeight:'700',paddingHorizontal:10}}>minutes</Text>
                </View>

                <View style={{width:'100%',height:45,alignItems:'center',borderColor:'black',marginTop:10,justifyContent:'center',flexDirection:'row',paddingHorizontal:15}}>
                    <Text style={{flex:0.15,fontSize:15,color:'gray',fontWeight:'700',paddingHorizontal:5}}>Revise</Text>
                    <View style={{flex:0.65,alignItems:'center',justifyContent:"center"}}>
                      <ValuePicker
                        initialIndex={14}
                        style={{flex: 1,backgroundColor: '#fff',alignItems: 'center',justifyContent: 'center'}}
                        data={returnWorkData()}
                        renderItem={(item) => (
                          <Text style={{
                           
                            width: 40,
                            textAlign: 'center',
                            justifyContent: 'center',
                            alignItems: "center",
                            fontWeight:'500',
                            color:'black'
                           
                          }}>{item}</Text>
                        )}
                        itemWidth={40}
                        mark={null}
                        interpolateScale={
                          (index, itemWidth) => ({
                            inputRange: [
                              itemWidth * (index - 3),
                              itemWidth * (index - 2),
                              itemWidth * (index - 1),
                              itemWidth * index,
                              itemWidth * (index + 1),
                              itemWidth * (index + 2),
                              itemWidth * (index + 3),
                            ],
                            outputRange: [1,1, 1, 1.8, 1, 1,1]
                          })
                        }
                        interpolateOpacity={
                          (index, itemWidth) => ({
                            inputRange: [
                              itemWidth * (index - 3),
                              itemWidth * (index - 2),
                              itemWidth * (index - 1),
                              itemWidth * index,
                              itemWidth * (index + 1),
                              itemWidth * (index + 2),
                              itemWidth * (index + 3),
                            ],
                            outputRange: [0.5,0.5, 0.5, 1, 0.5, 0.5,0.5]
                          })
                        }
                      />
            
                    </View>
                    <Text  style={{flex:0.2,fontSize:15,color:'gray',fontWeight:'700',paddingHorizontal:10}}>minutes</Text>
                </View>

                <View style={{width:'100%',height:45,alignItems:'center',borderColor:'black',marginTop:10,justifyContent:'center',flexDirection:'row',paddingHorizontal:15}}>
                    <Text style={{flex:0.15,fontSize:15,color:'gray',fontWeight:'700',paddingHorizontal:5}}>Break</Text>
                    <View style={{flex:0.65,alignItems:'center',justifyContent:"center"}}>
                      <ValuePicker
                        initialIndex={4}
                        style={{flex: 1,backgroundColor: '#fff',alignItems: 'center',justifyContent: 'center'}}
                        data={returnWorkData()}
                        renderItem={(item) => (
                          <Text style={{
                           
                            width: 40,
                            textAlign: 'center',
                            justifyContent: 'center',
                            alignItems: "center",
                            fontWeight:'500',
                            color:'black'
                           
                          }}>{item}</Text>
                        )}
                        itemWidth={40}
                        mark={null}
                        interpolateScale={
                          (index, itemWidth) => ({
                            inputRange: [
                              itemWidth * (index - 3),
                              itemWidth * (index - 2),
                              itemWidth * (index - 1),
                              itemWidth * index,
                              itemWidth * (index + 1),
                              itemWidth * (index + 2),
                              itemWidth * (index + 3),
                            ],
                            outputRange: [1,1, 1, 1.8, 1, 1,1]
                          })
                        }
                        interpolateOpacity={
                          (index, itemWidth) => ({
                            inputRange: [
                              itemWidth * (index - 3),
                              itemWidth * (index - 2),
                              itemWidth * (index - 1),
                              itemWidth * index,
                              itemWidth * (index + 1),
                              itemWidth * (index + 2),
                              itemWidth * (index + 3),
                            ],
                            outputRange: [0.5,0.5, 0.5, 1, 0.5, 0.5,0.5]
                          })
                        }
                      />
            
                    </View>
                    <Text  style={{flex:0.2,fontSize:15,color:'gray',fontWeight:'700',paddingHorizontal:10}}>minutes</Text>
                </View>

                <View style={{width:'100%',height:45,alignItems:'center',borderColor:'black',marginTop:10,justifyContent:'center',flexDirection:'row',paddingHorizontal:15}}>
                    <Text style={{flex:0.2,fontSize:15,color:'gray',fontWeight:'700',paddingHorizontal:5}}>Sessions</Text>
                    <View style={{flex:0.8,alignItems:'center',justifyContent:"center",paddingLeft:15}}>
                      <ValuePicker
                        initialIndex={4}
                        style={{flex: 1,backgroundColor: '#fff',alignItems: 'center',justifyContent: 'center'}}
                        data={returnWorkData()}
                        renderItem={(item) => (
                          <Text style={{
                           
                            width: 40,
                            textAlign: 'center',
                            justifyContent: 'center',
                            alignItems: "center",
                            fontWeight:'500',
                            color:'black'
                           
                          }}>{item}</Text>
                        )}
                        itemWidth={40}
                        mark={null}
                        interpolateScale={
                          (index, itemWidth) => ({
                            inputRange: [
                              itemWidth * (index - 3),
                              itemWidth * (index - 2),
                              itemWidth * (index - 1),
                              itemWidth * index,
                              itemWidth * (index + 1),
                              itemWidth * (index + 2),
                              itemWidth * (index + 3),
                            ],
                            outputRange: [1,1, 1, 1.8, 1, 1,1]
                          })
                        }
                        interpolateOpacity={
                          (index, itemWidth) => ({
                            inputRange: [
                              itemWidth * (index - 3),
                              itemWidth * (index - 2),
                              itemWidth * (index - 1),
                              itemWidth * index,
                              itemWidth * (index + 1),
                              itemWidth * (index + 2),
                              itemWidth * (index + 3),
                            ],
                            outputRange: [0.5,0.5, 0.5, 1, 0.5, 0.5,0.5]
                          })
                        }
                      />
            
                    </View>
                   
                </View>

                {/*Revisebefore and reviseafter button */}
                <View style={{height:80,width:'100%',borderWidth:1,borderColor:'black',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                  <TouchableOpacity style={{borderWidth:revise=="before"?0:1,borderColor:'gray',borderRadius:20,paddingHorizontal:15,paddingVertical:5,marginHorizontal:10,backgroundColor:revise=="before"?"#00acc2":'white'}}><Text style={{color:revise=="before"?"white":'gray'}}>Revise before</Text></TouchableOpacity>
                  <TouchableOpacity style={{borderWidth:revise=="after"?0:1,borderColor:'gray',borderRadius:20,paddingHorizontal:15,paddingVertical:5,marginHorizontal:10,backgroundColor:revise=="after"?"#00acc2":'white'}}><Text style={{color:revise=="after"?"white":'gray'}}>Revise After</Text></TouchableOpacity>
                </View>

                {/*label button */}
                <TouchableOpacity style={{width:"100%",height:60,borderWidth:1,borderColor:'white',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}} onPress={()=>{setLabelModalStatus(true)}}>
                  <MaterialCommunityIcons name="label-outline" size={40} color="#00000080" />
                  <Text style={{color:'black',fontWeight:'500',paddingHorizontal:15,fontSize:18}}>{labelName}</Text>
                </TouchableOpacity>

                {/*comment button */}
                <TouchableOpacity style={{width:"100%",height:60,borderWidth:1,borderColor:'white',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}} onPress={()=>{setCommentsModal(true)}}>
                  <Entypo name="text" size={40} color="#00000080" />
                  <Text style={{color:'black',fontWeight:'500',paddingHorizontal:15,fontSize:18}}>{comment}</Text>
                </TouchableOpacity>

                {/*start button */}
                <View style={{height:80,width:'100%',borderWidth:1,borderColor:'black',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                  <TouchableOpacity style={{borderRadius:60,paddingVertical:15,backgroundColor:"#00acc2",width:'80%',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color:"white",fontSize:18,fontWeight:'700'}}>Start</Text>
                  </TouchableOpacity>
                </View>

                {/*The timer will end text */}
               
                <View style={{paddingVertical:5,width:'100%',display:'flex',alignItems:'center',justifyContent:'center',height:30}}>
                    <Text style={{color:"gray",fontSize:15,fontWeight:'700'}}>Timer will finish at 10:47 PM</Text>
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
  