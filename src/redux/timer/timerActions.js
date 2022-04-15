import {ADD_LABEL_REQUEST,ADD_LABEL_SUCCESS,ADD_LABEL_FAILURE,
READ_LABELS_REQUEST,READ_LABELS_SUCCESS,READ_LABELS_FAILURE,
STOP_WATCH_SESSION_REQUEST,STOP_WATCH_SESSION_SUCCESS,STOP_WATCH_SESSION_FAILURE
} from './timerActionTypes'
import * as SQLite from 'expo-sqlite';
export function addLabelRequest(data){
    return{
        type:ADD_LABEL_REQUEST,
        payload:data
    }
}

export function addLabelSuccess(data){
    return{
        type:ADD_LABEL_SUCCESS,
        payload:data
    }
}

export function addLabelFailure(data){
    return{
        type:ADD_LABEL_FAILURE,
        payload:data
    }
}


export function addLabel(data){
    return(dispatch)=>{
        //console.log("function called")
        dispatch(addLabelRequest(data));
        const db =SQLite.openDatabase("tododoDatabase.db","1");
        db.transaction((tx)=>{
            tx.executeSql("CREATE TABLE IF NOT EXISTS Labels(ID INTEGER PRIMARY KEY AUTOINCREMENT,labelText TEXT,labelColor TEXT);");
        },(error)=>{console.log(error);dispatch(addLabelFailure(error))})

        db.transaction((tx)=>{
            tx.executeSql("INSERT INTO Labels (labelText,labelColor) VALUES (?,?)",
            [data.labelText,data.labelColor],
            ()=>{dispatch(addLabelSuccess("done"))},
            (error)=>{dispatch(addLabelFailure(error))});
        })

      
    }
}

export function readLabelsRequest(data){
    return{
        type:READ_LABELS_REQUEST,
        payload:data
    }
}

export function readLabelsSuccess(data){
    return{
        type:READ_LABELS_SUCCESS,
        payload:data
    }
}


export function readLabelsFailure(data){
    return{
        type:READ_LABELS_FAILURE,
        payload:data
    }
}



export function readLabels(data){
    return(dispatch)=>{
        dispatch(readLabelsRequest(data));
        const db =SQLite.openDatabase("tododoDatabase.db","1");
        db.transaction((tx)=>{
            tx.executeSql("select * from Labels",
            [],
            (tx,results)=>{
                const len = results.rows.length;
                const res=[]
                console.log("read Table",len)
                    if(len>0){
                        for(let i=0;i<results.rows.length;i++){
                            res.push(results.rows.item(i))
                            //console.log(results.rows.item(i).ID,results.rows.item(i).labelText,results.rows.item(i).labelColor)
        
                        }
                        dispatch(readLabelsSuccess(res))
                    }
                },(error)=>{
                    dispatch(readLabelsFailure(error))
                }
                
            )
        })

    }
}

export function stopWatchSessionRequest(data){
    return{
        type:STOP_WATCH_SESSION_REQUEST,
        payload:data
    }
}

export function stopWatchSessionSuccess(data){
    return{
        type:STOP_WATCH_SESSION_SUCCESS,
        payload:data
    }
}

export function stopWatchSessionFailure(data){
    return{
        type:STOP_WATCH_SESSION_FAILURE,
        payload:data
    }
}


export function stopWatchSaveSession(data){
    return(dispatch)=>{
        dispatch(stopWatchSessionRequest(data))
        const dt_iso = new Date().toISOString()
        const db =SQLite.openDatabase("history1.db","1")
        db.transaction((tx)=>{
            tx.executeSql("CREATE TABLE IF NOT EXISTS History(ID INTEGER PRIMARY KEY AUTOINCREMENT,labelText TEXT,labelColor TEXT,distractions INTEGER,hours INTEGER,minutes INTEGER,dt TEXT);");
        },(error)=>{console.log(error);dispatch(stopWatchSessionFailure(error))})

        
        db.transaction((tx)=>{
            console.log("Data",data)
            tx.executeSql("INSERT INTO History (labelText,labelColor,distractions,hours,minutes,dt) VALUES (?,?,?,?,?,?)",
            [data.labelText,data.labelColor,data.distractions,data.hours,data.minutes,dt_iso],
            ()=>{dispatch(stopWatchSessionSuccess("done"))},
            (error)=>{dispatch(stopWatchSessionFailure(error))});
        })

        db.transaction((tx)=>{
            tx.executeSql("select * from History",
            [],
            (tx,results)=>{
                const len = results.rows.length;
                const res=[]
                console.log("read Table",len)
                    if(len>0){
                        for(let i=0;i<results.rows.length;i++){
                            //res.push(results.rows.item(i))
                            console.log(results.rows.item(i).ID,results.rows.item(i).labelText,results.rows.item(i).labelColor,results.rows.item(i).hours,results.rows.item(i).distractions,results.rows.item(i).minutes,results.rows.item(i).dt)
        
                        }
                       
                    }
                },(error)=>{
                   
                }
                
            )
        })
    }
}
