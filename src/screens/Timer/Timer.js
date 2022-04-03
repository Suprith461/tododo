import { StyleSheet, Text, View ,TouchableOpacity, Modal,Easing,FlatList} from 'react-native';

import  React,{useState,useRef,useEffect} from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default function Timer({navigation}){
    const [timerModalStatus,setTimerModalStatus]= useState(false);
    const [labelModalStatus,setLabelModalStatus] = useState(false)
    const progressBarRef = useRef(null)

    

    const [pickedTime,setPickedTime] = useState(false);
    const labelData=[
      {color:"green",index:0,label:"Test1"},
      {color:"red",index:1,label:"Test1"},
      {color:"pink",index:2,label:"Test1"},
      {color:"blue",index:3,label:"Test1"}
  ]

  function LabelComponent({color,index,label}){
    return(
      <TouchableOpacity style={{display:'flex',flexDirection:'row',height:50}}>
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
    
    return(
        <View style={styles.rootView}>
         

            <View style={{display:'flex',height:40,width:'100%',alignItems:'flex-end',justifyContent:'flex-end',marginTop:40,borderWidth:1,borderColor:'white'}}>
                <TouchableOpacity style={styles.targetHours} onPress={()=>{setTimerModalStatus(true)}}>
                    <Text style={{color:'white',fontSize:20,fontWeight:'700',marginHorizontal:10}}>0/0.5</Text>
                </TouchableOpacity>
            </View>

            {/*Should show current time here */}
            <View style={{width:"100%",height:25,borderWidth:1,borderColor:'white'}}>

            </View>

            {/*All the text part comes here */}
            <View style={{height:180,width:"90%",borderWidth:1,borderColor:'white',marginHorizontal:"5%",display:'flex',alignItems:'center',justifyContent:"flex-end"}}>
                  <TouchableOpacity><Text style={{color:"#FFFFFF90",fontSize:16}}>Comment/Note...</Text></TouchableOpacity>
                  <Text style={{color:"#FFFFFF",fontSize:16}}>Beat Distarctions!</Text>
                  <Text style={{color:"#FFFFFF",fontSize:40,fontWeight:"bold"}}>00:00</Text>
            </View>
            

           {/*The circle */}
           <View style={{height:250,width:"90%",margin:'5%',display:'flex',alignItems:'center',alignContent:'center'}}>
                <AnimatedCircularProgress
                  ref={(ref) => progressBarRef.current = ref}
                  size={250}
                  width={8}
                  fill={25}
                  tintColor="black"
                  onAnimationComplete={() => console.log('onAnimationComplete')}
                  backgroundColor="#FFFFFF50" 
    
                >
                  {
                    ()=>(
                      <TouchableOpacity style={{display:'flex',alignItems:'center',justifyContent:'center',flex:1}}>
                        <Text style={{color:'white',fontSize:15,fontWeight:"700"}}>
                          Hit Me
                        </Text>
                        <Text style={{color:'white',fontSize:15,fontWeight:"700"}}>
                          When you are distracted!
                        </Text>
                      </TouchableOpacity>
                    )
                  }
                </AnimatedCircularProgress>
            </View>

            {/*All the buttons like resume ,pause,stop */}
            <View style={{width:"90%",height:100,borderWidth:1,borderColor:'white',margin:"5%",display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                  <TouchableOpacity style={{borderColor:"gray",borderWidth:0.5,paddingHorizontal:20,paddingVertical:10,borderRadius:20,marginHorizontal:5,width:125,display:'flex',alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:13,color:'white'}}>Timer</Text></TouchableOpacity>
                  <TouchableOpacity style={{borderColor:"gray",borderWidth:0.5,paddingHorizontal:20,paddingVertical:10,borderRadius:20,marginHorizontal:5,width:125,display:'flex',alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:13,color:'white'}}>Stopwatch</Text></TouchableOpacity>
            </View>

            {/*Label section */}
            <TouchableOpacity style={{width:"100%",height:30,borderWidth:1,borderColor:'white',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}} onPress={()=>{setLabelModalStatus(true)}}>
              <Text style={{color:'gray',fontWeight:'500',paddingHorizontal:5}}>Unlabeled</Text>
              
              
              <MaterialCommunityIcons name="label-outline" size={30} color="gray" style={{transform: [{rotateY: '180deg'}]}}/>
            </TouchableOpacity>
              

           
            <Modal
              animationType="slide"
              transparent={true}
              visible={labelModalStatus}
              style={{display:'flex'}}
              onRequestClose={()=>setLabelModalStatus(false)}
            
              
            >
              <View style={{display:"flex",width:"100%",backgroundColor:'white',position:'absolute',bottom:5,zIndex:10}}>
                
                <FlatList
                  ListFooterComponent={LabelSectionFooter}
                  data={labelData}
                  CellRendererComponent={({item})=>(<LabelComponent color={item.color} label={item.label} index={item.index}/>)}
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
                        <Text style={styles.modalText}>Today's work target</Text>
                    </View>

                    <View>
                    
                    </View>
                    <View style={{display:'flex',flexDirection:'row',alignItems:'flex-end', justifyContent:'flex-end',borderWidth:1}}>
                        <TouchableOpacity><Text style={{color:'#34ebb1',margin:20,marginRight:30}}>CANCEL</Text></TouchableOpacity>
                        <TouchableOpacity><Text style={{color:'#34ebb1',margin:20,marginLeft:30}}>SET</Text></TouchableOpacity>
                        
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
        width:"90%"
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
        marginHorizontal:70

        
      },
  
  });
  