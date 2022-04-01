import { StyleSheet, Text, View ,TouchableOpacity, Modal} from 'react-native';

import  React,{useState} from 'react';
import { PickerItem } from 'react-native-woodpicker'
import { Picker } from 'react-native-woodpicker'
//import CircularProgress from 'react-native-circular-progress-indicator';


export default function Timer(){
    const [timerModalStatus,setTimerModalStatus]= useState(false);

    const [pickedTime,setPickedTime] = useState(false);
    const data: Array<PickerItem> = [
      { label: "DataCat", value: 1 },
      { label: "DataDog", value: 2 },
      { label: "DataSnake", value: 3 },
      { label: "DataPlatypus", value: 4 },
      { label: "DataWhale", value: 5 }
    ];
    return(
        <View style={styles.rootView}>

            <View style={{display:'flex',height:40,width:'100%',alignItems:'flex-end',justifyContent:'flex-end',marginTop:25}}>
                <TouchableOpacity style={styles.targetHours} onPress={()=>{setTimerModalStatus(true)}}>
                    <Text style={{color:'white',fontSize:20,fontWeight:'700',marginHorizontal:10}}>0/0.5</Text>
                </TouchableOpacity>
            </View>


            {/* <CircularProgress
              value={60}
              radius={120}
              duration={2000}
              progressValueColor={'#ecf0f1'}
              maxValue={200}
              title={'KM/H'}
              titleColor={'white'}
              titleStyle={{fontWeight: 'bold'}}
            /> */}


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
                      <Picker
                        item={pickedTime}
                        items={data}
                        onItemChange={setPickedTime}
                        title="Data Picker"
                        placeholder="Select Data"
                        isNullable={false}
                      //backdropAnimation={{ opacity: 0 }}
                        mode="dropdown"
                      //isNullable
                      //disable
                      />
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
      flexDirection:'row',
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
  