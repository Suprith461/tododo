import React,{useState,useEffect,useRef} from 'react';
import {Text,View,TouchableOpacity,TextInput, Alert, ToastAndroid} from 'react-native';
import {useDispatch,useSelector} from 'react-redux'
import {addLabel, addLabelFailure,addLabelSuccess} from './../../redux/timer/timerActions'
export default function AddLabelScreen({navigation}){

    const [label,setLabel] = useState("");
    const [labelColor,setLabelColor] = useState("black")
    const dispatch  = useDispatch()
    const labelAddStatus = useSelector(state=>state.timer.addedLabelStatus)
    
    useEffect(()=>{
        if(labelAddStatus=="done"){
            dispatch(addLabelSuccess(null))
            navigation.goBack();
            console.log(labelAddStatus)
        } 
    },[labelAddStatus])

    function checkIfLabelIsNull(){
        if(label==null || label==""){
            ToastAndroid.show('Please enter a label name !', ToastAndroid.SHORT);
            return false
        }else{
            return true
        }
    }

    navigation.setOptions({headerRight: () => (
        <TouchableOpacity style={{marginHorizontal:20}} 
            onPress={()=>{
                if(checkIfLabelIsNull()){
                    dispatch(addLabel({labelText:label,labelColor:labelColor}))
                }
                }}>
            <Text style={{fontWeight:'bold',fontSize:16}}>SAVE</Text>
        </TouchableOpacity>
    )})

    return(
        <View style={{display:"flex",flex:1,backgroundColor:'white'}}>
            <View style={{display:'flex',flexDirection:'row',width:"100%",alignItems:'center',justifyContent:'center'}}>
                <View style={{height:15,width:15,borderRadius:15,backgroundColor:labelColor,marginHorizontal:10}}></View>
                <TextInput
                    onChangeText={(text)=>{setLabel(text)}}
                    style={{height:50,width:'80%',borderWidth:1,borderColor:'black',fontSize:20,fontWeight:'bold',paddingHorizontal:10}}
                    placeholder={"New label name"}
                    autoFocus
                    maxLength={30}
                    
                />
            </View>

            <View style={{marginTop:30,marginHorizontal:30,marginBottom:15}}>
                <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity onPress={()=>setLabelColor("black")} style={{width:labelColor=="black"?20:15,height:labelColor=="black"?20:15,borderRadius:labelColor=="black"?20:15,backgroundColor:'black',marginHorizontal:30}}></TouchableOpacity>
                    <TouchableOpacity onPress={()=>setLabelColor("#e6194B")} style={{height:labelColor=="#e6194B"?20:15,width:labelColor=="#e6194B"?20:15,borderRadius:labelColor=="#e6194B"?20:15,backgroundColor:'#e6194B',marginHorizontal:30}}></TouchableOpacity>
                    <TouchableOpacity onPress={()=>setLabelColor("#fabed4")} style={{height:labelColor=="#fabed4"?20:15,width:labelColor=="#fabed4"?20:15,borderRadius:labelColor=="#fabed4"?20:15,backgroundColor:'#fabed4',marginHorizontal:30}}></TouchableOpacity>
                    <TouchableOpacity onPress={()=>setLabelColor("#f032e6")} style={{height:labelColor=="#f032e6"?20:15,width:labelColor=="#f032e6"?20:15,borderRadius:labelColor=="#f032e6"?20:15,backgroundColor:'#f032e6',marginHorizontal:30}}></TouchableOpacity>
                    <TouchableOpacity onPress={()=>setLabelColor("#911eb4")} style={{height:labelColor=="#911eb4"?20:15,width:labelColor=="#911eb4"?20:15,borderRadius:labelColor=="#911eb4"?20:15,backgroundColor:'#911eb4',marginHorizontal:30}}></TouchableOpacity>
                </View>
            </View>
            <View style={{marginHorizontal:30,marginBottom:15}}>
                <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity onPress={()=>setLabelColor("#000075")} style={{width:labelColor=="#000075"?20:15,height:labelColor=="#000075"?20:15,borderRadius:labelColor=="#000075"?20:15,backgroundColor:'#000075',marginHorizontal:30}}></TouchableOpacity>
                    <TouchableOpacity onPress={()=>setLabelColor("#469990")} style={{height:labelColor=="#469990"?20:15,width:labelColor=="#469990"?20:15,borderRadius:labelColor=="#469990"?20:15,backgroundColor:'#469990',marginHorizontal:30}}></TouchableOpacity>
                    <TouchableOpacity onPress={()=>setLabelColor("#42d4f4")} style={{height:labelColor=="#42d4f4"?20:15,width:labelColor=="#42d4f4"?20:15,borderRadius:labelColor=="#42d4f4"?20:15,backgroundColor:'#42d4f4',marginHorizontal:30}}></TouchableOpacity>
                    <TouchableOpacity onPress={()=>setLabelColor("#4363d8")} style={{height:labelColor=="#4363d8"?20:15,width:labelColor=="#4363d8"?20:15,borderRadius:labelColor=="#4363d8"?20:15,backgroundColor:'#4363d8',marginHorizontal:30}}></TouchableOpacity>
                    <TouchableOpacity onPress={()=>setLabelColor("#a9a9a9")} style={{height:labelColor=="#a9a9a9"?20:15,width:labelColor=="#a9a9a9"?20:15,borderRadius:labelColor=="#a9a9a9"?20:15,backgroundColor:'#a9a9a9',marginHorizontal:30}}></TouchableOpacity>
                </View>
            </View>

            <View style={{marginHorizontal:30,marginBottom:15}}>
                <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity onPress={()=>setLabelColor("#f58231")} style={{width:labelColor=="#f58231"?20:15,height:labelColor=="#f58231"?20:15,borderRadius:labelColor=="#f58231"?20:15,backgroundColor:'#f58231',marginHorizontal:30}}></TouchableOpacity>
                    <TouchableOpacity onPress={()=>setLabelColor("#800000")} style={{height:labelColor=="#800000"?20:15,width:labelColor=="#800000"?20:15,borderRadius:labelColor=="#800000"?20:15,backgroundColor:'#800000',marginHorizontal:30}}></TouchableOpacity>
                    <TouchableOpacity onPress={()=>setLabelColor("#9A6324")} style={{height:labelColor=="#9A6324"?20:15,width:labelColor=="#9A6324"?20:15,borderRadius:labelColor=="#9A6324"?20:15,backgroundColor:'#9A6324',marginHorizontal:30}}></TouchableOpacity>
                    <TouchableOpacity onPress={()=>setLabelColor("#808000")} style={{height:labelColor=="#808000"?20:15,width:labelColor=="#808000"?20:15,borderRadius:labelColor=="#808000"?20:15,backgroundColor:'#808000',marginHorizontal:30}}></TouchableOpacity>
                    <TouchableOpacity onPress={()=>setLabelColor("#5afc03")} style={{height:labelColor=="#5afc03"?20:15,width:labelColor=="#5afc03"?20:15,borderRadius:labelColor=="#5afc03"?20:15,backgroundColor:'#5afc03',marginHorizontal:30}}></TouchableOpacity>
                </View>
            </View>

            <View style={{marginHorizontal:30,marginBottom:15}}>
                <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity onPress={()=>setLabelColor("#a903fc")} style={{width:labelColor=="#a903fc"?20:15,height:labelColor=="#a903fc"?20:15,borderRadius:labelColor=="#a903fc"?20:15,backgroundColor:'#a903fc',marginHorizontal:30}}></TouchableOpacity>
                    <TouchableOpacity onPress={()=>setLabelColor("green")} style={{height:labelColor=="green"?20:15,width:labelColor=="green"?20:15,borderRadius:labelColor=="green"?20:15,backgroundColor:'green',marginHorizontal:30}}></TouchableOpacity>
                    <TouchableOpacity onPress={()=>setLabelColor("#fc0390")} style={{height:labelColor=="#fc0390"?20:15,width:labelColor=="#fc0390"?20:15,borderRadius:labelColor=="#fc0390"?20:15,backgroundColor:'#fc0390',marginHorizontal:30}}></TouchableOpacity>
                    <TouchableOpacity onPress={()=>setLabelColor("#ace86f")} style={{height:labelColor=="#ace86f"?20:15,width:labelColor=="#ace86f"?20:15,borderRadius:labelColor=="#ace86f"?20:15,backgroundColor:'#ace86f',marginHorizontal:30}}></TouchableOpacity>
                    <TouchableOpacity onPress={()=>setLabelColor("yellow")} style={{height:labelColor=="yellow"?20:15,width:labelColor=="yellow"?20:15,borderRadius:labelColor=="yellow"?20:15,backgroundColor:'yellow',marginHorizontal:30}}></TouchableOpacity>
                </View>
            </View>
        </View>
    )
}