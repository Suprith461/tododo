import React,{useState,useEffect,useRef} from 'react';
import {Text,View,TouchableOpacity,TextInput} from 'react-native';

export default function AddLabelScreen(){
    const [label,setLabel] = useState("");
    return(
        <View style={{display:"flex",flex:1}}>
            <View style={{display:'flex',flexDirection:'row',width:"100%"}}>
                <View style={{height:15,width:15,borderRadius:15,backgroundColor:'black'}}></View>
                <TextInput
                    onChangeText={(text)=>{setLabel(text)}}
                />
            </View>
        </View>
    )
}