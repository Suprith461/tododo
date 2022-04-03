import {ADD_LABEL_REQUEST,ADD_LABEL_SUCCESS,ADD_LABEL_FAILURE
    } from './timerActionTypes'
    
    const initialState= {
        addingLabel:false,
        addedLabelStatus:null,
        addLabelError:null,
    
    
    }
    
    export default function timerReducer(state=initialState,action){
        switch(action.type){
            case ADD_LABEL_REQUEST:
                return{
                    ...state,
                   addingLabel:true
                }
            case ADD_LABEL_SUCCESS:
                return{
                    ...state,
                    addingLabel:false,
                    addedLabelStatus:action.payload
                }
            case ADD_LABEL_FAILURE:
                    return{
                        ...state,
                        addingLabel:false,
                        addLabelError:action.payload
                    }
          
              
            default:return state
        }
    }